import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'

const home = () => {
  const [sidebarToggle, setSiderbarToggle] = useState(false)
  return (
    <>
      <Sidebar sidebarToggle={sidebarToggle}/>
      <Dashboard 
      sidebarToggle={sidebarToggle}
      setSiderbarToggle={setSiderbarToggle}/>      
    </>
  )
}

export default home
