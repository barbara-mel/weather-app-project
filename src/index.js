// FUNCTIONS
//Session Display Dates ////

function formatDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);

  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes + "";
  }

  let dateNumber = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  return `Today, ${day} ${month} ${dateNumber} , ${hours}:${minutes}`;
}

//Display Weather from city searched

function displayWeather(response) {
  let searchTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city-1");
  let searchHumidity = document.querySelector("#current-humidity");
  let searchDescription = document.querySelector("#current-description");
  let dateElement = document.querySelector("#date-display");
  let iconElement = document.querySelector("#icon");

  let celsiusTemperature = Math.round(response.data.main.temp);
  let getHumidity = Math.round(response.data.main.humidity);
  let getDescription = response.data.weather[0].description;
  let getCity = response.data.name;
  let getDate = formatDate(response.data.dt * 1000);
  let getIcon = response.data.weather[0].icon;

  city.innerHTML = `${getCity}`;
  searchTemperature.innerHTML = `${celsiusTemperature}`;
  searchHumidity.innerHTML = `${getHumidity}%`;
  searchDescription = `Weather with ${getDescription} `;
  dateElement.innerHTML = `${getDate}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${getIcon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showSearchPosition(city) {
  let key = "83ab779da7b3293129b746ff6a1dd10c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  console.log(url);

  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-tab-input");
  showSearchPosition(cityInputElement.value);
}

function unitClickFahr(event) {
  event.preventDefault();
  let searchTemperature = document.querySelector("#current-temperature");

  pressUnitCelcius.classList.remove("active");
  pressUnitFahrenheit.classList.add("active");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  searchTemperature.innerHTML = `${fahrenheitTemperature}`;
}

function unitClickCelcius(event) {
  event.preventDefault();

  pressUnitCelcius.classList.add("active");
  pressUnitFahrenheit.classList.remove("active");

  let searchTemperature = document.querySelector("#current-temperature");
  searchTemperature.innerHTML = `${celsiusTemperature}`;
}

//GENERAL ELEMENTS

let celsiusTemperature = Math.round(null);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let pressSearchCity = document.querySelector("#search-button");
pressSearchCity.addEventListener("click", showSearchPosition);

let pressUnitFahrenheit = document.querySelector("#fahrenheit");
pressUnitFahrenheit.addEventListener("click", unitClickFahr);

let pressUnitCelcius = document.querySelector("#celcius");
pressUnitCelcius.addEventListener("click", unitClickCelcius);

showSearchPosition("New York");
