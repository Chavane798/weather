import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Maputo, MZ');
  const [inputValue, setInputValue] = useState('Maputo, MZ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            appid: 'f7b4deecb4fa9d1d218b7170e77edf96',
            units: 'metric',
            lang: 'pt' // Get descriptions in Portuguese
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        setError('Cidade não encontrada. Tente novamente.');
        setWeatherData(null);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Previsão do Tempo</h1>
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite a cidade e país (ex: Maputo, MZ)"
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {loading && <div className="loading-spinner"></div>}
      
      {error && <p className="error-message">{error}</p>}
      
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
          </div>
          <p className="weather-description">{weatherData.weather[0].description}</p>
          <div className="weather-details">
            <div>
              <span>Máx: {Math.round(weatherData.main.temp_max)}°C</span>
              <span>Mín: {Math.round(weatherData.main.temp_min)}°C</span>
            </div>
            <div>
              <span>Humidade: {weatherData.main.humidity}%</span>
              <span>Vento: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;