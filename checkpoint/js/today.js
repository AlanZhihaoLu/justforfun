const today = new Date();
var today_date = document.body.querySelector('#today-date');
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeekName = daysOfWeek[today.getDay()];
const monthNames = [
"January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const monthName = monthNames[today.getMonth()];
const dayName = getOrdinalSuffix(today.getDate());
today_date.innerText = `${dayOfWeekName}, ${monthName} ${dayName}`;