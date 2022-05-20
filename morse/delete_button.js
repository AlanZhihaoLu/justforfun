var delete_button = document.body.querySelector('.del-button');

delete_button.addEventListener('mousedown', function (e) {
    if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
            if (ditdahs.innerHTML.length !== 0) {
                ditdahs.innerHTML = ditdahs.innerHTML.slice(0, -1);
            } else {
                interpreted.innerHTML = interpreted.innerHTML.slice(0, -1);
            }
        }
    timeoutID = setTimeout(interpret_morse,dit*3);
    e.stopPropagation();
})

delete_button.addEventListener('mouseup', function (e) {
    e.stopPropagation();
})

delete_button.addEventListener('touchstart', function (e) {
    e.stopPropagation();
})

delete_button.addEventListener('touchend', function (e) {
    e.stopPropagation();
})