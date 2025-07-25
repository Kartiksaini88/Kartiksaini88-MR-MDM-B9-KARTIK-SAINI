const apiKey = `d23026f7cb9799d0df950f83081d05ec`; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDisplay = document.getElementById("weatherDisplay");
  const errorDiv = document.getElementById("error");

  weatherDisplay.innerHTML = "";
  errorDiv.textContent = "";

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (response.ok) {
      const { name, main, weather } = data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p><strong>${main.temp}°C</strong></p>
        <p>${weather[0].description}</p>
      `;
    } else {
      errorDiv.textContent = data.message || "City not found.";
    }
  } catch (error) {
    errorDiv.textContent = "Failed to fetch weather data. Please try again.";
  }
}
