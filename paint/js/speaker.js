const speaker = document.getElementById('speaker');

var dialogueSpeaker = ['Hello!', 'How are you?'];

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayAllLines(dialogueLines) {
    await wait(5000);
    for (chatline of dialogueLines) {
        await displayChatline(chatline, speaker, 100);
        await wait(2000);
    }
}

// displayChatline(dialogueSpeaker[0], speaker, 100)

function displayChatline(line, element, delay) {
    return new Promise(resolve => {
        element.textContent = ''; // Clear any existing content
        let currentIndex = 0;
    
        const textDisplayInvervalId = setInterval(() => {
            if (currentIndex < line.length) {
                element.textContent += line[currentIndex];
                currentIndex++;
            } else {
                clearInterval(textDisplayInvervalId); // Stop the interval when all letters are displayed
                resolve()
            }
        }, delay);
    })
}

displayAllLines(dialogueSpeaker);