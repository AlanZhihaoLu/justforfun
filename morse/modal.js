var modal = document.getElementById("modal");

modal.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target === modal) {
        help_content.style.display = "none";
        options_content.style.display = "none";
        cal_content.style.display = "none";
        modal.style.display = "none";
        // Reset automatic calibration
        cal_letter_container.innerHTML = '';
        start_cal.innerHTML = 'start';
        if (calibrate_on) {
            calibrate_on = false;
            remove_cal_listeners();
        }
        if (keypress_interpreter_inactive) {
            document.body.addEventListener('keydown', handle_keydown)
            document.body.addEventListener('keyup', handle_keyup)
        }
    }
})