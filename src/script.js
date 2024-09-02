function refreshWeather(response) {
  let temperatureValue = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  let IconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  IconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-icon" />`;

  temperatureValue.innerHTML = Math.round(response.data.temperature.current);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "32t8ad0cd028cfa917474ed4e1ob0b22";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "32t8ad0cd028cfa917474ed4e1ob0b22";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatDay(
                      day.time
                    )}</div>
                    <div>
                    <img src="${
                      day.condition.icon_url
                    }"class="weather-forecast-icon"/>
                    </div>
                    <div class="weather-forecast-temps">
                        <div class="weather-forecast-temp">
                            <strong>${Math.round(
                              day.temperature.maximum
                            )}°</strong>
                        </div>
                        <div class="weather-forecast-temp">${Math.round(
                          day.temperature.minimum
                        )}°</div>
                    </div>
                </div>
                `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Rotterdam");
