import React from 'react'

const Header = () => {
  return (
    <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex font-bold text-2xl items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-2xl">My Weather App</span>
            </a>
        </div>
    </header>
  )
}

export default Header