import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "c8a77112b2faf6684bb4b21a0aa778ae";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setForecast(null);
    setCurrentWeather(null);

    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      setForecast(getDailyForecast(forecastResponse.data.list));
      setCurrentWeather({
        wind: (currentWeatherResponse.data.wind.speed * 3.6).toFixed(1), // Convert m/s to km/h
        humidity: currentWeatherResponse.data.main.humidity,
      });
    } catch (err) {
      setError("City not found. Please try again.");
    }
  };

  const getDailyForecast = (list) => {
    const dailyData = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          min: item.main.temp_min,
          max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      }

      dailyData[date].temps.push(item.main.temp);
      dailyData[date].min = Math.min(dailyData[date].min, item.main.temp_min);
      dailyData[date].max = Math.max(dailyData[date].max, item.main.temp_max);
    });

    return Object.keys(dailyData).map((date) => ({
      date,
      min: Math.round(dailyData[date].min),
      max: Math.round(dailyData[date].max),
      icon: dailyData[date].icon,
      description: dailyData[date].description,
    }));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {forecast && currentWeather && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">5-Day Forecast</h2>
            <div className="row">
              {forecast.map((day) => (
                <div key={day.date} className="col text-center">
                  <p>
                    <strong>{day.date}</strong>
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                  />
                  <p>
                    <strong>Min:</strong> {day.min}°C | <strong>Max:</strong>{" "}
                    {day.max}°C
                  </p>
                  <p>{day.description}</p>
                </div>
              ))}
            </div>
            <hr />
            <div className="text-center mt-4">
              <h3>Current Weather Details</h3>
              <p>
                <strong>Wind Speed:</strong> {currentWeather.wind} km/h
              </p>
              <p>
                <strong>Humidity:</strong> {currentWeather.humidity}%
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="text-center mt-5">
        <p>
          <strong>Coded by:</strong> Mary-Anne Schaffers|{" "}
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://your-netlify-link.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hosted on Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
