import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = () => {
  const API_KEY = 'f7b4deecb4fa9d1d218b7170e77edf96'; // Sua chave de API do OpenWeatherMap

  return (
    <div>
      <MapContainer 
        center={[-25.847335, 32.5741002]} // Coordenadas de Maputo, Moçambique, ajuste conforme necessário
        zoom={10} 
        style={{ height: "500px", width: "100%" }}>
        {/* Camada básica do mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Camada do mapa meteorológico do OpenWeatherMap */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
