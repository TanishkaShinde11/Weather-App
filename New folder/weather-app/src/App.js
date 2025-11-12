import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "d9d09313757b8b356d1a530b87b8510d"; // Replace with your OpenWeather API key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }
    try {
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  const getBackground = () => {
    if (!weather) return "default-bg";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "cloudy-bg";
    if (main.includes("rain")) return "rainy-bg";
    if (main.includes("clear")) return "sunny-bg";
    if (main.includes("snow")) return "snow-bg";
    return "default-bg";
  };

  return (
    <div className={`app ${getBackground()}`}>
      <div className="weather-card">
        <h1 className="title">🌎 Weather Forecast</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-details">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <p className="desc">{weather.weather[0].description}</p>
            <div className="info-box">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind: {weather.wind.speed} m/s</p>
              <p>🌡 Feels Like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
