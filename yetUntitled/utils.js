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