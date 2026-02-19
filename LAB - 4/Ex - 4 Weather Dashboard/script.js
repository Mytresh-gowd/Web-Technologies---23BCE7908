const apiKey = "YOUR_API_KEY";  // Replace with your API key
const statusDiv = document.getElementById("status");
const weatherBox = document.getElementById("weatherBox");

let cachedCity = "";
let cachedData = null;

function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (city === "") return;

    // Check cache first
    if (city.toLowerCase() === cachedCity.toLowerCase()) {
        displayWeather(cachedData);
        statusDiv.innerHTML = "Loaded from cache ✅";
        return;
    }

    statusDiv.innerHTML = '<span class="spinner"></span> Loading...';
    statusDiv.className = "loading";
    weatherBox.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            if (!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then(data => {

            cachedCity = city;
            cachedData = data;

            displayWeather(data);
            statusDiv.innerHTML = "Weather loaded successfully (200 OK)";
            statusDiv.className = "";

        })
        .catch(error => {
            statusDiv.innerHTML = error.message;
            statusDiv.className = "error";
        });
}

function displayWeather(data) {

    weatherBox.innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
    `;
}
