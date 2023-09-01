import moment from 'moment/moment'
import React from 'react'

const Card = ({weather}) => {
  return (
    <div className='weatherCard w-full md:w-9/12 xl:w-7/12 bg-slate-700 rounded-xl p-5 mx-auto mb-0'>
      {/* Current Weather */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-5">
        <div className="w-full md:w-1/2 md:text-end h-full">
        <div className='truncate text-ellipsis overflow-hidden text-2xl'>
          <span className='font-semibold'>{weather.location.name}, </span> {weather.location.country}</div>
          <div className='capitalize text-slate-100'> 
            <p>
              <span>{moment(weather.location.localtime, "YYYY-MM-DD HH:mm").format("dddd")} </span> 
              <span>{moment(weather.location.localtime).format("LT")}</span>
            </p>
            <p> {weather.current.condition.text} </p>
          </div>
        </div>
        <div className="sm:flex w-full md:w-1/2 items-center">
          <div className='w-full sm:w-1/2 flex items-center my-4 md:my-0'>
              <img src={weather.current.condition.icon} alt=""/>
              <span className='ms-1 text-4xl lg:text-5xl'>{Math.round(weather.current.temp_c)}<small><sup>°C</sup></small></span>
          </div>
          {/* Current Weather Info */}
          <div className="w-full sm:w-1/2 text-sm text-slate-100 sm:px-3 sm:border-s-2 sm:border-s-slate-500 h-fit">
            <p className='flex justify-between'>Humidity: <span>{weather.current.humidity}%</span></p>
            <p className='flex justify-between'>Real Feel: <span>{weather.current.feelslike_c}</span></p>
            <p className='flex justify-between'>Wind: <span>{weather.current.wind_kph}<small>km/h</small></span></p>
            <p className='flex justify-between'>Chances of Rain: <span>{weather.forecast.forecastday[0].day.daily_chance_of_rain}%</span></p>
          </div>
        </div>
      </div>
      {/* ForeCast Weather */}
      <div className='inline-grid grid-cols-3 w-full gap-2 sm:gap-3 lg:gap-4'>
        {weather.forecast.forecastday.map((data, i) => {
        return (
          <div className='bg-slate-600 rounded-md px-3 py-4 text-center'>
              <div className='text-xl font-semibold'>{Math.round(data.day.avgtemp_c)}<small><sup>°C</sup></small></div>
              <img src={data.day.condition.icon} className='mx-auto mb-2'/>
              <div>{moment(data.date).format('ddd')}</div>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default Card