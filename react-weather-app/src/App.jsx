import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/Header'
import CardList from './components/CardList'
import Footer from './components/Footer'
// import logo from './assets/logo-sq.png'
import logo from './assets/logo-rec.png'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [load, setload] = useState(false)
  const cityRef = useRef(null)

  let getWeather = async (e) => {
    e.preventDefault()
    setload(true)

    try{
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=60b1cec83b794868a4c45015231007&q=${cityRef.current.value}&aqi=no`)
      // console.log("response: ", response.data)
      const data = response.data
      cityRef.current.value = ""
      setWeatherData([ data, ...weatherData]);
      setload(false)
    } catch(e) {
      setload(false)
      console.error(e.message)
    }
  }
  return (
    <>
      <Header logo={logo} />
      <div className='lg:container lg:mx-auto p-4'>
        <h1 className='text-4xl mx-auto sm:w-11/12 md:w-8/12 lg:w-7/12 text-center mt-5'>Seeing the weather of the whole world with <span className='font-semibold'>Weather Canvas!</span></h1>
      
        <form onSubmit={getWeather} className='mx-auto mt-5 mb-14'>
          <div className='flex flex-col sm:flex-row justify-center'>
            <input type="text" id='cityName' placeholder='Enter a city' minLength={2} maxLength={20} ref={cityRef} required className='px-4 h-12  bg-slate-700 sm:w-96 focus:ring-0 focus:bg-slate-600 rounded-md focus-visible:outline-none'/>
            <button className="bg-slate-700 border-0 h-12 px-3 focus:outline-none hover:bg-slate-600 rounded text-base mt-4 sm:mt-0 sm:ms-2 text-center">
              Get Weather
            </button>
          </div>
        {load ? <div className="p-3 bg-slate-500 mx-auto mt-3 w-fit rounded-md">Loading...</div>: ''}
        </form>

        <div className="flex flex-wrap">
          {weatherData.map((weather, i)=>{
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
