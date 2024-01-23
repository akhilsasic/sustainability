import React from 'react'
import Visualization from '../Visualization/Visualization'
import Sidebar from '../Sidebar/Sidebar'
import './Home.css';

function Home() {
  return (
    <div>
       <div className="main-container">
        {/* <Sidebar/> */}
        <Visualization />     
       </div>   
    </div>
  )
}

export default Home
