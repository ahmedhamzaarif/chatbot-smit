import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/Header'
import CardList from './components/CardList'
import Footer from './components/Footer'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const cityRef = useRef(null)

  let getWeather = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=60b1cec83b794868a4c45015231007&q=${cityRef.current.value}&aqi=no`)
      console.log("response: ", response.data)
      const data = response.data
      setWeatherData([{ 
        city: data.location.name, 
        country: data.location.country, 
        temp: data.current.temp_c, 
        icon: data.current.condition.icon,
        feelslike: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
        condition: data.current.condition.text,
        time: data.location.localtime,
        hourlyData: data.forecast.forecastday[0].hour
      }, ...weatherData]);
    } catch(e) {
      console.error(e.message)
    }
  }
  return (
    <>
      <Header/>
      <div className='container mx-auto p-4'>
        <h1 className='text-4xl mx-auto w-7/12 text-center mt-5'>Seeing the weather of the whole world with <span className='font-bold'>My Weather App!</span></h1>
      
        <form onSubmit={getWeather} className='mx-auto mt-5 mb-14'>
          <div className='flex justify-center'>
            <input type="text" id='cityName' placeholder='Enter a city' minLength={2} maxLength={20} ref={cityRef} required className='px-4 h-12  bg-slate-700 w-96 focus:ring-0 focus:bg-slate-600 rounded-md focus-visible:outline-none'/>
            <button className="ms-2 inline-flex items-center bg-slate-700 border-0 py-1 px-3 focus:outline-none hover:bg-slate-600 rounded text-base mt-4 md:mt-0">
              Get Weather
            </button>
          </div>
        </form>
        
        <div className="flex flex-wrap">
          {
            weatherData.map((weather, i)=>{
              return <CardList weather={weather} key={i} />
            })
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
