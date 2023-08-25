//Session Display Dates ////

function formatDate(timestamp) {
  let now = new Date(timestamp);
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

  let todayDay = document.querySelector("#date-display");
  todayDay.innerHTML = `Today, ${day} ${month} ${date}, ${hours}:${minutes}`;
}

// HOMEWORK LESSON 5
// 👨‍🏫 Your task
//In your project, when a user searches for a city (example: New York), it should display the
//name of the city on the result page and the current temperature of the city.

function displayWeather(response) {
  console.log(response);
  let city = document.querySelector("#city-1");
  let searchTemperature = document.querySelector("#current-temperature");
  let searchHumidity = document.querySelector("#current-humidity");
  let searchDescription = document.querySelector("#current-description");
  let dateElement = document.querySelector("#date-display");

  let getHumidity = Math.round(response.data.main.humidity);
  let getTemperature = Math.round(response.data.main.temp);
  let getDescription = response.data.weather[0].description;
  let getCity = response.data.name;
  let getDate = todayDay(response.data.dt * 1000);

  city.innerHTML = `${getCity}`;
  searchTemperature.innerHTML = `${getTemperature}`;
  searchHumidity.innerHTML = `${getHumidity}%`;
  searchDescription = `Weather with ${getDescription} `;
  dateElement.innerHTML = `${getDate}`;
}

function showSearchPosition(show) {
  console.log(show);
  let searchCity = document.querySelector("#search-tab-input");
  let city = searchCity.value;
  let key = "83ab779da7b3293129b746ff6a1dd10c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  console.log(url);

  axios.get(url).then(displayWeather);
}

// Maybe add a temperature for a default city
// Good for the customer experience

// Create a new function to update the date and time according to the country that you are searching
//create a function to convert celsiu to farentheit

// SEARCH ENGINE
// Button response

let pressSearchCity = document.querySelector("#search-button");
pressSearchCity.addEventListener("click", showSearchPosition);

//Function to submit the form (city) by pressing Enter

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-tab-input");
  showSearchPosition(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//showSearchPosition("New York");

// Temperature Celcius - Farenhint

function unitClickFahr(event) {
  event.preventDefault();
  let searchTemperature = document.querySelector("#today-temperature");

  pressUnitCelcius.classList.remove("active");
  pressUnitFahrenheit.classList.add("active");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  searchTemperature.innerHTML = `${fahrenheitTemperature}`;
}

function unitClickCelcius(event) {
  event.preventDefault();

  pressUnitCelcius.classList.remove("active");
  pressUnitFahrenheit.classList.add("active");

  searchTemperature.innerHTML = `${celsiusTemperature}`;
  let searchTemperature = document.querySelector("#temperature-today");
}
let celsiusTemperature = null;

let pressUnitFahrenheit = document.querySelector("#fahrenheit");
pressUnitFahrenheit.addEventListener("click", unitClickFahr);

let pressUnitCelcius = document.querySelector("#celcius");
pressUnitCelcius.addEventListener("click", unitClickCelcius);
