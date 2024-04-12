function getRandomColor(colorSet=[]) {
    if (colorSet.length === 0) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    } else {
        var randomIndex = Math.floor(Math.random() * colorSet.length);
        return colorSet[randomIndex];
    }
};

function generateRandomColorsArray(size, colorSet=[]) {
    var colorsArray = [];
    for (var i = 0; i < size; i++) {
        colorsArray.push(getRandomColor(colorSet));
    }
    return colorsArray;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// function getRandomArc(img_x,img_y) {
//     var radius = Math.random() * (img_y - 10) + 10; 
//     var startAngle = Math.random() * Math.PI * 2; 
//     var endAngle = startAngle + Math.random() * Math.PI; 
//     var coord_x = getRandomNumber(0, img_x);
//     var coord_y = getRandomNumber(0, img_y);
//     return {
//         'rad': radius,
//         'stAng': startAngle,
//         'endAng': endAngle,
//         'x': coord_x,
//         'y': coord_y
//     };
// };

// // Function to draw an arc connecting two points
// function drawArcBetweenPoints(ctx, xy_coords1, xy_coords2, radius) {
//     // Calculate the midpoint between the two points
//     var midX = (xy_coords1[0] + xy_coords2[0]) / 2;
//     var midY = (xy_coords1[1] + xy_coords2[1]) / 2;

//     // Calculate the distance between the two points
//     var dx = xy_coords2[0] - xy_coords1[0];
//     var dy = xy_coords2[1] - xy_coords1[1];
//     var distance = Math.sqrt(dx * dx + dy * dy);

//     // Calculate the angle of the line connecting the two points
//     var angle = Math.atan2(dy, dx);

//     // Calculate the control point for the arc
//     var controlX = midX + radius * Math.cos(angle - Math.PI / 2);
//     var controlY = midY + radius * Math.sin(angle - Math.PI / 2);

//     // Draw the arc connecting the two points
//     ctx.arcTo(xy_coords2[0], xy_coords2[1], controlX + radius * Math.cos(angle), controlY + radius * Math.sin(angle), radius);
//     ctx.strokeStyle = 'red';
//     ctx.stroke();
// }

// function curvePoints(ctx, xy1, xy2, scalingFactor) {

//     // Calculate the distance between the two points
//     var dx = xy2[0] - xy1[0];
//     var dy = xy2[1] - xy1[1];
//     var distance = Math.sqrt(dx * dx + dy * dy);
//     var radius = distance * scalingFactor;

//     ctx.beginPath();
//     ctx.moveTo(xy1[0],xy1[1]);
    
    

// }

// // Function to find a point equidistant from two given points
// function findEquidistantPoint(xy1, xy2, distance) {
//     // Calculate the midpoint between the two points
//     var midX = (xy1[0] + xy2[0]) / 2;
//     var midY = (xy1[1] + xy2[1]) / 2;

//     // Calculate the angle of the line connecting the two points
//     var dx = xy2[0] - xy1[0];
//     var dy = xy2[1] - xy1[1];
//     var angle = Math.atan2(dy, dx);

//     // Calculate the coordinates of the equidistant point
//     var newX = midX + distance * Math.cos(angle - Math.PI / 2);
//     var newY = midY + distance * Math.sin(angle - Math.PI / 2);

//     return [newX, newY];
// }