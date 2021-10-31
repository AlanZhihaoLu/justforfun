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

cal_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    // remove keypress event listeners to prevent default action
    document.body.removeEventListener("keydown", handle_keydown);
    document.body.removeEventListener("keyup", handle_keyup);
    keypress_interpreter_inactive = true;
    modal.style.display = "block";
    cal_content.style.display = "block";
}, true)

cal_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
    cal_content.style.display = "block";
}, true)

close_cal.addEventListener('mousedown', function(e) {
    e.stopPropagation();
}, true)

close_cal.addEventListener('mouseup', function(e) {
    e.stopPropagation();
    cal_content.style.display="none";
    modal.style.display="none";
    // re-add keypress default event listeners 
    document.body.addEventListener('keydown', handle_keydown)
    document.body.addEventListener('keyup', handle_keyup)
}, true)

close_cal.addEventListener('touchend', function(e) {
    e.stopPropagation();
    cal_content.style.display="none";
    modal.style.display="none";
}, true)

absorbEvents(cal_button);

start_cal.addEventListener('mouseup', function(e) {
    e.stopImmediatePropagation();
    cal_letter_container.style.display = "block";
    cal_letters = letters.sort(() => 0.5 - Math.random()).slice(0,3);
    cal_letter_container.innerHTML = create_cal_letters_html(cal_letters);
    prep_cal();
    cal_content.addEventListener('mousedown', handle_mousedown_calibrate);
    cal_content.addEventListener('mouseup', handle_mouseup_calibrate);
}, true)

var ready_down = true;
var t0;
var dur;

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// var cal_letters = letters.sort(() => 0.5 - Math.random()).slice(0,3);

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
            cal_content.removeEventListener('mousedown', handle_mousedown_calibrate);
            cal_content.removeEventListener('mouseup', handle_mouseup_calibrate);
            dit = Math.round(average(dit_mean_list));
            dit_ind.innerHTML = dit;
        }
    }
}

var average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

function interpret_cal_doots(dootString, dootDurs) {
    for (let i = 0; i < dootString.length; i++) {
        if (dootString[i] === '-') {
            dootDurs[i] = dootDurs[i]/3;
        }
    }
    return average(dootDurs);
}