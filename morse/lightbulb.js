var light = document.querySelector('#light');
var on_color = document.getElementById('on-color-picker');
var off_color = document.getElementById('off-color-picker');

if (localStorage.getItem('on_color') === null) {
    on_color.value = '#FFFF00';
    off_color.value = '#FFFFFF';
    localStorage.setItem('on_color', on_color.value);
    localStorage.setItem('off_color', off_color.value);
} else {
    on_color.value = localStorage.getItem('on_color');
    off_color.value = localStorage.getItem('off_color');
}

function change_on_color() {
    localStorage.setItem('on_color', on_color.value);
}

function change_off_color() {
    localStorage.setItem('off_color', off_color.value);
    toggle_light(off_color.value);
}

function toggle_light(colorInput) {
    light.style.backgroundColor = colorInput;
}

toggle_light(off_color.value);