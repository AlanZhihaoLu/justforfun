var cursor = document.querySelector('#cursor');
cursor.style.opacity = 1

function toggle_cursor_opacity() {
    cursor.style.opacity = Math.abs(cursor.style.opacity-1)
} 

var int_id = setInterval(toggle_cursor_opacity, 500)