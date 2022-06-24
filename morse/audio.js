// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

var audio_timeoutID;
var audio_playing;

function start_audio() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    clearTimeout(audio_timeoutID)

    audioElement.pause();
    gainNode.gain.value = 0;
    audioElement.currentTime = 0;
    gainNode.gain.setTargetAtTime(curr_gain, audioContext.currentTime, 0.025);
    audioElement.play();
    audio_playing = true;

}

function stop_audio() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.015);

    audio_timeoutID = setTimeout(()=>{audioElement.pause()}, 150)

    audio_playing = false;

}

const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

var volume_slider = document.querySelector('#volume-slider')
var volume_level = document.querySelector('#volume-level')

var gain_max = 0.4;

var curr_gain;

if (localStorage.getItem('ditdahs_volume') === null) {
    volume_slider.value = volume_level.innerHTML = 50
    localStorage.setItem('ditdahs_volume', 50)
    curr_gain = (volume_slider.value/100) * gain_max;
} else {
    volume_slider.value = volume_level.innerHTML = parseInt(localStorage.getItem('ditdahs_volume'));
    curr_gain = (volume_slider.value/100) * gain_max;
}

function change_volume() {
    if (!audio_playing) {
        audioElement.pause();
    }
    volume_level.innerHTML = volume_slider.value;
    localStorage.setItem('ditdahs_volume', volume_slider.value);
    gainNode.gain.value = curr_gain = (volume_slider.value/100) * gain_max;
}