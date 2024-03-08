import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Routes>
      <Route element={<Home />} path='/' exact />
      <Route element={<Login />} path='/log' />
      <Route element={<Register />} path='/register' />
      <Route element={<Profile />} path='/me' />
      <Route element={<NotFoundPage />} path='*' />
    </Routes>
  )
}

export default App
