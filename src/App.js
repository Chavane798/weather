import Weather from "./component/Wether_api";
import './App.css';
import WeatherMap from "./component/WeatherMap";
import DailyForecast from "./component/DailyForecast";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Aplicação Meteorológica</h1>
        <p>Previsão do tempo para Moçambique</p>
      </header>

      <main className="weather-grid">
        <section className="current-weather">
          <h2>Condições Atuais</h2>
          <Weather />
        </section>

        <section className="weather-map">
          <h2>Mapa Meteorológico</h2>
          <WeatherMap />
        </section>

        <section className="daily-forecast">
          <h2>Previsão para 7 Dias</h2>
          <DailyForecast />
        </section>
      </main>

      <footer className="app-footer">
        <p>Dados fornecidos por OpenWeatherMap</p>
        <p>© {new Date().getFullYear()} Aplicação Meteorológica</p>
      </footer>
    </div>
  );
}

export default App;