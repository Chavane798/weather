import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const WeatherMap = () => {
  const [position, setPosition] = useState([-25.847335, 32.5741002]); // Default to Maputo
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'f7b4deecb4fa9d1d218b7170e77edf96';

  // Component to handle map view changes
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  // Fetch weather data when position changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&appid=${API_KEY}&units=metric&lang=pt`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erro ao buscar dados');
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [position]);

  // Handle map click to get new position
  const handleMapClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <div className="weather-map-container">
      <h2 className="map-title">Mapa Meteorológico</h2>
      
      <div className="map-controls">
        <button 
          onClick={() => setPosition([-25.847335, 32.5741002])} 
          className="control-button"
        >
          Centralizar em Maputo
        </button>
        {loading && <div className="loading-indicator">Carregando...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "500px", width: "100%", borderRadius: "8px" }}
        onClick={handleMapClick}
      >
        <ChangeView center={position} zoom={10} />
        
        {/* Base Map Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Weather Layers */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
          opacity={0.7}
        />
        
        {/* Temperature Layer */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
        />
        
        {/* Marker for selected location */}
        {weatherData && (
          <Marker position={position}>
            <Popup>
              <div className="weather-popup">
                <h3>{weatherData.name}</h3>
                <div className="weather-main">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    width="50"
                  />
                  <span className="temperature">{Math.round(weatherData.main.temp)}°C</span>
                </div>
                <p className="weather-description">{weatherData.weather[0].description}</p>
                <div className="weather-details">
                  <p>Máx: {Math.round(weatherData.main.temp_max)}°C</p>
                  <p>Mín: {Math.round(weatherData.main.temp_min)}°C</p>
                  <p>Humidade: {weatherData.main.humidity}%</p>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;