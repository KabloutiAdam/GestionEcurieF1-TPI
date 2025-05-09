

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/main/mainPage'
import LoginPage from './pages/main/loginPage'
import ProtectedRoute from './components/routeProtection'
import { useAuth } from './authProvider'
import DriversPage from './pages/main/driversPage'

function App() {

  const { currentUser } = useAuth()

  return (
    <>

      <Routes>


        <Route path="/login" element={
          currentUser !== null && currentUser !== undefined ? <Navigate to="/mainPage" /> : <LoginPage />} />

        <Route path="/mainPage" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <MainPage />
          </ProtectedRoute>} />

        <Route path="/tracks" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <MainPage />
          </ProtectedRoute>} />
        <Route path="/teams" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <MainPage />
          </ProtectedRoute>} />
        <Route path="/drivers" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <DriversPage />
          </ProtectedRoute>} />
        <Route path="/game" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <MainPage />
          </ProtectedRoute>} />


        <Route path="*" element={
          <Navigate to="/mainPage" />
        } />


      </Routes>

    </>
  )
}

export default App
