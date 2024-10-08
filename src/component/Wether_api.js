import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // Certifique-se de criar este arquivo CSS para estilização

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('Mozambique, MZ'); // Cidade padrão
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return; // Não faz nada se a cidade estiver vazia
      setLoading(true);
      setError(null); // Limpa erro antes da nova requisição
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            appid: 'f7b4deecb4fa9d1d218b7170e77edf96', // Substitua pela sua chave
            units: 'metric' // Para Celsius, use 'imperial' para Fahrenheit
          }
        });
        setTemperature(response.data.main.temp);
      } catch (error) {
        setError('Não foi possível obter a temperatura.');
        setTemperature(null);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCity(e.target.value);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Previsão do Tempo</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        onKeyPress={handleKeyPress} // Chama a função ao pressionar Enter
        placeholder="Digite a cidade"
        className="city-input"
      />
      <button onClick={() => setCity(city)} className="search-button">Buscar</button>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      {temperature !== null && <p className="weather-info">A temperatura em {city} é {temperature}°C.</p>}
    </div>
  );
};

export default Weather;
