var help_button = document.body.querySelector('.help-button');
var help_content = document.body.querySelector('.help-content');
var close_help = document.querySelector("#close-help");

help_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
    help_content.style.display = "block";
}, true)

help_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
    help_content.style.display = "block";
}, true)

close_help.addEventListener('click', function(e) {
    e.stopPropagation();
    help_content.style.display="none";
    modal.style.display="none";
}, true)

close_help.addEventListener('touchend', function(e) {
    e.stopPropagation();
    help_content.style.display="none";
    modal.style.display="none";
}, true)

absorbEvents(help_button);