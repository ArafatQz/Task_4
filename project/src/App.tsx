import './App.css';
import LandingPage from './pages/landing-pages/LandingPage';
import LogIn from './pages/login/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/MainDashboard';
import CardsDashboard from './pages/dashboard/CardsDashboard';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/cards" element={
          <ProtectedRoute>
            <CardsDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
