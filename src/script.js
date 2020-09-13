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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinute}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${formatDate(new Date())}`;

//SEARCH FORM when searching a city, display city name on the page after the user submits the form.

function signUp(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-city");
  let currentlyText = document.querySelector("#currently-text");
  let destination = document.querySelector("#insert-city");

  if (searchInput.value.length > 0) {
    currentlyText.innerHTML = "CURRENTLY IN";
    destination.innerHTML = searchInput.value.toUpperCase();
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
form.addEventListener("submit", signUp);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", askPosition);

let key = "e94c152ae85fb750981c6a15dadf3007";
