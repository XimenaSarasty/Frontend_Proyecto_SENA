import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = ({sidebarToggle, setSiderbarToggle}) => {
  return (
    <div className={`${sidebarToggle ?  '' : 'ml-64'} w-full`}>
        <Navbar  sidebarToggle={sidebarToggle}
        setSiderbarToggle={setSiderbarToggle}/>
    </div>
  )
}

export default Dashboard
