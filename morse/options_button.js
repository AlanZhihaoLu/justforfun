var options_button = document.body.querySelector('.options-button');
var options_content = document.body.querySelector('.options-content');
var close_options = document.querySelector("#close-options");
var volume_slider = document.querySelector('#volume-slider')
var volume_level = document.querySelector('#volume-level')

function change_volume() {
    volume_level.innerHTML = volume_slider.value;
    audioObj.volume = (volume_slider.value/100) * 0.4
}

options_button.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
    options_content.style.display = "block";
}, true)

options_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    modal.style.display = "block";
    options_content.style.display = "block";
}, true)

close_options.addEventListener('click', function(e) {
    e.stopPropagation();
    options_content.style.display="none";
    modal.style.display="none";
}, true)

close_options.addEventListener('touchend', function(e) {
    e.stopPropagation();
    options_content.style.display="none";
    modal.style.display="none";
}, true)

absorbEvents(options_button);