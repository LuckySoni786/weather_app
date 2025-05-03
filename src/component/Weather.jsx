import React, { useEffect, useState } from 'react';
import { FaLocationArrow, FaMapPin, FaSearch, FaWater, FaWind } from 'react-icons/fa';
import axios from 'axios';
const WeatherApp = () => {
    // api key 
    // const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiKey = '5ba4e110c9d81d9509ef5224f6f67ebb';

    // states 
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('jaipur');
    const [error, setError] = useState('');


    // fetch API using axios 
    const Weather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            setWeather(response.data);
            console.log(response.data);
            setError('');
            setCity("");


        } catch (err) {
            console.log("error is:", err);
            setWeather(null);
            setError('City Not Found!!')

        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-sans p-4">
            <div className="grid md:grid-cols-2 gap-20 max-w-5xl w-full">
                <div className="flex flex-col justify-center items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        alt="React Logo"
                        className="rounded-in w-80 h-80 mb-4"
                    />
                    <h1 className="text-4xl font-bold">Weather App</h1>
                    <p className="text-2xl mt-2">In React</p>
                </div>
                <div className="bg-gradient-to-b from-purple-700 to-indigo-700 rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto">
                    <div className="flex items-center space-x-2 mb-6">
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="flex-1 px-4 py-2 rounded-full bg-white text-black focus:outline-none "
                        />
                        <button className="bg-white p-2 rounded-full cursor-pointer transition-[.2s] hover:bg-red-200">
                            <FaSearch color='gray' onClick={Weather} />
                        </button>
                    </div>
                    {weather && (
                        <div>
                            <p className="text-2xl mt-1 flex justify-center items-center gap-1"><FaMapPin />{weather.name} <span className='text-[16px]'>(+{weather.sys.country})</span></p>
                            <div className="flex justify-center py-5 mb-5">
                                <div className="text-6xl flex flex-col items-center">
                                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                    <p className='text-[18px] leading-0'>{weather.weather[0].description}</p>
                                </div>
                            </div>


                            <div className="text-center mb-4">
                                <h2 className="text-6xl font-bolder">{weather.main.temp}<span className='blink-button'>°</span><span className='text-5xl'>C</span></h2>
                                <p className='py-3'>Feels Like: {weather.main.feels_like} °C</p>
                            </div>



                            <div className="flex justify-between items-center mt-13 text-sm">
                                <div className="flex items-center gap-2 text-xl">
                                    <span><FaWater /></span><span className="text-center">{weather.main.humidity} % <br /><span className='text-sm'>Humidity</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-xl">
                                    <span><FaWind /></span><span className="text-center">{weather.wind.speed} km/h <br /><span className='text-sm'>Wind</span></span>
                                </div>
                            </div>
                        </div>

                    )}
                    
                    {error && <p className='text-center text-xl'>{error}</p>}
                    {!weather && <div className="notFound  py-5 rounded-[50px] flex justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] my-2">
                        Please Enter City!!
                    </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default WeatherApp;
