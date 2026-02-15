import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Toaster from './pages/Toaster'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {

  return (
    <div className="main-root">
      <Toaster/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Authentication/> }/>

            <Route element={<ProtectedRoute/>}>
                <Route element={<Mainpage />}>
                    <Route path='/dashboard' element={<Dashboard/> }/>
                </Route>
            </Route>
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
