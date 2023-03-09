const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const searchBtn = document.querySelector(".search-box button"); // select the search button element
const WeatherNovaImg = document.querySelector(".WeatherNovaImg");
const cityNF = document.querySelector(".city-not-found-blurb");
let errorFlag = false;
var cityPhoto = new Image();

searchBtn.addEventListener("click", () => {
  // add a click event listener to the search button
  const APIKey = "5c3412626cefebb5a1e1f2156cb1c7ba";
  const city = document.querySelector(".search-box input");
  console.log("Clicked!");
  city_name = city.value;
  if (city_name === "") {
    // check if the input value is empty
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${APIKey}`
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
      // WeatherNovaImg.classList.add("hidden");

      console.log(city_name);
      console.log(
        `https://www.google.com/search?client=opera-gx&q=${city_name}&sourceid=opera&ie=UTF-8&oe=UTF-8`
      );
      // cityPhoto.src = `https://www.google.com/search?client=opera-gx&q=${city_name}&sourceid=opera&ie=UTF-8&oe=UTF-8`;
      // cityPhoto.onload = function() {
      //   document.getElementById("city-photo").src = cityPhoto.src;
      // };
      // Convert the city name to lowercase and remove any spaces
      // var citySlug = city_name.toLowerCase().replace(/\s/g, "-");

      // // Create the URL for the image using the city slug
      // var imageUrl = "https://www.google.com/search?client=opera-gx&q=" +citySlug+ "&sourceid=opera&ie=UTF-8&oe=UTF-8/";
      

      // // Create a new Image object and set its source to the URL of the image
      // var cityPhoto = new Image();
      // cityPhoto.src = imageUrl;
      // console.log(imageUrl);

      console.log(json);

      if (json.message == "city not found") {
        cityNF.innerHTML = `Sorry! City not found. Try again.`;
        errorFlag = true;
      }

      // switch (json.weather[0].main) {
      //   case "Clear":
      //     image.src = "images/clear.png";
      //     break;
      //   case "Rain":
      //     image.src = "images/rain.png";
      //     break;
      //   case "Snow":
      //     image.src = "images/snow.png";
      //     break;
      //   // case "Clouds":
      //   //   image.src = "images/clouds.png";
      //   //   break;
      //   case "Haze":
      //     image.src = "images/haze.png";
      //     break;
      //   // default:
      //   //   image.src = "";
      // }

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
