var dialogueResponse = ['Hi!', "I'm doing...well."];
const answer = document.getElementById('answer');
var timer = 0;
var answerSelectTime = 1000;
var answerRect
// var answerSelected = false;

function showResponse(responseLine, topPos, leftPos) {
    answer.style.display = 'block'
    answer.innerHTML = responseLine;
    answer.style.top = topPos;
    answer.style.left = leftPos;
    answerRect = answer.getBoundingClientRect();
    answer.style.opacity = 0;
    fadeInId = setInterval(function(){
        answer.style.opacity = Number(answer.style.opacity) + 0.02;
        if (answer.style.opacity >= 1) {
            clearInterval(fadeInId);
        }
    }, 25)
}

// Check if cursor is inside the element's bounding box
function isCursorOverElement(x, y, elementRect) {
    return (
        x >= elementRect.left &&
        x <= elementRect.right &&
        y >= elementRect.top &&
        y <= elementRect.bottom
    );
}

showResponse(dialogueResponse[1], '50vh', '20vw')

// answer.addEventListener('mouseover', (event) => answer_select(event));

// function answer_select(event) {
//     var element = event.srcElement;
//     element.style.pointerEvents = 'none';
//     var elementRect = element.getBoundingClientRect();
//     answerSelected = false;
//     answer_highlight(element, elementRect)
//     timeoutID = setTimeout(function(){
//         if (isCursorOverElement(mouseX, mouseY, elementRect)) {
//             element.style.opacity = 1;
//             element.style.fontSize = '6.2vh';
//             answerSelected = true;
            // opacityIntervalId = setInterval(function(){
            //     element.style.opacity -= 0.02;
            //     if (element.style.opacity <= 0) {
            //         clearInterval(opacityIntervalId);
            //     }
            // }, 25)
//         } else {
//             console.log('Cursor left.');
//             element.style.pointerEvents = 'auto';
//             clearTimeout(timeoutID);
//         }
//     }, answerSelectTime)
// }

var highlightIntervalId = answer_highlight(answer);
canvas.addEventListener('click', answer_select);

function answer_select(e) {
    if (isCursorOverElement(e.clientX, e.clientY, answerRect)) {
        clearInterval(highlightIntervalId);
        canvas.removeEventListener('click', answer_select);
        answer.style.opacity = 1;
        answer.style.transition = 'transform 1.5s';
        answer.style.transform = 'scale(1.5)';
        strokeColor = '#FF0000';
        opacityIntervalId = setInterval(function(){
            answer.style.opacity -= 0.02;
            if (answer.style.opacity <= 0) {
                clearInterval(opacityIntervalId);
            }
        }, 25)
    }
}

function answer_highlight(element) {
    highlightIntervalId = setInterval(function(){
        // if (answerSelected) {
        //     console.log('cleared')
        //     clearInterval(highlightIntervalId);
        // }
        if (isCursorOverElement(mouseX, mouseY, answerRect)) {
            element.style.transform = 'scale(1.05)';
            // element.style.fontSize = '5.2vh';
        } else {
            // element.style.fontSize = '5vh';
            element.style.transform = 'scale(1)';
        }
    }, 15)
    return highlightIntervalId;
}

