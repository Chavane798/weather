
import Weather from "./component/Wether_api";
import './App.css';
import WeatherMap from "./component/WeatherMap";

function App() {
  return (
    <>
      <div>
        <Weather/>
      </div>

      <div className="map">
        <h1>Mapa</h1>
        <WeatherMap/>
      </div>
      
    </>
  );
}

export default App;
