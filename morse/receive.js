var initiate_button = document.getElementById("initiate_button");
var current_status = document.getElementById("current-status");
var playing = false;
initiate_button.addEventListener('click', function(e) {
    if (playing) {
        initiate_button.className = 'start-button';
        initiate_button.innerText = 'start';
        current_status.innerText = 'Waiting...';
    } else {
        initiate_button.className = 'stop-button';
        initiate_button.innerText = 'stop';
        current_status.innerText = 'Receiving...';
    }
    playing = !playing;
});

var input_sentence = "the quick brown fox jumps over the lazy dog";

dit = parseInt(localStorage.getItem('dit'));

for (letter of input_sentence) {
    if (letter in alpha_dict) {
        for (doot of alpha_dict[letter]) {
            console.log(doot)
        }
        console.log('space')
    }
}