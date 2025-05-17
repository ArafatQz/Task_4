import './App.css';
import LandingPage from './pages/landing-pages/LandingPage';
import LogIn from './pages/login/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/MainDashboard';
import CardsDashboard from './pages/dashboard/CardsDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import UpdateEvent from './components/UpdateEvent';
import CreateEvent from './components/CreateEvent';
import AttendeesDashboard from './pages/dashboard/AttendeesDashboard';

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
        <Route path="/components/UpdateEvent/:id" element={<UpdateEvent />} />
        <Route path="/components/CreateEvent" element={<CreateEvent />} />
        <Route path="/dashboard/attendees" element={
          <ProtectedRoute>
            <AttendeesDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
