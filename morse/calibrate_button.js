var cal_button = document.body.querySelector('.cal-button');

cal_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
}, true)

cal_button.addEventListener('mouseup', function (e) {
    e.stopPropagation();
}, true)

cal_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
}, true)

cal_button.addEventListener('touchend', function (e) {
    e.stopPropagation();
}, true)

// absorbEvents(cal_button, ['mousedown','mouseup','touchstart','touchend']);