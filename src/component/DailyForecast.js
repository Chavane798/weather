import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyForecast.css';

const DailyForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'f7b4deecb4fa9d1d218b7170e77edf96';
  const lat = -25.847335; // Latitude de Maputo, Moçambique (pode ajustar conforme necessário)
  const lon = 32.5741002; // Longitude de Maputo, Moçambique

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast/daily', {
          params: {
            lat: lat,
            lon: lon,
            cnt: 7, 
            appid: API_KEY,
            units: 'metric' 
          }
        });
        setForecast(response.data.list);
        setError(null);
      } catch (err) {
        setError('Erro ao obter a previsão do tempo.');
      }
      setLoading(false);
    };

    fetchForecast();
  }, []);

  return (
    <div className="forecast-container">
      <h2>Previsão do Tempo para 7 Dias</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="forecast-list">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <p><strong>Dia {index + 1}</strong></p>
              <p>Temperatura Máxima: {day.temp.max}°C</p>
              <p>Temperatura Mínima: {day.temp.min}°C</p>
              <p>Descrição: {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
