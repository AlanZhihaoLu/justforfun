const getFullVh = () => {
    return document.querySelector('#measure-vh').clientHeight
}

var keypress_interpreter_inactive = false;

var calibrate_on = false;

var correct_answer = false;

var modal = document.getElementById("modal");
modal.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target === modal) {
        help_content.style.display = "none";
        options_content.style.display = "none";
        cal_content.style.display = "none";
        modal.style.display = "none";
        if (calibrate_on) {
            calibrate_on = false;
            remove_cal_listeners();
        }
        if (keypress_interpreter_inactive) {
            document.body.addEventListener('keydown', handle_keydown)
            document.body.addEventListener('keyup', handle_keyup)
        }
    }
})

var app = document.getElementById("main-app");

var target_words = document.getElementById("target-words");
var feedback = document.getElementById("give-feedback");
var feedback_content = document.getElementById("give-feedback-content");

var audioObj = new Audio('440Hz.mp3');
audioObj.volume = 0.2;
var interpreted = document.querySelector('#interpreted');
var ditdahs = document.querySelector('#ditdahs');

var dit;
if (localStorage.getItem('dit') === null) {
    localStorage.setItem('dit', dit);
    dit = 150;
} else {
    dit = parseInt(localStorage.getItem('dit'));
    dit_ind.value = dit;
}

ditdahs.innerHTML = '';
var onMobile = window.mobileAndTabletCheck();
var audioReady = !onMobile;
var timeoutID;

var ready_down = true;
var t0;
var dur;

var light = document.querySelector('#light');

function toggle_light(colorInput) {
    light.style.backgroundColor = colorInput;
}

function handle_mousedown(e) {
    e.preventDefault();
    if (ready_down) {
        t0 = e.timeStamp;
        if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
        }
        if (audioReady) {
            audioObj.play()
        }
        toggle_light('yellow')
        ready_down = false;
    }
}
function handle_mouseup(e) {
    e.preventDefault();
    if (t0 !== undefined) {
        dur = e.timeStamp - t0;
        if (dur < (dit*2.5)) {
            ditdahs.innerHTML = ditdahs.innerHTML + '.';
        } else {
            ditdahs.innerHTML = ditdahs.innerHTML + '-';
        };
        timeoutID = setTimeout(interpret_morse,dit*3);
        if (audioReady) {
            audioObj.pause()
            audioObj.currentTime = 0;
        }
        toggle_light('white')
        ready_down = true;
    }
}

function handle_keydown(e) {
    if (e.keyCode === 8) {
        if (timeoutID !== undefined) {
                clearTimeout(timeoutID);
                if (ditdahs.innerHTML.length !== 0) {
                    ditdahs.innerHTML = ditdahs.innerHTML.slice(0, -1);
                } else {
                    interpreted.innerHTML = interpreted.innerHTML.slice(0, -1);
                }
            }
        timeoutID = setTimeout(interpret_morse,dit*3);
    }
    if (e.keyCode === 32 && ready_down) {
        t0 = e.timeStamp;
        if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
        }
        if (audioReady) {
            audioObj.play()
        }
        toggle_light('yellow')
        ready_down = false;
    }
}

function handle_keyup(e) {
    if (e.keyCode === 32 && t0 !== undefined) {
        dur = e.timeStamp - t0;
        if (dur < (dit*2.5)) {
            ditdahs.innerHTML = ditdahs.innerHTML + '.';
        } else {
            ditdahs.innerHTML = ditdahs.innerHTML + '-';
        };
        timeoutID = setTimeout(interpret_morse,dit*3);
        if (audioReady) {
            audioObj.pause()
            audioObj.currentTime = 0;
        }
        toggle_light('white')
        ready_down = true;
    }
}

function interpret_morse() {
    if (morse_dict[ditdahs.innerHTML] !== undefined) {
        interpreted.innerHTML = interpreted.innerHTML + morse_dict[ditdahs.innerHTML];
        ditdahs.innerHTML = '';
        checkCorrectness()
        if (guide_on_status) {
            initialize_doot_guide() 
        } else {
            doot_guide.innerHTML = '';
        }
    }
    if (interpreted.innerHTML.length > 0 && !interpreted.innerHTML.endsWith(' ') && !correct_answer) {
        timeoutID = setTimeout(function(){interpreted.innerHTML = interpreted.innerHTML + ' '},dit*4);
    }
}

function checkCorrectness() {
    if (interpreted.innerHTML.toLowerCase().trim() === target_words.innerText.toLowerCase()) {
        correct_answer = true;
        interpreted.innerHTML = interpreted.innerHTML.trim() 
        give_feedback();
        setTimeout(reset_for_next_trial, 800);
    }
}

function give_feedback() {
    remove_morse_listeners();
    feedback.style.display = 'block';
    feedback_content.style.display = 'block';
}

function reset_for_next_trial() {
    interpreted.innerHTML = '';
    add_morse_listeners();
    feedback.style.display = 'none';
    feedback_content.style.display = 'none';
}

function add_morse_listeners() {
    app.addEventListener('mousedown', handle_mousedown)
    app.addEventListener('mouseup', handle_mouseup)

    document.body.addEventListener('keydown', handle_keydown)
    document.body.addEventListener('keyup', handle_keyup)

    app.addEventListener('touchstart', handle_mousedown);
    app.addEventListener('touchend', handle_mouseup);
}

function remove_morse_listeners() {
    app.removeEventListener('mousedown', handle_mousedown)
    app.removeEventListener('mouseup', handle_mouseup)

    document.body.removeEventListener('keydown', handle_keydown)
    document.body.removeEventListener('keyup', handle_keyup)

    app.removeEventListener('touchstart', handle_mousedown);
    app.removeEventListener('touchend', handle_mouseup);
}

add_morse_listeners()


// Doot guide functions
var doot_guide = document.getElementById('doot-guide');

function initialize_doot_guide() {
    var target_char_array = target_words.innerText.toLowerCase().split('')
    var interpreted_char_array = interpreted.innerHTML.toLowerCase()
    for (var i = 0; i < interpreted_char_array.length; i++) {
        if (interpreted_char_array[i] !== target_char_array[i]) {
            break;
        }
    }
    if (alpha_dict[target_char_array[i]]===undefined) {
        doot_guide.innerHTML = ''
    } else {
        doot_guide.innerHTML = target_char_array[i] + ': ' + alpha_dict[target_char_array[i]]
    }
}

var guide_on_container = document.getElementById('guide-on-container');
var guide_on = document.getElementById('guide-on');
// var guide_on_status = guide_on.checked;

guide_on_container.addEventListener('click', function(e) {
    e.stopPropagation();
    guide_on_status = !guide_on_status;
    guide_on.checked = guide_on_status;
    localStorage.setItem('guide_on', guide_on_status);
    if (guide_on_status) {
        initialize_doot_guide();
    } else {
        doot_guide.innerHTML = '';
    }
})

if (localStorage.getItem('guide_on') === null) {
    localStorage.setItem('guide_on', true);
    guide_on_status = true;
    guide_on.checked = guide_on_status;
    initialize_doot_guide();
} else {
    guide_on_status = localStorage.getItem('guide_on')==='true';
    guide_on.checked = guide_on_status;
    if (guide_on_status) {
        initialize_doot_guide();
    } else {
        doot_guide.innerHTML = '';
    }
}