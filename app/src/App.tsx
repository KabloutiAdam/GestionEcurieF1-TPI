

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/main/mainPage'

function App() {


  return (
    <>

      <Routes>


        <Route path="/mainPage" element={<MainPage />} />
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
