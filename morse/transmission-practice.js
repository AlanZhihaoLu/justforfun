
function interpret_morse() {
    if (morse_dict[ditdahs.innerHTML] !== undefined) {
        interpreted.innerHTML = interpreted.innerHTML + morse_dict[ditdahs.innerHTML];
        ditdahs.innerHTML = '';
        checkCorrectness()
        if (guide_on_status) {
            initialize_doot_guide() 
        } else {
            doot_guide.innerHTML = '';
        }
    }
    if (interpreted.innerHTML.length > 0 && !interpreted.innerHTML.endsWith(' ') && !correct_answer) {
        timeoutID = setTimeout(function(){
            interpreted.innerHTML = interpreted.innerHTML + ' ';
            initialize_doot_guide();
        },dit*4);
    }
}

var correct_answer = false;

var target_words = document.getElementById("target-words");

// Placeholder
target_words.value = 'hello world';
//

var feedback = document.getElementById("give-feedback");
var feedback_content = document.getElementById("give-feedback-content");

function checkCorrectness() {
    if (interpreted.innerHTML.toLowerCase().trim() === target_words.value.toLowerCase()) {
        correct_answer = true;
        interpreted.innerHTML = interpreted.innerHTML.trim() 
        give_feedback();
        setTimeout(reset_for_next_trial, 800);
    }
}

function give_feedback() {
    remove_morse_listeners();
    feedback.style.display = 'block';
    feedback_content.style.display = 'block';
}

function reset_for_next_trial() {
    interpreted.innerHTML = '';
    add_morse_listeners();
    feedback.style.display = 'none';
    feedback_content.style.display = 'none';
    correct_answer = false;
    target_words.value = '';
}

// Doot guide functions
var doot_guide = document.getElementById('doot-guide');

function initialize_doot_guide() {
    if (guide_on_status) {
        var target_char_array = target_words.value.toLowerCase().split('')
        // If there are currently no transmission words in the input field
        if (target_char_array.length === 0) {
            doot_guide.innerHTML = '&nbsp';
        // If there are transmission words in the input field
        } else {
            var interpreted_char_array = interpreted.innerHTML.toLowerCase()
            for (var i = 0; i < interpreted_char_array.length; i++) {
                if (interpreted_char_array[i] !== target_char_array[i]) {
                    break;
                }
            }
            if (alpha_dict[target_char_array[i]]===undefined) {
                doot_guide.innerHTML = '&nbsp';
            } else {
                doot_guide.innerHTML = target_char_array[i] + ': ' + alpha_dict[target_char_array[i]]
            }
        }
    } else {
        doot_guide.innerHTML = '';
    }
};

var guide_on_container = document.getElementById('guide-on-container');
var guide_on = document.getElementById('guide-on');

guide_on_container.addEventListener('click', function(e) {
    e.stopPropagation();
    guide_on_status = !guide_on_status;
    guide_on.checked = guide_on_status;
    localStorage.setItem('guide_on', guide_on_status);
    initialize_doot_guide();
});

if (localStorage.getItem('guide_on') === null) {
    localStorage.setItem('guide_on', true);
    guide_on_status = true;
    guide_on.checked = guide_on_status;
    initialize_doot_guide();
} else {
    guide_on_status = localStorage.getItem('guide_on')==='true';
    guide_on.checked = guide_on_status;
    initialize_doot_guide();
};

delete_button.addEventListener('mousedown', function (e) {
    initialize_doot_guide();
});

target_words.addEventListener('input', function(e) {
    initialize_doot_guide();
});

target_words.addEventListener('focus', function(e) {
    document.body.removeEventListener('keydown', handle_keydown)
    document.body.removeEventListener('keyup', handle_keyup)
});

target_words.addEventListener('focusout', function(e) {
    document.body.addEventListener('keydown', handle_keydown)
    document.body.addEventListener('keyup', handle_keyup)
});


var randomize_button = document.getElementById('randomize-button');
var words_list = ['hey there', 
'welcome to', 
'my website', 
'as you', 
'might have guessed', 
'these words',
'are not',
'exactly random',
'i am looking',
'for a job',
'let me know',
'anyway',
'the words',
'are going to',
'loop now'
];
randomize_button.addEventListener('click', function(e) {
    target_words.value = words_list[0];
    words_list.push(words_list.shift());
    initialize_doot_guide();
});