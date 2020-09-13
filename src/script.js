//TIME
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `Last updated: ${currentDay} ${currentDate}/${currentMonth}/${currentYear}, ${currentHour}:${currentMinute}`;
}

document.querySelector("#current-time").innerHTML = `${formatDate(new Date())}`;

//SEARCH FORM

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-city");

  if (searchInput.value.length > 0) {
    document.querySelector(
      "#insert-city"
    ).innerHTML = searchInput.value.toUpperCase();
  } else {
    alert("Please enter a city!");
    window.location.reload();
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;
  axios.get(url).then(showCity);
}

function showCity(response) {
  document
    .querySelector("#main-emoji")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#main-emoji")
    .setAttribute("alt", `${response.data.weather[0].description}`);

  document.querySelector(
    "#insert-city"
  ).innerHTML = response.data.name.toUpperCase();

  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#current-humidity").innerHTML =
    Math.round(response.data.main.humidity) + "%";

  document.querySelector("#current-wind-speed").innerHTML =
    Math.round(response.data.wind.speed * 3.6) + "km/h";

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  let celciusUnit = document.querySelector("#hover-C");
  celciusUnit.addEventListener("click", changeToC);

  let farenUnit = document.querySelector("#hover-F");
  farenUnit.addEventListener("click", changeToF);

  function changeToF(event) {
    event.preventDefault();
    document.querySelector("#current-degree").innerHTML = Math.round(
      (response.data.main.temp * 9) / 5 + 32
    );
    document.querySelector("#current-wind-speed").innerHTML =
      Math.round(response.data.wind.speed / 1.609344) + "mph";
  }

  function changeToC(event) {
    event.preventDefault();
    document.querySelector("#current-degree").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#current-wind-speed").innerHTML =
      Math.round(response.data.wind.speed) + "km/h";
  }
}

function askPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(currentUrl).then(showCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", askPosition);

let key = "e94c152ae85fb750981c6a15dadf3007";
