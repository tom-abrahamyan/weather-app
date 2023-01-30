import React from "react";
import "./WeatherMain.css"

const WeatherMain =  ({weatherData, dateBuilder}) => {

    return (
        <div className="weather-main">
            <div className="selected_city">
                <h2>{weatherData.city.name}, {weatherData.city.country}</h2>
                <h5><i>{dateBuilder(new Date())}</i></h5>
            </div>
            <div className="temperature">
                <h1> {Math.round(weatherData.list[0].main.temp - 273)}&#8451;</h1>
            </div>
            <div className="description">
                {weatherData.list[0].weather[0].main}
            </div>
        </div>
    )
}

export default WeatherMain;