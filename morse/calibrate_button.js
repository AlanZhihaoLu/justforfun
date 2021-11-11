var cal_button = document.body.querySelector('.cal-button');
var cal_content = document.body.querySelector('.cal-content');
var close_cal = document.querySelector('#close-cal');
var start_cal = document.querySelector('div.cal-content button.start-cal');
var cal_letter_container = document.querySelector('div.cal-content div.cal-letter-container');

var n_cal_letters;
var visFeedback_list;
var greatFeedback_list;
var cur_letter_idx;
var cur_doots;
var cur_great;
var cur_n_doots;
var dur_list;
var dit_mean_list;
var cal_letters;

// Removes keypress event listeners to prevent default action, displays modal (see handle_cal_button)
// Mouse click
cal_button.addEventListener('mousedown', handle_cal_button, true)
// Mobile tap
cal_button.addEventListener('touchstart', handle_cal_button, true)
// Stop propagation for mouseup and touchend
absorbEvents(cal_button);

// Function to handle calibration button press
// Removes keypress event listeners to prevent default action, displays modal
function handle_cal_button(e) {
    e.stopPropagation();
    // remove keypress event listeners to prevent default action
    document.body.removeEventListener("keydown", handle_keydown);
    document.body.removeEventListener("keyup", handle_keyup);
    keypress_interpreter_inactive = true;
    // display modal
    modal.style.display = "block";
    cal_content.style.display = "block";
}

// Stop propagation for mousedown and touchstart (prevents input when in calibration mode)
absorbEvents(close_cal, ['mousedown', 'touchstart']);

// Removes modal display, removes listeners if in calibration mode, 
// re-adds keypress default event listeners (see handle_close_cal)
// Mouse click
close_cal.addEventListener('mouseup', handle_close_cal, true)
// Mobile tap
close_cal.addEventListener('touchend', handle_close_cal, true)

// Function to handle close calibration X press
// Removes modal display, removes listeners if in calibration mode
// re-adds keypress default event listeners (see remove_cal_listeners)
function handle_close_cal(e) {
    e.stopPropagation();
    cal_content.style.display="none";
    modal.style.display="none";
    if (calibrate_on) {
        calibrate_on = false;
        remove_cal_listeners();
    }
    // re-add keypress default event listeners 
    document.body.addEventListener('keydown', handle_keydown)
    document.body.addEventListener('keyup', handle_keyup)
}

// Calibration mode listeners (see handle_mousedown_calibrate, handle_mouseup_calibrate)
// Adds listeners
function add_cal_listeners() {
    cal_content.addEventListener('mousedown', handle_mousedown_calibrate);
    cal_content.addEventListener('mouseup', handle_mouseup_calibrate);
    // Touch events are basically the same as mouse click events, so just use the same callback functions
    cal_content.addEventListener('touchstart', handle_mousedown_calibrate);
    cal_content.addEventListener('touchend', handle_mouseup_calibrate);
}
// Removes listeners
function remove_cal_listeners() {
    cal_content.removeEventListener('mousedown', handle_mousedown_calibrate);
    cal_content.removeEventListener('mouseup', handle_mouseup_calibrate);
    // Touch events are basically the same as mouse click events, so just use the same callback functions
    cal_content.removeEventListener('touchstart', handle_mousedown_calibrate);
    cal_content.removeEventListener('touchend', handle_mouseup_calibrate);
}

// Stop propagation for mousedown and touchstart 
absorbEvents(start_cal, ['mousedown', 'touchstart']);

// Creates calibration letters, preps necessary calibration collection variables and 
// selects necessary calibration elements, adds calibration mode listeners (see handle_start_cal)
// Mouse click
start_cal.addEventListener('mouseup', handle_start_cal, true)
// Mobile tap
start_cal.addEventListener('touchend', handle_start_cal, true)

