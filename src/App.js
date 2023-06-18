import React, {useState} from "react";
import OptionsWeather from "./components/OptionsWeather";
import {useTranslation} from "react-i18next";
const api = {
  key: "ad786bf1b61bcc222d1c4b84818ade36",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('')
            console.log(result)
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined")
        ? ((weather.main.temp > 16)
            ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
              type="text"
              className="search-bar"
              placeholder={t("search")}
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
          />
          <div className="translate">
            <button className="ru-transl" onClick={() => changeLanguage("ru")}>RUS</button>
            <button className="eng-transl" onClick={() => changeLanguage("en")}>ENG</button>
          </div>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="temp-min-max">
                <div className="temp-min">Min {Math.round(weather.main.temp_min)}°c</div>
                <span>/</span>
                <div className="temp-max">Max {Math.round(weather.main.temp_max)}°c</div>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="options-weather">
               <OptionsWeather title={t("Wind speed")} option={weather.wind.speed} valueSetting='m/s' />
                <OptionsWeather title={t("Feels")} option={Math.round(weather.main.feels_like)} valueSetting='°c' />
                <OptionsWeather title={t("Pressure")} option={weather.main.pressure} valueSetting='hPa' />
                <OptionsWeather title={t("Humidity")} option={weather.main.humidity} valueSetting='%' />
              </div>
            </div>
          </div>
          ) : ('')}
          <p className="author">{t("created")} <a className="author__link" href="https://vk.com/kushakov3">diziSXD</a>({t("click")})</p>
      </main>
    </div>
  );
}

export default App;
