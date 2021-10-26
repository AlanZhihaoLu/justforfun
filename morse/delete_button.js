var delete_button = document.body.querySelector('.del-button');

delete_button.addEventListener('mousedown', function (e) {
    if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
            if (ditdahs.innerHTML.length !== 0) {
                timeoutID = setTimeout(interpret_morse,dit*3);
                ditdahs.innerHTML = ditdahs.innerHTML.slice(0, -1);
            } else {
                interpreted.innerHTML = interpreted.innerHTML.slice(0, -1);
            }
        }
    e.stopPropagation();
}, true)

delete_button.addEventListener('mouseup', function (e) {
    e.stopPropagation();
}, true)