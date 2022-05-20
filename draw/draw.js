var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var drawingColor = document.querySelector(".drawing_color");
var backgroundColor = document.querySelector(".background_color");
var drawWidth = document.querySelector(".drawWidth")

var pos = {x: 0, y: 0};
var isDrawing = false;
var drawMode = true;
ctx.strokeStyle = drawingColor.value;
ctx.lineWidth = 2**drawWidth.value;
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', function(e) {
    setPos(e);
    isDrawing = true;
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', function(e) {
    isDrawing = false;
})

function getPosition(elem) {
    return [elem.getBoundingClientRect().left, canvas.getBoundingClientRect().top]
}

var canv_pos = getPosition(canvas);

function setPos(e) {
    pos.x = e.clientX-canv_pos[0];
    pos.y = e.clientY-canv_pos[1];
}

function draw(e) {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        setPos(e);
        ctx.lineTo(e.clientX-canv_pos[0],e.clientY-canv_pos[1]);
        ctx.stroke();
    }
}

function changeDrawingColor() {
    if (drawMode) {
        ctx.strokeStyle = drawingColor.value;
    }
}

function changeBackgroundColor() {
    canvas.style.backgroundColor = backgroundColor.value;
}

function changeDrawWidth() {
    ctx.lineWidth = 2**drawWidth.value;
}

function changetodraw() {
    drawMode = true;
    ctx.strokeStyle = drawingColor.value;
}

function changetoerase() {
    drawMode = false;
    ctx.strokeStyle = backgroundColor.value;
}