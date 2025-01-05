var user_name_element = document.body.querySelector('#user-name');
var user_age_yrs = document.body.querySelector('#user-age-yrs');
var user_age_days = document.body.querySelector('#user-age-days');
var user_life_perc = document.body.querySelector('#user-life-perc');

var msPerDay = 1000 * 60 * 60 * 24;

const update_display = function() {
    var bday_date = new Date(`${localStorage.getItem('bday')}T00:00:00`);
    var dayDifference = Math.floor((today - bday_date) / msPerDay);
    var yearDifference = dayDifference / 365.25;
    var lifePerc = yearDifference/Number(localStorage.getItem('life-expect'));

    user_name_element.innerText = localStorage.getItem('name');
    user_age_yrs.innerText = Math.round(100*yearDifference)/100;
    user_age_days.innerText = `${getOrdinalSuffix(dayDifference)}`;
    user_life_perc.innerText = Math.round(10000*lifePerc)/100 + '%';
}