var interp = document.querySelector('span#interpretation');

if (localStorage.getItem('interpretation') !== null) {
    interp.innerText = ' who created \"' + localStorage.getItem('interpretation') + '\"';
};