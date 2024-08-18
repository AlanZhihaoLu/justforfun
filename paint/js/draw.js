const scrollSpeed = 1; 
const lifeline = 2000;
const scrollDuration = scrollSpeed*lifeline*10
const scrollProgressIncrement = scrollSpeed/lifeline;
let starting_width = 50;
let scrollProgress = 0;
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const rect = canvas.getBoundingClientRect();
var strokeColor = '#000000'

// Full canvas dimensions
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const fullCanvasHeight = canvasHeight + lifeline; // Larger height to accommodate scrolling
canvas.width = canvasWidth;
canvas.height = fullCanvasHeight;

let isDrawing = false;
let mouseX = null;
let mouseY = null;
let isScrolling = true;

let startFlag = false;

// Track the current mouse position
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Start drawing when the mouse is pressed
canvas.addEventListener('mousedown', () => {
    if (!startFlag) {
        startFlag = true;
        isDrawing = true;
        isScrolling = true;
        canvas.style.cursor = 'none';
        begin_paint()
    }
});

function begin_paint() {
    // Set the interval for scrolling
    const intervalId = setInterval(() => {
        scrollCanvasDown();
    }, 10); // 10 milliseconds

    // Stop the scrolling and drawing after 10 seconds
    setTimeout(() => {
        clearInterval(intervalId); // Stop the interval
        isScrolling = false;

        canvas.style.cursor = 'auto';
        // Output the full canvas as an image
        const dataURL = canvas.toDataURL('image/png');
        outputImage.src = dataURL;
    }, scrollDuration); 
}

function scrollCanvasDown() {
    if (starting_width == scrollProgress) {
        return;
    } 
    else {
        scrollProgress += starting_width * scrollProgressIncrement;

        // Redraw the canvas to simulate scrolling up
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height - scrollSpeed);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, scrollSpeed);
    
        drawLine(); // Draw a line at the current mouse position
    }

}

// function scrollCanvasDown() {
//     if (!isScrolling) return;

//     scrollProgress += starting_width * scrollProgressIncrement;

//     // Redraw the canvas to simulate scrolling up
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height - scrollSpeed);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.putImageData(imageData, 0, scrollSpeed);

//     drawLine(); // Draw a line at the current mouse position
// }

function drawLine() {
    if (isDrawing && mouseX !== null && mouseY !== null) {
        ctx.lineWidth = starting_width - scrollProgress;
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeColor;

        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseX, mouseY); // Draw a small line to simulate constant drawing
        ctx.stroke();
    }
}