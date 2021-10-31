var cal_button = document.body.querySelector('.cal-button');
var cal_content = document.body.querySelector('.cal-content');
var close_cal = document.querySelector("#close-cal");

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

var ready_down = true;
var t0;
var dur;
var dur_list = [];


var hdoots = document.querySelectorAll('.hcal > span.visFeedback');
var pdoots = document.querySelectorAll('.pcal > span.visFeedback');

var hgreat = document.querySelector('.hcal > span.greatFeedback');
var pgreat = document.querySelector('.pcal > span.greatFeedback');

var cur_doots = hdoots;
var cur_great = hgreat;

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
    if (dur_list.length === 4) {
        cur_great.style.opacity = 1;
        cur_doots = pdoots;
        cur_great = pgreat;
        dur_list = [];
    }
}

cal_content.addEventListener('mousedown', handle_mousedown_calibrate);
cal_content.addEventListener('mouseup', handle_mouseup_calibrate);