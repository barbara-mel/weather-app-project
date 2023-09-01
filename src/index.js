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

function getForecast(coordinates) {
  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let searchTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city-1");
  let searchHumidity = document.querySelector("#current-humidity");
  let searchDescription = document.querySelector("#current-description");
  let searchWind = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date-display");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  let getHumidity = Math.round(response.data.main.humidity);
  let getDescription = response.data.weather[0].description;
  let getCity = response.data.name;
  let getDate = formatDate(response.data.dt * 1000);
  let getIcon = response.data.weather[0].icon;
  let getWindSpeed = response.data.wind.speed;

  city.innerHTML = `${getCity}`;
  searchTemperature.innerHTML = Math.round(celsiusTemperature);
  searchHumidity.innerHTML = `${getHumidity}%`;
  searchDescription.innerHTML = `Weather with ${getDescription} `;
  dateElement.innerHTML = `${getDate}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${getIcon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  searchWind.innerHTML = `Wind Speed: ${getWindSpeed} km/h`;

  getForecast(response.data.coord);
}

function showSearchPosition(city) {
  let key = "83ab779da7b3293129b746ff6a1dd10c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-tab-input");
  showSearchPosition(cityInputElement.value);
}

// Temperature switch function

function unitClickFahr(event) {
  event.preventDefault();

  pressUnitCelcius.classList.remove("active");
  pressUnitFahrenheit.classList.add("active");

  let searchTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);

  searchTemperature.innerHTML = `${fahrenheitTemperature}`;
}

let pressUnitFahrenheit = document.querySelector("#fahrenheit");
pressUnitFahrenheit.addEventListener("click", unitClickFahr);

function unitClickCelcius(event) {
  event.preventDefault();

  pressUnitCelcius.classList.add("active");
  pressUnitFahrenheit.classList.remove("active");

  let searchTemperature = document.querySelector("#current-temperature");
  searchTemperature.innerHTML = `${celsiusTemperature}`;
}

let pressUnitCelcius = document.querySelector("#celcius");
pressUnitCelcius.addEventListener("click", unitClickCelcius);

//FORECAST LOGIC

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row next-temperature-days">
                <div class="col-4">
                  <img
                class="float-left main-temp-image"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="temperature-icon"
                width="50"/>
                </div>
                <div class="col-8">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°C</span> |
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                  <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//OTHER GLOBAL ELEMENTS

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let pressSearchCity = document.querySelector("#search-button");
pressSearchCity.addEventListener("click", showSearchPosition);

showSearchPosition("Rio de Janeiro");
