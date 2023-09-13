import React from 'react'

const Alert = ({msg}) => {
  return (
    <div className='px-4 py-2 bg-slate-400 text-white w-fit fixed top-6 rounded-md transition-all'>{msg}</div>
  )
}

export default Alert