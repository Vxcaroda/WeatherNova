const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const searchBtn = document.querySelector(".search-box button"); // select the search button element
const nfimg = document.querySelector(".nfimg");
const locationP = document.querySelector(".show-location");

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
      // update the weather information on the web page
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(
        ".weather-box .temperature-value"
      ); //set a variable temperature to the span (horizontal structure) named: temperature-value
      const description = document.querySelector(".description-value");
      const humidity = document.querySelector(".humidity-value");
      const windspeed = document.querySelector(".windspeed-value");
      const errorwindow = document.querySelector(".show-location");
      nfimg.classList.add("hidden");
      locationP.style.display = "none";
      
      console.log(city.value);
      console.log(json);

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        // case "Clouds":
        //   image.src = "images/clouds.png";
        //   break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        // default:
        //   image.src = "";
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
    });
});
