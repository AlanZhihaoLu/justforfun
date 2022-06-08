var translate_button = document.getElementById("translate-button");
var current_status = document.getElementById("current-status");
var inputarea = document.querySelector("input.inputarea");

var playing = false;
var timeoutID;

var input_sentence;
var morse_output;

// Guide Elements
var all_doots = document.getElementById("all-doots");
var translated_doots = document.getElementById("translated-doots");

translate_button.addEventListener('click', function(e) {
    if (playing) {
        translate_button.innerText = 'translate it!';
        current_status.innerText = 'Waiting...';
        clearTimeout(timeoutID);
    } else {
        translate_button.innerText = 'translating...';
        current_status.innerText = 'Transmitting...';
        input_sentence = inputarea.value.toLowerCase();
        translated_doots.innerHTML = '';
        morse_output = convert2morse(input_sentence);
        morse_output.signal = convert2signal(input_sentence);
        all_doots.innerText = morse_output.string_form;
        transmit(morse_output.signal)
    }
    playing = !playing;
});

var dit;
if (localStorage.getItem('dit') === null) {
    localStorage.setItem('dit', dit);
    dit = 150;
} else {
    dit = parseInt(localStorage.getItem('dit'));
}

doot_dict = {
    '.': 1,
    '-': 3
}

function convert2morse(input_sentence) {
    var output = {};
    output.string_form = '';
    output.array_form = [];
    for (letter of input_sentence) {
        if (letter in alpha_dict) {
            for (doot of alpha_dict[letter]) {
                output.string_form += doot
                output.array_form.push(doot)
                output.array_form.push('')
            }
            output.string_form += ' '
            output.array_form[output.array_form.length-1] = ' '
        } else if (letter === ' ') {
            output.string_form += '/ '
            output.array_form[output.array_form.length-1] = ' / '
        } else if (letter === '.') {
            output.string_form += '// '
            output.array_form[output.array_form.length-1] = ' // '
        }
    }
    output.array_form.reverse();
    return output
}

function convert2signal(input_sentence) {
    var output = [];
    var last = -99;
    for (letter of input_sentence) {
        if (letter in alpha_dict) {
            for (doot of alpha_dict[letter]) {
                if (last > -1) {
                    output.push(-1);
                } 
                last = doot_dict[doot];
                output.push(last);
            }
            last = -3;
            output.push(-3);
        } else if (letter === ' ') {
            if (last > -7) {
                last = -7;
                output[output.length-1] = -7;
            }
        } else if (letter === '.') {
            if (last > -10) {
                last = -10;
                output[output.length-1] = -10;
            }
        }
    } 
    output = output.reverse()
    return output
}

function transmit(timings) {
    if (timings.length > 0) {
        var timing = timings.pop();
        if (timing < 0) {
            timing = -1*timing;
            active_signal(false);
            if (audioReady) {
                audioObj.pause()
                audioObj.currentTime = 0;
            }
        } else {
            active_signal(true);
            if (audioReady) {
                audioObj.play();
            }
        }
        translated_doots.innerHTML += morse_output.array_form.pop();
        timeoutID = setTimeout(()=>transmit(timings),timing*dit)
    } else {
        translate_button.innerText = 'translate it!';
        current_status.innerText = 'Waiting...';
        playing = false;
        clearTimeout(timeoutID);
    }
}

function active_signal(turnOn) {
    if (turnOn) {
        light.style.backgroundColor = 'yellow';
    } else {
        light.style.backgroundColor = 'white';
    }
}

// Dummy functions for calibration button
function handle_keydown() {
}

function handle_keyup() {
}

var guide_on_container = document.getElementById('guide-on-container');
var guide_on = document.getElementById('guide-on');

guide_on_container.addEventListener('click', function(e) {
    e.stopPropagation();
    guide_on_status = !guide_on_status;
    guide_on.checked = guide_on_status;
    localStorage.setItem('ttm_guide_on', guide_on_status);
    toggle_doot_guide(guide_on_status);
});

if (localStorage.getItem('ttm_guide_on') === null) {
    localStorage.setItem('ttm_guide_on', true);
    guide_on_status = true;
    guide_on.checked = guide_on_status;
    toggle_doot_guide(guide_on_status);
} else {
    guide_on_status = localStorage.getItem('ttm_guide_on')==='true';
    guide_on.checked = guide_on_status;
    toggle_doot_guide(guide_on_status);
};

var doot_guide_container = document.getElementById('doot-guide-container');

function toggle_doot_guide(turnOn) {
    var doot_guide_container = document.getElementById('doot-guide-container');
    if (turnOn) {
        doot_guide_container.style.display = "flex";
    } else {
        doot_guide_container.style.display = "none";
    }
}
