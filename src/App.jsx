import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BoletinesMensuales from './pages/BoletinesMensuales'
import BoletinesMensualesYear from './pages/BoletinesMensualesYear'
import InformativosMensuales from './pages/InformativosMensuales'
import InformativosMensualesYear from './pages/InformativosMensualesYear'
import Fotogaleria from './pages/Fotogaleria'
import BoletinesAnuales from './pages/BoletinesAnuales'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boletines-mensuales" element={<BoletinesMensuales />} />
        <Route path="/boletines-mensuales/:year" element={<BoletinesMensualesYear />} />
        <Route path="/informativos-mensuales" element={<InformativosMensuales />} />
        <Route path="/informativos-mensuales/:year" element={<InformativosMensualesYear />} />
        <Route path="/fotogaleria" element={<Fotogaleria />} />
        <Route path="/boletines-anuales" element={<BoletinesAnuales />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
