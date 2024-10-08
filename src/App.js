
import Weather from "./component/Wether_api";
import './App.css';
import WeatherMap from "./component/WeatherMap";
import DailyForecast from "./component/DailyForecast";

function App() {
  return (
    <>
    <div className="map">
        <h1>Mapa</h1>
        <WeatherMap/>
      </div>

      <div>
        <Weather/>
      </div>

      <div>
        <DailyForecast/>
      </div>

      
      
    </>
  );
}

export default App;
