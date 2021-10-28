var help_button = document.body.querySelector('.help-button');
var close_help = document.querySelector("#close-help");

help_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
}, true)

help_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
}, true)

close_help.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    modal.style.display = "none";
}, true)

close_help.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    modal.style.display = "none";
}, true)

absorbEvents(close_help);
absorbEvents(help_button);