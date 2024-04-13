var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = getRandomColor();
ctx.fillRect(0, 0, canvas.width, canvas.height);
var imdim = [canvas.width, canvas.height];

var n_elements = Math.round(Math.random()*29)+1;
var colorSet = generateRandomColorsArray(n_elements);
var rand_options = [0,0,1,2,3,3,4,4,5,5,6,6,7,7]
var randChoice

for (let ele = 0; ele < n_elements; ele++) {
    randChoice = getRandomColor(rand_options);
    rand_options.push(randChoice);
    rand_options.push(randChoice);
    rand_options.push(randChoice);
    switch (randChoice) {
        case 0:
            rand_rect(ctx,imdim,getRandomNumber(0,2),colorSet);
            break;
        case 1:
            rand_ellipse(ctx,imdim,getRandomNumber(0,2),colorSet);
            break;
        case 2:
            rand_circle(ctx,imdim,getRandomNumber(0,2),colorSet);
            break;
        case 3:
            rand_arcTo(ctx,imdim,getRandomNumber(0,2),colorSet);
            break;
        case 4:
            rand_poly(ctx,imdim,5,true,getRandomNumber(0,2),colorSet);
            break;
        case 5:
            rand_poly_quad(ctx,imdim,5,true,getRandomNumber(0,2),colorSet);
            break;
        case 6:
            rand_poly_bezier(ctx,imdim,5,true,getRandomNumber(0,2),colorSet);
            break;
        case 7:
            rand_poly_chaos(ctx,imdim,5,true,getRandomNumber(0,2),colorSet);
            break;
    }
}