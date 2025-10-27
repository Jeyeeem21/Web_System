import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { Sidebar } from './components/layout/sidebar.jsx'
import { Footer } from './components/layout/footer.jsx'
import { Dashboard } from './pages/dashboard.jsx'
import { Appointments } from './pages/appointments.jsx'
import { Schedules } from './pages/schedules.jsx'
import { Doctors } from './pages/doctors.jsx'
import { Staff } from './pages/staff.jsx'
import { Patients } from './pages/patients.jsx'
import { Services } from './pages/services.jsx'
import { Inventory } from './pages/inventory.jsx'
import { SettingsPage } from './pages/settings.jsx'
import ClientHome from './client/home.jsx'
import ClientAbout from './client/about.jsx'
import ClientServices from './client/services.jsx'
import ClientDoctors from './client/doctors.jsx'
import ClientContact from './client/contact.jsx'
import Login from './client/login.jsx'
import Register from './client/register.jsx'
import { cn } from './lib/utils'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Router>
      <Routes>
        {/* Client Routes - No sidebar/footer */}
        <Route path="/" element={<ClientHome />} />
        <Route path="/about" element={<ClientAbout />} />
        <Route path="/services-client" element={<ClientServices />} />
        <Route path="/doctors-client" element={<ClientDoctors />} />
        <Route path="/contact" element={<ClientContact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes - With sidebar/footer */}
        <Route path="/*" element={
          <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main 
              className={cn(
                "flex-1 transition-all duration-300",
                isMobile ? "px-4 py-6 mb-24 pt-20" : "p-4 md:p-6 lg:p-8",
                isMobile ? "" : isCollapsed ? "ml-20" : "ml-64"
              )}
            >
              <div className="max-w-7xl mx-auto space-y-6">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/schedules" element={<Schedules />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
              <Footer />
            </main>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
