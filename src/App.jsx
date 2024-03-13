import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path='/' exact />
        <Route element={<Profile />} path='/me' />
      </Route>
      <Route element={<Login />} path='/login' />
      <Route element={<Register />} path='/register' />
      <Route element={<NotFoundPage />} path='*' />
    </Routes>
  )
}

export default App
