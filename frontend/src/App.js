import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import WorkoutsContextProvider from './context/WorkoutContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <WorkoutsContextProvider>
        <Router>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </Router>
      </WorkoutsContextProvider>
    </div>
  )
}

export default App
