import React from 'react'
import HomePage from './Components/HomePage'
import AppLogineSigin from './Components/AppLogineSigin'
import Navbar from './Components/Navbar'
import JobBoard from './Components/JobBoard'

const App = () => {
  return (
    <div>
      <Navbar/>
     <div className="bg-[#000000] w-[100%]">
     <div className='md:px-24'>
      {/* <HomePage/> */}
      <AppLogineSigin/>
      {/* <About/> */}
      </div>
     </div>
    </div>
  )
}

export default App