var help_button = document.body.querySelector('.help-button');
var help_content = document.body.querySelector('.help-content');
var close_help = document.querySelector("#close-help");

help_button.addEventListener('click', function (e) {
    // e.stopPropagation();
    modal.style.display = "block";
    help_content.style.display = "block";
})

help_button.addEventListener('touchstart', function (e) {
    // e.stopPropagation();
    modal.style.display = "block";
    help_content.style.display = "block";
})

close_help.addEventListener('click', function(e) {
    // e.stopPropagation();
    help_content.style.display="none";
    modal.style.display="none";
})

close_help.addEventListener('touchend', function(e) {
    // e.stopPropagation();
    help_content.style.display="none";
    modal.style.display="none";
})

absorbEvents(help_button);