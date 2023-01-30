import React, {useEffect, useState} from "react";
import "./Weather.css";
import coldImg from '../assets/cold-bg.jpg';
import warmImg from '../assets/warm-bg.jpg';
import WeatherMain from "./weatherMain/WeatherMain";

const Weather = () => {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState({});

    useEffect(()=>{
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Lusaghbyur&appid=c2cb41d83e003e690090057aeeab736d`)
            .then(res => res.json())
            .then((data) => {
                setWeatherData(data);
                setCityName("")
            })
            .catch(error => console.log(error))

    },[])

    const handleChange = (e) => {
        setCityName(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=c2cb41d83e003e690090057aeeab736d`)
                .then(res => res.json())
                .then((data) => {
                    setWeatherData(data);
                    setCityName("")
                })
                .catch(error => console.log(error))
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

        <div className="weather">
            <div className="back"></div>
            <img className="background-img"
                 src={(weatherData.city !== undefined) ? (Math.round(weatherData.list[0].main.temp - 273) > 16 ? warmImg : coldImg) : coldImg}
                 alt="backgroundPicture"
            />
            <input
                type="text"
                placeholder="Search..."
                value={cityName}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
            />

            {
                weatherData.city !== undefined ? <WeatherMain weatherData={weatherData} dateBuilder={dateBuilder}/> : <h1 className="notData">Data Not Found</h1>
            }
        </div>

    )
}

export default Weather;