import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear() 
  return (
    <div className='bg-slate-900 text-center p-3 fixed bottom-0 text-slate-400 text-sm w-full'>
        &copy; {year} Weather Canvas —  <a href="https://ahmedhamza.pk/" className='text-slate-100 font-semibold'>@AhmedHamzaArif</a> 
    </div>
  )
}

export default Footer