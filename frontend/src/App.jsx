// External modules(or packages)
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

// Custom components
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App