var setinfo_btn = document.getElementById("openbtn");
var modal = document.getElementById("modal");
var modal_content = document.getElementById("modal-set-info");

document.body.querySelector('#bday').value = localStorage.getItem('bday');
document.body.querySelector('#name').value = localStorage.getItem('name');
document.body.querySelector('#life-expect').value = localStorage.getItem('life-expect');

const formattedDate = today.toISOString().split('T')[0];
var bday_element = document.body.querySelector('#bday');
bday_element.max = formattedDate;

if (!localStorage.getItem('bday') | !localStorage.getItem('name') | !localStorage.getItem('life-expect')) {
    modal.style.display = "block";
    modal_content.style.display = "block";
} else {
    update_display()
}

setinfo_btn.addEventListener('click', function (e) {
    modal.style.display = "block";
    modal_content.style.display = "block";
}, true)


document.getElementById("user-info").addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get form data using FormData
    const formData = new FormData(this);

    // Access data from FormData
    const name = formData.get("name");
    const bday = formData.get("bday");
    const life_expect = formData.get("life-expect");

    localStorage.setItem('name', name);
    localStorage.setItem('bday', bday);
    localStorage.setItem('life-expect', life_expect);

    modal.style.display = "none";
    modal_content.style.display = "none";

    update_display()
});