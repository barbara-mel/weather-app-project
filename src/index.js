//Session Display Dates ////
// ⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();
console.log(now);

let date = now.getDate();
let hours = now.getHours();

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

console.log(minutes);

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()]; // The getDay have an index between 0 and 6

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let todayDay = document.querySelector("#current-date-display");
todayDay.innerHTML = `Today, ${day} ${month} ${date}, ${hours}:${minutes}`;

// HOMEWORK LESSON 5
// 👨‍🏫 Your task
//In your project, when a user searches for a city (example: New York), it should display the
//name of the city on the result page and the current temperature of the city.

function displayWeather(event) {
  console.log(event);
  let h1 = document.querySelector("#country-1");
  let searchTemperature = document.querySelector("#today-temperature");
  let searchHumidity = document.querySelector("#current-humidity");
  let searchDescription = document.querySelector("#current-description");

  let getHumidity = Math.round(event.data.main.humidity);
  let getTemperature = Math.round(event.data.main.temp);
  let getDescription = event.data.weather[0].description;
  let getCountry = event.data.sys.country;
  let getCity = event.data.name;

  h1.innerHTML = `${getCity}, ${getCountry}`;
  searchTemperature.innerHTML = `${getTemperature}`;
  searchHumidity.innerHTML = `${getHumidity}%`;
  searchDescription = `Weather with ${getDescription} `;
}

function showSearchPosition(show) {
  console.log(show);
  let searchCountry = document.querySelector("#search-tab-input");
  let city = searchCountry.value;
  let key = "83ab779da7b3293129b746ff6a1dd10c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  console.log(url);

  axios.get(url).then(displayWeather);
}

let pressSearchCountry = document.querySelector("#search-button");
pressSearchCountry.addEventListener("click", showSearchPosition);

// Maybe add a temperature for a default city
// Good for the customer experience

// Create a new function to update the date and time according to the country that you are searching

//create a function to convert celsiu to farentheit
