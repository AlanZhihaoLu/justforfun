


var save_art = document.querySelector('a#save-canvas');
save_art.download = 'canvas_image.png';
save_art.href = dataURL;
save_art.click();