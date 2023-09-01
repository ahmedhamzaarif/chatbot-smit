import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear() 
  return (
    <div className='bg-slate-900 text-center p-3 fixed bottom-0 text-slate-400 text-sm w-full'>
        {/* Weather Canvas &copy; Designed & Developed by <a className='text-slate-100 font-semibold'>@AhmedHamzaArif</a>  */}
        &copy; {year} Weather Canvas —  <a className='text-slate-100 font-semibold'>@AhmedHamzaArif</a> 
    </div>
  )
}

export default Footer