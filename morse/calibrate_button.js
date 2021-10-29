var cal_button = document.body.querySelector('.cal-button');
var cal_content = document.body.querySelector('.cal-content');
var close_cal = document.querySelector("#close-cal");

cal_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
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

// cal_content.addEventListener('mousedown', function (e) {
//     e.preventDefault();
//     if (ready_down) {
//         t0 = e.timeStamp;
//         if (timeoutID !== undefined) {
//             clearTimeout(timeoutID);
//         }
//         audioObj.play()
//         ready_down = false;
//     }
// })

// cal_content.addEventListener('mouseup', function(e) {
//     e.preventDefault();
//     if (t0 !== undefined) {
//         dur = e.timeStamp - t0;
//         console.log(dur)
//         audioObj.pause()
//         audioObj.currentTime = 0;
//         ready_down = true;
//     }
// })


// cal_content.addEventListener('keydown', function (e) {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     if (e.keyCode === 32 && ready_down) {
//         t0 = e.timeStamp;
//         if (timeoutID !== undefined) {
//             clearTimeout(timeoutID);
//         }
//         audioObj.play()
//         ready_down = false;
//     }
// }, true)

// cal_content.addEventListener('keyup', function(e) {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     if (e.keyCode === 32 && t0 !== undefined) {
//         dur = e.timeStamp - t0;
//         console.log(dur)
//         audioObj.pause()
//         audioObj.currentTime = 0;
//         ready_down = true;
//     }
// }, true)