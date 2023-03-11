/*
Name: David Vicaro
Major: Software Engineer
Last Modified: 3-11-2023 12:15AM
Program Description: Weather Application
*/
//Constants/Declares/Global Variables
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const searchBtn = document.querySelector(".search-box button");
const travelimg = document.querySelector(".weather-icon");
const cityNF = document.querySelector(".city-not-found-blurb");
const nfimg = document.querySelector(".nfimg");
const date = document.querySelector(".date-value");
const cityID = document.querySelector(".city-value");
let errorFlag = false;
let clickedLat = 0.0;
let clickedLng = 0.0;
let cityName = "";

//Functions
//function (1) sets map coordinates when user clicks search for a new location
function setMapToCoordinates(lat, lng) {
  const mapElement = document.getElementById("map");
  console.log("inside: function (1) setMapToCoordinates");
  console.log("Setting map coordinates to ->", cityName);
  const map = new google.maps.Map(mapElement, {
    center: { lat, lng },
    zoom: 8,
  });
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
  });
  map.addListener("click", (event) => {
    // get the latitude and longitude coordinates of the click
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();
    clickedLat = lat;
    clickedLng = lng;

    // create an info window to display the coordinates
    const infowindow = new google.maps.InfoWindow({
      content: `Latitude: ${lat}<br>Longitude: ${lng}`,
    });

    // open the info window at the click location
    infowindow.setPosition(latLng);
    infowindow.open(map);
  });
}
//function (2) sets maps default landing coordinates upon startup (initializing map)
function initMap() {
  var myLatLng = { lat: 37.952861, lng: -17.413337 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: myLatLng,
  });

  // Add a marker to the map
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Marker 1!",
  });
  map.addListener("click", (event) => {
    // get the latitude and longitude coordinates of the click
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();
    clickedLat = lat;
    clickedLng = lng;

    // create an info window to display the coordinates
    const infowindow = new google.maps.InfoWindow({
      content: `Latitude: ${lat}<br>Longitude: ${lng}`,
    });

    // open the info window at the click location
    infowindow.setPosition(latLng);
    infowindow.open(map);
  });
}

google.maps.event.addDomListener(window, "load", initMap); //waits for web page to fully load, then calls initMap to initialize the Google Map.

searchBtn.addEventListener("click", () => {
  //After User Clicks Search: Continue below
  const APIKey = "5c3412626cefebb5a1e1f2156cb1c7ba"; //weather api key
  const city = document.querySelector(".search-box input");
  cityName = city.value;
  if (city.value === "") {
    //error checking
    return;
  }

  fetch(
    //fetch the json from openweather
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (errorFlag) {
        const errorWindow = document.querySelector(".city-not-found-blurb"); // hide error message if it was shown before
        if (errorWindow !== null) {
          errorWindow.classList.add("hidden");
        }
        errorFlag = false;
      }
      const image = document.querySelector(".weather-box img"); // update the weather information on the web page
      const temperature = document.querySelector(
        //set a variable temperature to the span (horizontal structure) named: temperature-value
        ".weather-box .temperature-value"
      );
      cityID.innerHTML = `${city.value
        .slice(0, 1)
        .toUpperCase()}${city.value.slice(1)}`; // Force uppercase on the first letter of the City Name being displayed on main page
        
      const description = document.querySelector(".description-value");
      const humidity = document.querySelector(".humidity-value");
      const windspeed = document.querySelector(".windspeed-value");
      if (!json.coord) {
        const errorWindow = document.querySelector(".city-not-found-blurb");
        errorWindow.innerHTML = `Invalid location! Try again`;
        // errorWindow.classList.remove("hidden");
        // errorFlag = true;
        throw new Error("Invalid location");
      }
      const cityCoordinates = `lat=${json.coord.lat}&lon=${json.coord.lon}`;
      // console.log(cityCoordinates);
      const openWeatherMapImageUrl = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`;
      const cityPhotoElement = document.querySelector(".weather-icon");
      cityPhotoElement.src = openWeatherMapImageUrl;
      console.log(clickedLat);
      console.log(clickedLng);
      console.log("json incoming:...");
      console.log(json);

      if (json.message == "city not found") {
        cityNF.innerHTML = `Sorry! City not found. Try again.`;
        errorFlag = true;
      }
      setMapToCoordinates(json.coord.lat, json.coord.lon); //Setting map to the location user searches
      num = `${parseInt(json.main.temp)}`; //parsing the num in Celsius and converting it to F
      num = num * 1.8;
      num = num + 32;
      temperature.innerHTML = `${Math.round(num)} <span>F</span>`; // temperature is being set to the fahrenheit rounded to a whole number
      description.innerHTML = `${json.weather[0].description}`; //setting description to the weather description from the json
      humidity.innerHTML = `${json.main.humidity}%`;
      windspeed.innerHTML = `${json.wind.speed} KM/h`;
    })

    .catch((error) => {
      // catch and log any errors to the console
      console.log(error);
      const errorWindow = document.querySelector(".city-not-found-blurb");
      errorWindow.classList.remove("hidden");
      errorFlag = true;
    });
});

const today = new Date();
const dateString = today.toLocaleDateString();
console.log(dateString);
date.innerHTML = `${dateString}`;

initMap();
