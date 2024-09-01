function refreshWeather(response) {
  let temperatureValue = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
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

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Rotterdam");
