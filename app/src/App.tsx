

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/main/mainPage'
import LoginPage from './pages/main/loginPage'
import ProtectedRoute from './components/routeProtection'
import { useAuth } from './authProvider'

function App() {

  const { currentUser, isLoading } = useAuth()

  return (
    <>

      <Routes>


      <Route path="/login" element={
          currentUser !== null && currentUser !== undefined ? <Navigate to="/mainPage" /> : <LoginPage/>} />

        <Route path="/mainPage" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <MainPage />
          </ProtectedRoute>} />

        <Route path="/tracks" element={<MainPage />} />
        <Route path="/teams" element={<MainPage />} />
        <Route path="/drivers" element={<MainPage />} />
        <Route path="/game" element={<MainPage />} />


        <Route path="*" element={
          <Navigate to="/mainPage" />
        } />


      </Routes>

    </>
  )
}

export default App
