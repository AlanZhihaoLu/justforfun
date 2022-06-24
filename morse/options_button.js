var options_button = document.body.querySelector('.options-button');
var options_content = document.body.querySelector('.options-content');
var close_options = document.querySelector("#close-options");

options_button.addEventListener('mousedown', function (e) {
    // e.stopPropagation();
    modal.style.display = "block";
    options_content.style.display = "block";
}, true)

options_button.addEventListener('touchstart', function (e) {
    // e.stopPropagation();
    modal.style.display = "block";
    options_content.style.display = "block";
}, true)

close_options.addEventListener('mouseup', function(e) {
    // e.stopPropagation();
    options_content.style.display="none";
    modal.style.display="none";
}, true)

close_options.addEventListener('touchend', function(e) {
    // e.stopPropagation();
    options_content.style.display="none";
    modal.style.display="none";
}, true)

absorbEvents(options_button);