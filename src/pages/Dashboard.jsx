import React from 'react';
import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
    
      <div>
      <h1 className='welcome'>Welcome To The Dashboard!</h1>

    </div>
    <div className='dashboard-right'>
      <div className='card1'>
     <ul>
      <li>Environmental Monitoring</li>
      <li>Outdoor Temperature</li>
      <li>Living Romm Temperature</li>
      <li>Kichen Temperature</li>
      <li>PM2.5</li>
      <li>Humidity</li>
      <li>Air Quality Index</li>
     <li>Living Room Heating</li>
     <li>Kichen &Dining Heating</li>
      </ul> 
      </div>
   </div>

   <div className='card2'>
    <h1>IOT Part</h1>
    <ul>
      <li>Living Room Light</li>
      <li>Kichen Light</li>
    </ul>
   </div>
   
    </div>

  )
};
export default Dashboard;






