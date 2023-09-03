import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import 'boxicons'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
// import logo from './assets/logo-sq.png'
import logo from './assets/logo-rec.png'
import Loader from './components/Loader'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [load, setload] = useState(false)
  const cityRef = useRef(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    // console.log("I am am effect!")
    
    if(navigator.geolocation){
      // console.log("I am am effect func!")
      navigator.geolocation.getCurrentPosition(async (position)=>{
        setload(true)
        // console.log("position: ", position.coords.latitude,position.coords.longitude)
        const response =  await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=60b1cec83b794868a4c45015231007&q=${position.coords.latitude},${position.coords.longitude}&days=3`)
        setload(false)
        setCurrentWeather(response.data);
      }, (error) => {
          if (error.code === NO_LOCATION_PROVIDER_AVAILABLE) {
            return alert("Open Location from settings")
          }
        }
      )
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
    return () => {
      
    }
  }, [])
  


  let getWeather = async (e) => {
    e.preventDefault()
    
    try{
      setload(true)
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=60b1cec83b794868a4c45015231007&q=${cityRef.current.value}&days=10`)
      // console.log("response: ", response.data)
      setWeatherData([ response.data, ...weatherData]);
      e.target.reset()
      setload(false)
    } catch(e) {
      setload(false)
      console.error(e.message)
    }
  }
  return (
    <>
      <Header logo={logo} />


      <div className='lg:container lg:mx-auto p-6 pb-10'>
        <h1 className='text-3xl sm:text-4xl mx-auto sm:w-11/12 md:w-8/12 lg:w-7/12 text-center mt-5'>Seeing the weather of the whole world with <span className='font-semibold'>Weather Canvas!</span></h1>
      
        <form onSubmit={getWeather} className='mx-auto mt-5 mb-10'>
          <div className='flex justify-center max-w-full px-2'>
            <input type="text" id='cityName' placeholder='Enter a city' minLength={2} maxLength={20} ref={cityRef} required className='px-4 h-12  bg-slate-700 max-w-full sm:w-96 focus:ring-0 focus:bg-slate-600 rounded-md focus-visible:outline-none'/>
            <button className="flex items-center bg-slate-700 fill-slate-100 border-0 h-12 px-3 focus:outline-none hover:bg-slate-600 rounded text-base mt-0 ms-2 text-center">
              <box-icon name='search'></box-icon>
            </button>
          </div>
        {load ? <Loader/> : ''}
        </form>

        {/* {weatherData.length || currentWeather ? null : <div>No Data</div>} */}

        <div className="flex flex-wrap">
        {weatherData.length ? 
            // {
              weatherData.map((weather, i)=>{
              return <Card weather={weather} key={i} />
            })
          // }
          : null}

        {currentWeather && <Card weather={currentWeather}/>}
        </div>


      </div>
      <Footer/>
    </>
  )
}

export default App
