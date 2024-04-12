var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var imdim = [canvas.width, canvas.height];
var n_elements = Math.round(Math.random()*15)+1;
var colorSet = generateRandomColorsArray(n_elements);

// for (let ele = 0; ele < n_elements; ele++) {
//     var randChoice = getRandomNumber(0,5);
//     switch (randChoice) {
//         case 0:
//             rand_rect(ctx,imdim,getRandomNumber(0,2),colorSet);
//             break;
//         case 1:
//             rand_ellipse(ctx,imdim,getRandomNumber(0,2),colorSet);
//             break;
//         case 2:
//             rand_arcTo(ctx,imdim,getRandomNumber(0,2),colorSet);
//             break;
//         case 3:
//             rand_poly(ctx,imdim,8,true,getRandomNumber(0,2),colorSet);
//             break;
//         case 4:
//             rand_poly_curve(ctx,imdim,8,true,getRandomNumber(0,2),colorSet);
//             break;
//         case 5:
//             rand_poly_chaos(ctx,imdim,8,true,getRandomNumber(0,2),colorSet);
//             break;
//     }
// }