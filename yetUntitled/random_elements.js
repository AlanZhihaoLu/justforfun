function rand_rect(ctx, imdim, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    ctx.beginPath();
    ctx.rect(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy));
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};

function rand_ellipse(ctx, imdim, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    var rotation = Math.random() * Math.PI * 2;

    ctx.beginPath();
    ctx.ellipse(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx/2), getRandomNumber(0,imy/2), rotation, 0, Math.PI * 2);
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
}

function rand_arcTo(ctx, imdim, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    var radius = Math.random() * imy;
    ctx.beginPath();
    ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
    ctx.arcTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), radius);
    ctx.closePath();
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};

function rand_poly(ctx, imdim, n_points, randomize_n_points, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    if (randomize_n_points) {
        n_points = 3 + Math.round(Math.random() * Math.max(n_points - 3,0));
    }
    ctx.beginPath();
    for (let i = 0; i < n_points; i++) {
        if (i === 0) {
            ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
        } else {
            ctx.lineTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
        }
    }
    ctx.closePath();
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};

function rand_poly_curve(ctx, imdim, n_points, randomize_n_points, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    if (randomize_n_points) {
        n_points = 3 + Math.round(Math.random() * Math.max(n_points - 3,0));
    }
    ctx.beginPath();
    for (let i = 0; i < n_points; i++) {
        let radius = Math.random() * imy;
        if (i === 0) {
            ctx.moveTo(getRandomNumber(0,imx), getRandomNumber(0,imy));
        } else {
            ctx.arcTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), radius);
        }
    }
    ctx.closePath();
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};

function rand_poly_chaos(ctx, imdim, n_points, randomize_n_points, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    if (randomize_n_points) {
        n_points = 3 + Math.round(Math.random() * Math.max(n_points - 3,0));
    }
    ctx.beginPath();
    for (let i = 0; i < n_points; i++) {
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
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};

function rand_poly_bezier(ctx, imdim, n_points, randomize_n_points, drawType, colorSet=[]) {
    var imx = imdim[0];
    var imy = imdim[1];
    if (randomize_n_points) {
        n_points = 3 + Math.round(Math.random() * Math.max(n_points - 3,0));
    }
    ctx.beginPath();
    for (let i = 0; i < n_points; i++) {
        if (i === 0) {
            var first_coords = [getRandomNumber(0,imx),getRandomNumber(0,imy)]
            ctx.moveTo(first_coords[0],first_coords[1]);
        } else {
            ctx.bezierCurveTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy));
        }
    }
    ctx.bezierCurveTo(getRandomNumber(0,imx), getRandomNumber(0,imy), getRandomNumber(0,imx), getRandomNumber(0,imy), first_coords[0], first_coords[1]);
    if (drawType === 0) {
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    } else if (drawType === 1) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
    } else if (drawType === 2) {
        ctx.lineWidth = Math.round(Math.random() * 10) + 1;
        ctx.strokeStyle = getRandomColor(colorSet);
        ctx.stroke();
        ctx.fillStyle = getRandomColor(colorSet);
        ctx.fill();
    }
};


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