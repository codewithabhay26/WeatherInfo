// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '95471f53486270e049291718519c7eae';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

const getWeather = async (city) => {
  try {
    // Construct the API URL with the city name and API key
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch the weather data from the OpenWeatherMap API
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();

    // Check if the city is found
    if (data.cod === '404') {
      document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
    } else {
      displayWeather(data);
    }
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    document.getElementById('weather-info').innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
  }
};

// Display the weather information on the page
const displayWeather = (data) => {
  const weatherInfoDiv = document.getElementById('weather-info');

  // Extract weather data
  const cityName = data.name;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;

  // Create the HTML content to display weather data
  weatherInfoDiv.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Condition: ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
  `;
};
