import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      {/* Add Header component here */}
      <Header />
      <main className="">
        <Outlet />
      </main>

      {/* Add Footer component here */}
      <Footer />
    </>
  )
}

export default App