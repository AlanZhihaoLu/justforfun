var JSconsole = document.getElementById('JSconsole')

JSconsole.log = function(input) {
    console.log(input)
    JSconsole.innerText += input;
    JSconsole.innerHTML += '<br>'
}