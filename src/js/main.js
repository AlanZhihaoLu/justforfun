var cards = document.querySelectorAll('.live-card');

for (var card of cards) {
    card.addEventListener('click', function(e) {
        this.querySelector('#card-link').click()
    })
};