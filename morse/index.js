function interpret_morse() {
    if (morse_dict[ditdahs.innerHTML] !== undefined) {
        interpreted.innerHTML = interpreted.innerHTML + morse_dict[ditdahs.innerHTML];
        ditdahs.innerHTML = '';
    }
    if (interpreted.innerHTML.length > 0 && !interpreted.innerHTML.endsWith(' ')) {
        timeoutID = setTimeout(function(){interpreted.innerHTML = interpreted.innerHTML + ' '},dit*4);
    }
}