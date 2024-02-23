import API_KEY from './apikey.js';

const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${API_KEY}`);

  if (response.status !== 200) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    var data = await response.json();
    //console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    const weatherIcons = {
      Clouds: 'clouds.png',
      Clear: 'clear.png',
      Rain: 'rain.png',
      Drizzle: 'drizzle.png',
      Mist: 'mist.png',
    };

    const weatherConditions = data.weather[0].main;
    const iconFileName = weatherIcons[weatherConditions];
    if (iconFileName) weatherIcon.src = `images/${iconFileName}`;

    const cons = document.querySelector('.conditions');
    if (cons) {
      switch (weatherConditions) {
        case 'Clouds':
          cons.innerHTML = 'Cloudy Conditions';
          break;
        case 'Rain':
          cons.innerHTML = 'Rainy Conditions';
          break;
        case 'Mist':
          cons.innerHTML = 'Misty Conditions';
          break;
        case 'Drizzle':
          cons.innerHTML = 'Drizzle Conditions';
          break;
        case 'Clear':
          cons.innerHTML = 'Clear Conditions';
          break;
      }
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
