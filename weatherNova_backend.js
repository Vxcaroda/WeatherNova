const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const searchBtn = document.querySelector(".search-box button"); // select the search button element
const nfimg = document.querySelector(".nfimg");
const travelimg = document.querySelector(".weather-icon");
const cityNF = document.querySelector(".city-not-found-blurb");
let errorFlag = false;
// const locationP = document.querySelector(".city-not-found-blurb");


function initMap() {
  // Create a new map centered on a location
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194}, // San Francisco, CA
    zoom: 10
  });
  
  // Add a marker to the map
  var marker = new google.maps.Marker({
    position: {lat: 37.7749, lng: -122.4194}, // San Francisco, CA
    map: map
  });
}

searchBtn.addEventListener("click", () => {
  // add a click event listener to the search button
  const APIKey = "5c3412626cefebb5a1e1f2156cb1c7ba";
  const city = document.querySelector(".search-box input");
  console.log("Clicked!");
  if (city.value === "") {
    // check if the input value is empty
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (errorFlag) {
        // hide error message if it was shown before
        const errorWindow = document.querySelector(".city-not-found-blurb");
        if (errorWindow !== null) {
          errorWindow.classList.add("hidden");
        }
        errorFlag = false;
      }
      // update the weather information on the web page
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(
        ".weather-box .temperature-value"
      );
      //set a variable temperature to the span (horizontal structure) named: temperature-value
      const description = document.querySelector(".description-value");
      const humidity = document.querySelector(".humidity-value");
      const windspeed = document.querySelector(".windspeed-value");
      // const errorwindow = document.querySelector(".city-not-found-blurb");
      // nfimg.classList.add("hidden");
      const cityCoordinates = `lat=${json.coord.lat}&lon=${json.coord.lon}`;
      console.log(45);
      console.log(cityCoordinates);
      // const openWeatherMapImageUrl = `https://api.openweathermap.org/img/wikipedia/${cityCoordinates}.png`;
      const openWeatherMapImageUrl = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`;
      console.log(openWeatherMapImageUrl);
      const cityPhotoElement = document.querySelector(".weather-icon");
      cityPhotoElement.src = openWeatherMapImageUrl;

      console.log(city.value);
      console.log(json);

      if (json.message == "city not found") {
        cityNF.innerHTML = `Sorry! City not found. Try again.`;
        errorFlag = true;
      }
      console.log(temperature.innerHTML);
      num = `${parseInt(json.main.temp)}`;
      num = num * 1.8;
      num = num + 32;
      console.log(Math.round(num));
      temperature.innerHTML = `${Math.round(num)} <span>F</span>`; // temperature is being set to the fahrenheit rounded to a whole number
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      windspeed.innerHTML = `${json.wind.speed} KM/h`;

      

      

      
    })
    .catch((error) => {
      console.log(error); // log any errors to the console
      const errorWindow = document.querySelector(".city-not-found-blurb");
      errorWindow.classList.remove("hidden");
      errorFlag = true;
    });
});
window.initMap = initMap;
initMap();
