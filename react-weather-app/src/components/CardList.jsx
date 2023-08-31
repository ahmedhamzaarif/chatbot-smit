import moment from 'moment/moment'
import React from 'react'

const Card = ({weather}) => {
  const hourlyComponents = [];
  for (let i = 1; i < weather.hourlyData.length; i += 2) {
    const hourlyWeather = weather.hourlyData[i];
    const hour = moment(hourlyWeather.time, "YYYY-MM-DD HH:mm").hours();
    
    hourlyComponents.push(
      <div key={i} className='text-center'>
        <div className='bg-slate-600 rounded-md p-3'>
          <div className='text-xl font-semibold'>{Math.round(hourlyWeather.temp_c)}<small><sup>°C</sup></small></div>
          <img src={hourlyWeather.condition.icon} className='mx-auto'/>
          {hour < 12 ? <div>{hour} AM</div> : <div>{hour - 12} PM</div>}
        </div>
      </div>
    );
  }
  return (
    <div className='weatherCard w-2/3 mx-auto'>
      <div className='bg-slate-700 rounded-xl p-5 mx-auto mb-3'>
        <div className="grid grid-cols-4 items-center mb-5">
          <div>
            <div className="flex items-center">
                <img src={weather.icon} alt=""/>
                <span className='ms-2 text-5xl'>{Math.round(weather.temp)}<small><sup>°C</sup></small></span>
            </div>
          </div>
          <div className="text-sm text-slate-100 px-3 border-s-2 border-s-slate-500 h-fit">
            <p className='flex justify-between'>Humidity: <span>{weather.humidity}%</span></p>
            <p className='flex justify-between'>Real Feel: <span>{weather.feelslike}</span></p>
            <p className='flex justify-between'>Wind: <span>{weather.wind}<small>km/h</small></span></p>
            <p className='flex justify-between'>Chances of Rain: <span>{weather.rain}%</span></p>
          </div>
          <div className="col-span-2 text-end h-full">
          <div className='truncate text-ellipsis overflow-hidden text-2xl'>
            <span className=' font-semibold'>{weather.city}, </span> {weather.country}</div>
            <div className='capitalize text-slate-100'> 
              <p>
                <span>{moment(weather.time, "YYYY-MM-DD HH:mm").format("dddd")} </span> 
                <span>{moment(weather.time, "YYYY-MM-DD HH:mm").format("MMM Do")}</span>
              </p>
              <p> {weather.condition} </p>
            </div>
          </div>
        </div>

          <div className='inline-grid grid-cols-6 gap-4 w-full'>
           {hourlyComponents}
          </div>
      </div>
    </div>
    // <div className='w-1/3'>
    //   <div className='bg-slate-700 rounded-xl p-5 w-11/12 mx-auto mb-3'>
    //       <div className="flex items-center">
    //           <span className='font-semibold text-4xl w-2/3 text-ellipsis overflow-hidden'>{weather.city}</span>
    //           <img src={weather.icon} alt="" className='ms-auto'/>
    //           <span className='ms-2 text-4xl'>{weather.temp}<small><sup>°C</sup></small></span>
    //       </div>
    //       <p className='text-lg flex justify-between'>Humidity: <span>{weather.humidity}%</span></p>
    //       <p className='text-lg flex justify-between'>Real Feel: <span>{weather.feelslike}</span></p>
    //       <p className='text-lg flex justify-between'>UV: <span>{weather.uv}</span></p>
    //       <p className='text-lg flex justify-between'>Pressure: <span>{weather.pressure}<small>mbar</small></span></p>
    //       <p className='text-lg flex justify-between'>Wind: <span>{weather.wind}km/h</span></p>
    //   </div>
    // </div>
  )
}

export default Card