var app = document.getElementById("main-app");
var interpreted = document.querySelector('#interpreted');
var ditdahs = document.querySelector('#ditdahs');
var light = document.querySelector('#light');

var keypress_interpreter_inactive = false;

var dit;
if (localStorage.getItem('dit') === null) {
    dit = 150;
    localStorage.setItem('dit', dit);
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
            start_audio();
        }
        toggle_light('yellow');
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
            stop_audio();
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
        e.preventDefault();
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

// Function for transmission-practice.html
function remove_morse_listeners() {
    app.removeEventListener('mousedown', handle_mousedown)
    app.removeEventListener('mouseup', handle_mouseup)

    document.body.removeEventListener('keydown', handle_keydown)
    document.body.removeEventListener('keyup', handle_keyup)

    app.removeEventListener('touchstart', handle_mousedown);
    app.removeEventListener('touchend', handle_mouseup);
}

add_morse_listeners()