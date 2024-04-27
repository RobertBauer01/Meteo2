var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');


button.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=d72fb680a697371ba834bcfadc0c6812&units=metric')
  .then(response => {
      if (!response.ok) {
          throw new Error('City not found');
      }
      return response.json();
  })
  .then(data => {
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];
      var feelsLike = data['main']['feels_like'];
      var humidity = data['main']['humidity'];
      var windSpeed = data['wind']['speed'];
      var sunrise = new Date(data['sys']['sunrise'] * 1000).toLocaleTimeString();
      var sunset = new Date(data['sys']['sunset'] * 1000).toLocaleTimeString();
      var weatherIconCode = data['weather'][0]['icon'];
      var imagePath = '';
      
      if (weatherIconCode === '01d' || weatherIconCode === '01n') {
          imagePath = 'assets/sun.png';
      } else if (weatherIconCode === '02d' || weatherIconCode === '02n') {
          imagePath = 'assets/clear-sky.png';
      } else if (weatherIconCode === '03d' || weatherIconCode === '03n' || weatherIconCode === '04d' || weatherIconCode === '04n') {
          imagePath = 'assets/cloud.png';
      } else if (weatherIconCode === '09d' || weatherIconCode === '09n' || weatherIconCode === '10d' || weatherIconCode === '10n') {
          imagePath = 'assets/rain.png';
      } else if (weatherIconCode === '11d' || weatherIconCode === '11n') {
          imagePath = 'assets/extreme-weather.png';
      } else if (weatherIconCode === '13d' || weatherIconCode === '13n') {
          imagePath = 'assets/snow.png';
      }
      
      var weatherIconElement = document.querySelector('.weather-icon');
      weatherIconElement.src = imagePath;
      
      main.innerHTML = nameValue;
      desc.innerHTML = "Description: " + descValue;
      temp.innerHTML = "Temperature: " + tempValue + "°C";
      feels.innerHTML = "Feels like: " + feelsLike + "°C";
      humidity.innerHTML = "Humidity: " + humidity + "%";
      wind.innerHTML = "Wind Speed: " + windSpeed + " m/s";
      sunriseTime.innerHTML = "Sunrise: " + sunrise;
      sunsetTime.innerHTML = "Sunset: " + sunset;
      
      input.value = "";
  })
  .catch(err => {
      alert("City not found");
      console.error(err);
  });
});