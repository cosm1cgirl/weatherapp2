import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import Footer from "./Footer";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [condition, setCondition] = useState("");
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "fe1483f743b581b5520a1b725af03a49";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      clearWeatherData();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const temp = response.data.main.temp;
      const wind = response.data.wind.speed;
      const hum = response.data.main.humidity;
      const weatherIcon = response.data.weather[0].icon;

      let tempCondition = "";
      if (temp < 5) {
        tempCondition = "Very Cold";
      } else if (temp >= 5 && temp < 15) {
        tempCondition = "Cold";
      } else if (temp >= 15 && temp < 25) {
        tempCondition = "Mild";
      } else {
        tempCondition = "Warm";
      }

      setTemperature(`Temperature: ${Math.round(temp)}°C`);
      setWindSpeed(`Wind Speed: ${wind} m/s`);
      setHumidity(`Humidity: ${hum}%`);
      setCondition(`Condition: ${tempCondition}`);
      setIcon(`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
      setError("");
    } catch (error) {
      setError("Unable to fetch weather data. Please try another city.");
      clearWeatherData();
    }

    setLoading(false);
    setCity("");
  };

  const clearWeatherData = () => {
    setTemperature(null);
    setWindSpeed(null);
    setHumidity(null);
    setCondition("");
    setIcon(null);
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Weather Search Engine</h1>
      <Search city={city} setCity={setCity} handleSubmit={handleSubmit} />

      <div className="result my-4">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          !error && (
            <div className="weather-display d-flex justify-content-center">
              <div className="card shadow-sm p-4">
                <div className="d-flex align-items-center">
                  {icon && (
                    <img src={icon} alt="Weather icon" className="mr-3" />
                  )}
                  <div>
                    {temperature && (
                      <h5 className="temperature mb-1">{temperature}</h5>
                    )}
                    {city && <p className="font-weight-bold mb-1">{city}</p>}
                    <ul className="list-unstyled mb-0">
                      {windSpeed && <li>{windSpeed}</li>}
                      {humidity && <li>{humidity}</li>}
                      {condition && <li>{condition}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
