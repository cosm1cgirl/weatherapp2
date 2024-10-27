import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import Footer from "./Footer";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setTemperature(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const temp = response.data.main.temp;
      setTemperature(
        `The current temperature in ${city} is ${Math.round(temp)}°C.`
      );
      setError("");
    } catch (error) {
      setError("Unable to fetch weather data. Please try another city.");
      setTemperature(null);
    }

    setCity("");
  };

  return (
    <div className="container weather-app">
      <h1>Weather Search Engine</h1>
      <Search city={city} setCity={setCity} handleSubmit={handleSubmit} />
      <div className="result">
        {error && <p className="error">{error}</p>}
        {temperature && <p>{temperature}</p>}
      </div>
      <Footer /> {}
    </div>
  );
}

export default App;
