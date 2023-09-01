import React from 'react'

const Header = (props) => {
  return (
    <header>
        <div className="container mx-auto flex flex-wrap py-5 flex-row items-center">
            <a className="flex font-bold text-2xl items-center text-white mb-4 md:mb-0">
            <img id="headerLogo" src={props.logo} alt="" />
            </a>
        </div>
    </header>
  )
}

export default Header