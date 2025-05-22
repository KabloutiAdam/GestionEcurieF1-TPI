

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/main/mainPage'
import LoginPage from './pages/main/loginPage'
import ProtectedRoute from './components/routeProtection'
import { useAuth } from './authProvider'
import DriversPage from './pages/main/driversPage'
import TeamsPage from './pages/main/teamsPage'
import ProtectedGame from './components/gameProtection'
import GamePage from './pages/main/gamePages/gamePage'
import { GameProvider } from './context/gameContext'
import TeamSelectionPage from './pages/main/gamePages/teamSelection'
import DriverSelection from './pages/main/gamePages/driverSelection'
import TracksPage from './pages/main/tracksPage'

function App() {

  const { currentUser } = useAuth()

  return (
    <>
      <GameProvider>
        <Routes>


          <Route path="/login" element={
            currentUser !== null && currentUser !== undefined ? <Navigate to="/mainPage" /> : <LoginPage />} />

          <Route path="/mainPage" element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <MainPage />
            </ProtectedRoute>} />

          <Route path="/tracks" element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <TracksPage />
            </ProtectedRoute>} />
          <Route path="/teams" element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <TeamsPage />
            </ProtectedRoute>} />
          <Route path="/drivers" element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <DriversPage />
            </ProtectedRoute>} />


          <Route path="/game/teamSelection" element={

            <ProtectedGame allowedRoles={['admin', 'user']}>
              <TeamSelectionPage />
            </ProtectedGame>} />

          <Route path="/game/driverSelection" element={

            <ProtectedGame allowedRoles={['admin', 'user']}>
              <DriverSelection />
            </ProtectedGame>} />


          <Route path="/game/gamePage" element={
            <ProtectedGame allowedRoles={['admin', 'user']}>
              <GamePage />
            </ProtectedGame>} />


          <Route path="*" element={
            <Navigate to="/mainPage" />
          } />


        </Routes >
      </GameProvider>

    </>
  )
}

export default App
