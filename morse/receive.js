var initiate_button = document.getElementById("initiate_button");
var current_status = document.getElementById("current-status");
var inputarea = document.querySelector("input.inputarea");

var playing = false;
var timeoutID;

initiate_button.addEventListener('click', function(e) {
    if (playing) {
        initiate_button.className = 'start-button';
        initiate_button.innerText = 'start';
        current_status.innerText = 'Waiting...';
        active_signal(false);
        clearTimeout(timeoutID);
    } else {
        initiate_button.className = 'stop-button';
        initiate_button.innerText = 'stop';
        current_status.innerText = 'Receiving...';
        transmit(convert2signal(input_sentence))
    }
    playing = !playing;
});

inputarea.addEventListener('keyup', function(e) {
    console.log(inputarea.value)
    if (inputarea.value.toLowerCase() === input_sentence) {
        console.log("CORRECT")
        inputarea.value = '';
    }
})

// var input_sentence = "the quick brown fox jumps over the lazy dog";

var input_sentence = "hello world"

var dit;
if (localStorage.getItem('dit') === null) {
    localStorage.setItem('dit', dit);
    dit = 150;
} else {
    dit = parseInt(localStorage.getItem('dit'));
}

doot_dict = {
    '.': 1,
    '-': 3
}

function convert2morse(input_sentence) {
    var output = {};
    output.string_form = '';
    output.array_form = [];
    for (letter of input_sentence) {
        if (letter in alpha_dict) {
            for (doot of alpha_dict[letter]) {
                output.string_form += doot
                output.array_form.push(doot)
                output.array_form.push('')
            }
            output.string_form += ' '
            output.array_form[output.array_form.length-1] = ' '
        } else if (letter === ' ') {
            output.string_form += '/ '
            output.array_form[output.array_form.length-1] = ' / '
        } else if (letter === '.') {
            output.string_form += '// '
            output.array_form[output.array_form.length-1] = ' // '
        }
    }
    output.array_form.reverse();
    return output
}

function convert2signal(input_sentence) {
    var output = [];
    var last = -99;
    for (letter of input_sentence) {
        if (letter in alpha_dict) {
            for (doot of alpha_dict[letter]) {
                if (last > -1) {
                    output.push(-1);
                } 
                last = doot_dict[doot];
                output.push(last);
            }
            last = -3;
            output.push(-3);
        } else if (letter === ' ') {
            if (last > -7) {
                last = -7;
                output[output.length-1] = -7;
            }
        } else if (letter === '.') {
            if (last > -10) {
                last = -10;
                output[output.length-1] = -10;
            }
        }
    } 
    output = output.reverse()
    return output
}

function transmit(timings) {
    if (timings.length > 0) {
        var timing = timings.pop();
        if (timing < 0) {
            timing = -1*timing;
            active_signal(false);
        } else {
            active_signal(true);
        }
        timeoutID = setTimeout(()=>transmit(timings),timing*dit)
    } else {
        initiate_button.className = 'start-button';
        initiate_button.innerText = 'start';
        current_status.innerText = 'Waiting...';
        playing = false;
        clearTimeout(timeoutID);
    }
}

function active_signal(turnOn) {
    if (turnOn) {
        light.style.backgroundColor = 'yellow';
    } else {
        light.style.backgroundColor = 'white';
    }
}