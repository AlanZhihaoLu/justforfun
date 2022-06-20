var keypress_interpreter_inactive = false;

var modal = document.getElementById("modal");
modal.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target === modal) {
        help_content.style.display = "none";
        options_content.style.display = "none";
        cal_content.style.display = "none";
        modal.style.display = "none";
        // Reset automatic calibration
        cal_letter_container.innerHTML = '';
        start_cal.innerHTML = 'start';
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

// var audioObj = new Audio('440Hz.mp3');
// audioObj.volume = 0.2;
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
            start_audio()
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
            stop_audio()
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
            start_audio()
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
            stop_audio()
        }
        toggle_light('white')
        ready_down = true;
    }
}

function add_morse_listeners() {
    app.addEventListener('mousedown', handle_mousedown)
    app.addEventListener('mouseup', handle_mouseup)

    document.body.addEventListener('keydown', handle_keydown)
    document.body.addEventListener('keyup', handle_keyup)

    app.addEventListener('touchstart', handle_mousedown);
    app.addEventListener('touchend', handle_mouseup);
}

add_morse_listeners()


function interpret_morse() {
    if (morse_dict[ditdahs.innerHTML] !== undefined) {
        interpreted.innerHTML = interpreted.innerHTML + morse_dict[ditdahs.innerHTML];
        ditdahs.innerHTML = '';
    }
    if (interpreted.innerHTML.length > 0 && !interpreted.innerHTML.endsWith(' ')) {
        timeoutID = setTimeout(function(){interpreted.innerHTML = interpreted.innerHTML + ' '},dit*4);
    }
}

