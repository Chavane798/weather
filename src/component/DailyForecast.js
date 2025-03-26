import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyForecast.css';

const DailyForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'f7b4deecb4fa9d1d218b7170e77edf96';
  const lat = -25.847335; // Latitude de Maputo
  const lon = 32.5741002; // Longitude de Maputo

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        // Using the One Call API which includes daily forecasts
        const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
          params: {
            lat: lat,
            lon: lon,
            exclude: 'current,minutely,hourly,alerts',
            appid: API_KEY,
            units: 'metric'
          }
        });
        setForecast(response.data.daily.slice(0, 7)); // Get first 7 days
        setError(null);
      } catch (err) {
        setError('Erro ao obter a previsão do tempo.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchForecast();
  }, []);

  // Function to format the day name
  const getDayName = (timestamp, index) => {
    if (index === 0) return 'Hoje';
    
    const date = new Date(timestamp * 1000);
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[date.getDay()];
  };

  return (
    <div className="forecast-container">
      <h2>Previsão do Tempo para 7 Dias - Maputo</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="forecast-list">
          {forecast.map((day, index) => (
            <div key={day.dt} className="forecast-item">
              <p><strong>{getDayName(day.dt, index)}</strong></p>
              <p>Máx: {Math.round(day.temp.max)}°C</p>
              <p>Mín: {Math.round(day.temp.min)}°C</p>
              <p>{day.weather[0].description}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                alt={day.weather[0].description}
                width="50"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyForecast;