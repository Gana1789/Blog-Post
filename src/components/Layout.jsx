import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
function Layout() {
  return (
    <>
    <Header/>
    <div className=''>{<Outlet/>}</div>
    </>
  )
}

export default Layout