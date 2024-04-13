var textInput = document.getElementById('perceive');
var save_art = document.querySelector('a#save-canvas');
var nav_about = document.querySelector('a#nav-about');

function fadeInElement(element) {
    var intervalId;
    var opacity = 0;
    save_art.style.display = 'inline';

    intervalId = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(intervalId);
        } else {
            opacity += 0.02;
            element.style.opacity = opacity;
        }
    }, 60);
};

function inputEventHandler() {
    var textInput = document.getElementById('perceive');
    textInput.removeEventListener('input', inputEventHandler);
    var place_holder = document.querySelector('a#place-holder');
    place_holder.style.display = 'none';
    var save_art = document.querySelector('a#save-canvas');
    fadeInElement(save_art);
}

textInput.addEventListener('input', inputEventHandler)

function handleSaveArt() {
    var save_art = document.querySelector('a#save-canvas');
    var canvas = document.getElementById("main-canvas");
    var textInput = document.getElementById('perceive');

    var dataURL = canvas.toDataURL('image/png');
    save_art.download = textInput.value+'.png';
    save_art.href = dataURL;
    save_art.style.display = 'none';

    localStorage.setItem('interpretation', textInput.value);

    var nav_about = document.querySelector('a#nav-about');
    nav_about.style.display = 'inline';
}

save_art.addEventListener('click', handleSaveArt);