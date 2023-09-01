import moment from 'moment/moment'
import React from 'react'

const Card = ({weather}) => {
  const hourlyComponents = [];
  for (let i = 1; i < weather.forecast.forecastday[0].hour.length; i += 2) {
    const hourlyWeather = weather.forecast.forecastday[0].hour[i];
    const hour = moment(hourlyWeather.time, "YYYY-MM-DD HH:mm").hours();
    
    hourlyComponents.push(
      <div key={i} className='text-center'>
        <div className='bg-slate-600 rounded-md p-2 md:p-3'>
          <div className='text-xl font-semibold'>{Math.round(hourlyWeather.temp_c)}<small><sup>°C</sup></small></div>
          <img src={hourlyWeather.condition.icon} className='mx-auto'/>
          {hour < 12 ? <div>{hour} AM</div> : <div>{hour - 12} PM</div>}
        </div>
      </div>
    );
  }
  return (
    <div className='weatherCard w-full md:w-11/12 xl:w-9/12 mx-auto'>
      <div className='bg-slate-700 rounded-xl p-5 mx-auto mb-3'>
        <div className="flex flex-col md:flex-row-reverse items-center mb-5">
          <div className="w-full md:w-1/2 md:text-end h-full">
          <div className='truncate text-ellipsis overflow-hidden text-2xl'>
            <span className=' font-semibold'>{weather.location.name}, </span> {weather.location.country}</div>
            <div className='capitalize text-slate-100'> 
              <p>
                <span>{moment(weather.location.localtime, "YYYY-MM-DD HH:mm").format("dddd")} </span> 
                <span>{moment(weather.location.localtime, "YYYY-MM-DD HH:mm").format("MMM Do")}</span>
              </p>
              <p> {weather.current.condition.text} </p>
            </div>
          </div>
          <div className="sm:flex w-full md:w-1/2 items-center">
            <div className='w-full sm:w-1/2'>
              <div className="flex items-center">
                  <img src={weather.current.condition.icon} alt=""/>
                  <span className='ms-2 text-5xl'>{Math.round(weather.current.temp_c)}<small><sup>°C</sup></small></span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 text-sm text-slate-100 sm:px-3 sm:border-s-2 sm:border-s-slate-500 h-fit">
              <p className='flex justify-between'>Humidity: <span>{weather.current.humidity}%</span></p>
              <p className='flex justify-between'>Real Feel: <span>{weather.current.feelslike_c}</span></p>
              <p className='flex justify-between'>Wind: <span>{weather.current.wind_kph}<small>km/h</small></span></p>
              <p className='flex justify-between'>Chances of Rain: <span>{weather.forecast.forecastday[0].day.daily_chance_of_rain}%</span></p>
            </div>
          </div>
        </div>

          <div className='inline-grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 xl:gap-4 w-full'>
           {hourlyComponents}
          </div>
      </div>
    </div>
  )
}

export default Card