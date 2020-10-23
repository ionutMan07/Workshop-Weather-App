var API_KEY = '';

var getWeather = function (position) {
  var city = document.querySelector('#weather').value;
  if (city.length > 2) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    requestUrl += city + '&appid=' + API_KEY + '&units=metric';
    console.log(requestUrl);
    fetch(requestUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        var temp = Math.ceil(result.main.temp);
        var text = 'The temperature in ' + city + ' is ' + temp + ' degrees C';
        document.querySelector('#result-by-city').innerText = text;
      });
  }
};

document.querySelector('#search').addEventListener('click', getWeather);

// Get weather by location

var getWeatherByLocation = function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(`latitude: ${lat} / longitude: ${lon}`);
  if (lat || lon === Number) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/find?lat=';
    requestUrl +=
      lat + '&lon=' + lon + '&cnd=1&appid=' + API_KEY + '&units=metric';
    console.log(requestUrl);
    fetch(requestUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        var temp = Math.ceil(result.list[0].main.temp);
        var city = result.list[0].name;
        var text = 'The temperature in ' + city + ' is ' + temp + ' degrees C';
        document.querySelector('#result-by-location').innerText = text;
        const url = `https://tyler-demo.herokuapp.com/?greyscale=False&lat=${lat}&lon=${lon}&zoom=13&width=400&height=400`;
        const map = document.querySelector('#map');
        map.innerHTML = `<img src=${url} />`;
      });
  }
};

const onError = () => {
  console.log('error');
  document.querySelector('#map').text = 'Unable to locate';
};

const locate = () => {
  navigator.geolocation.getCurrentPosition(getWeatherByLocation, onError);
};

const btn = document.querySelector('#locate');

btn.addEventListener('click', locate);
