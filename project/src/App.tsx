import './App.css'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './pages/landing-pages/LandingPage'
function App() {


  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}

export default App
