document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
      fetchWeatherData(location);
    } else {
      alert('Please enter a location');
    }
  });
  
  async function fetchWeatherData(location) {
    const apiKey = '279355c5292da3f01b8efb3ae2364029'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      console.log('Weather Data:', data);
      displayWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  }
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  }
  
  // Clear weather information
  function clearWeatherInfo() {
    document.getElementById('weatherInfo').innerHTML = '';
    document.getElementById('locationInput').value = '';
  }
  