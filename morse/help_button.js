var help_button = document.body.querySelector('.help-button');

help_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
}, true)

help_button.addEventListener('mouseup', function (e) {
    e.stopPropagation();
}, true)

help_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
}, true)

help_button.addEventListener('touchend', function (e) {
    e.stopPropagation();
}, true)