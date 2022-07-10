function options_reset() {
    on_color.value = '#FFFF00';
    off_color.value = '#FFFFFF';
    localStorage.setItem('on_color', on_color.value);
    localStorage.setItem('off_color', off_color.value);
    toggle_light(off_color.value);

    volume_slider.value = volume_level.innerHTML = 50
    localStorage.setItem('ditdahs_volume', 50)
    curr_gain = (volume_slider.value/100) * gain_max;
}