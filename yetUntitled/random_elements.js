function rand_rect(ctx, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy));
};

function rand_poly(ctx, coords_n, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    ctx.beginPath();
    for (let i = 0; i < coords_n; i++) {
        let cur_coord = [getRandomNumber(0,imx), getRandomNumber(0,imy)];
        if (i === 0) {
            ctx.moveTo(cur_coord[0], cur_coord[1]);
        } else {
            ctx.lineTo(cur_coord[0], cur_coord[1]);
        }
    }
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
} 

function rand_poly_n(ctx, max_coord_n, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    var coords_n = 3 + Math.round(Math.random() * (max_coord_n - 3));
    ctx.beginPath();
    for (let i = 0; i < coords_n; i++) {
        let cur_coord = [getRandomNumber(0,imx), getRandomNumber(0,imy)];
        if (i === 0) {
            ctx.moveTo(cur_coord[0], cur_coord[1]);
        } else {
            ctx.lineTo(cur_coord[0], cur_coord[1]);
        }
    }
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
};

function rand_arcTo(ctx, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    var radius = Math.random() * imy;
    ctx.beginPath();
    ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
    ctx.arcTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), radius);
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
}

function rand_curve_poly_n(ctx, max_coord_n, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    var coords_n = 3 + Math.round(Math.random() * (max_coord_n - 3));
    ctx.beginPath();
    for (let i = 0; i < coords_n; i++) {
        let radius = Math.random() * imy;
        if (i === 0) {
            ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
        } else {
            ctx.arcTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), radius);
        }
    }
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
};

function rand_poly_chaos_n(ctx, max_coord_n, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    var coords_n = 2 + Math.round(Math.random() * (max_coord_n - 2));
    ctx.beginPath();
    for (let i = 0; i < coords_n; i++) {
        let radius = Math.random() * imy;
        if (i === 0) {
            ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
        } else {
            if (Math.round(Math.random()) === 1) {
                ctx.arcTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), radius);
            } else {
                ctx.lineTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
            }
        }
    }
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
};

function rand_ellipse(ctx, imdim) {
    var imx = imdim[0];
    var imy = imdim[1];
    var rotation = Math.random() * Math.PI * 2;

    ctx.beginPath();
    ctx.ellipse(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx/2), getRandomNumber(0,imy/2), rotation, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
}


// function rand_curve_poly_n_v2(ctx, max_coord_n, imdim) {
//     var imx = imdim[0];
//     var imy = imdim[1];
//     var coords_n = 2 + Math.round(Math.random() * (max_coord_n - 2));
//     ctx.beginPath();
//     for (let i = 0; i < coords_n; i++) {
//         var radius = Math.random() * imy;
//         var cur_coords = [getRandomNumber(0,imx), getRandomNumber(0,imy)];
//         if (i === 0) {
//             ctx.moveTo(cur_coords[0], cur_coords[1]);
//             var first_coords = cur_coords;
//         } else {
//             drawArcBetweenPoints(ctx, prev_coords, cur_coords, radius);
//         }
//         var prev_coords = cur_coords;
//         console.log(prev_coords);
//     }
//     var radius = Math.random() * imy;
//     console.log(first_coords);
//     drawArcBetweenPoints(ctx, prev_coords, first_coords, radius);
//     //ctx.closePath();
//     ctx.fillStyle = getRandomColor();
//     ctx.fill();
// }