// Creates calibration letters, preps necessary calibration collection variables and  
// selects necessary calibration elements, adds calibration mode listeners (see create_cal_letters_html, prep_cal, add_cal_listeners)
function handle_start_cal(e) {
    e.stopImmediatePropagation();
    start_cal.innerHTML = 'reset';
    cal_letter_container.style.display = "block";
    cal_letters = letters.sort(() => 0.5 - Math.random()).slice(0,3);
    cal_letter_container.innerHTML = create_cal_letters_html(cal_letters);
    prep_cal();
    if (!calibrate_on) {
        calibrate_on = true;
        add_cal_listeners();
    }
}

var ready_down = true;
var t0;
var dur;

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// creates calibration letters, dynamically adds to html document
function create_cal_letters_html(cal_letters) {
    var html_output = '';
    for (letter of cal_letters) {
        var doot_list = alpha_dict[letter].split('');
        var doot_html = '';
        for (let i = 0; i < doot_list.length; i++) {
            doot_html += `<span class="visFeedback">${doot_list[i]}</span>`;
        }
        html_template = `<p style="font-size:5vh">${letter}: ` +
        `<span class="${letter}cal">` +
        doot_html +
        '<span class="greatFeedback"> Great!</span>' +
        '</span>' +
        '</p>';
        html_output += html_template;
    }
    return html_output;
}

// Preps necessary calibration collection variables and selects necessary calibration elements
function prep_cal() {
    n_cal_letters = cal_letters.length;
    visFeedback_list = [];
    greatFeedback_list = [];
    for (letter of cal_letters) {
        visFeedback_list.push(document.querySelectorAll(`.${letter}cal > span.visFeedback`));
        greatFeedback_list.push(document.querySelectorAll(`.${letter}cal > span.greatFeedback`));
    }
    cur_letter_idx = 0;
    cur_doots = visFeedback_list[cur_letter_idx];
    cur_great = greatFeedback_list[cur_letter_idx][0];
    cur_n_doots = alpha_dict[cal_letters[0]].length;
    dur_list = [];
    dit_mean_list = [];
}

// Calibration listeners, collects click/tap events
// For mousedown/touchstart
function handle_mousedown_calibrate(e) {
    e.preventDefault();
    if (ready_down) {
        t0 = e.timeStamp;
        if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
        }
        if (audioReady) {
            audioObj.play();
        }
        ready_down = false;
    }
}
// For mouseup/touchend 
// If last dit/dah in letter, computes average dit duration and updates dit_mean_list
// If last dit/dah in last letter, computes overall average dit duration across letters and removes calibration mode listeners
// (see interpret_cal_doots, remove_cal_listeners, average)
function handle_mouseup_calibrate(e) {
    e.preventDefault();
    if (t0 !== undefined) {
        dur = e.timeStamp - t0;
        dur_list.push(dur);
        cur_doots[dur_list.length-1].style.opacity = 1;
        if (audioReady) {
            audioObj.pause();
            audioObj.currentTime = 0;
        }
        ready_down = true;
    }
    if (dur_list.length === cur_n_doots) {
        dit_mean_list.push(interpret_cal_doots(alpha_dict[cal_letters[cur_letter_idx]], dur_list));
        cur_great.style.opacity = 1;
        cur_letter_idx += 1;
        if (cur_letter_idx < n_cal_letters) {
            cur_doots = visFeedback_list[cur_letter_idx];
            cur_great = greatFeedback_list[cur_letter_idx][0];
            cur_n_doots = alpha_dict[cal_letters[cur_letter_idx]].length;
            dur_list = [];
        } else {
            if (calibrate_on) {
                calibrate_on = false;
                remove_cal_listeners();
            }
            dit = Math.round(average(dit_mean_list));
            dit_ind.innerHTML = dit;
        }
    }
}

// Calculates weighted average dit duration across dits and dahs
function interpret_cal_doots(dootString, dootDurs) {
    for (let i = 0; i < dootString.length; i++) {
        if (dootString[i] === '-') {
            dootDurs[i] = dootDurs[i]/3;
        }
    }
    return average(dootDurs);
}

// Helper function: takes the numerical average of an array
var average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;