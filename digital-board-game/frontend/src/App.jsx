import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import io from 'socket.io-client'
import LoginPage from './components/LoginPage'
import MenuPage from './components/MenuPage'
import GamePage from './components/GamePage'
import TeacherDashboard from './components/TeacherDashboard'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                user.type === 'student' ? <Navigate to="/menu" /> :
                user.type === 'teacher' ? <Navigate to="/teacher" /> :
                user.type === 'admin' ? <Navigate to="/admin" /> :
                <Navigate to="/login" />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/menu" 
            element={
              user && user.type === 'student' ? 
              <MenuPage user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/game" 
            element={
              user && user.type === 'student' ? 
              <GamePage user={user} socket={socket} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/teacher" 
            element={
              user && user.type === 'teacher' ? 
              <TeacherDashboard user={user} socket={socket} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin" 
            element={
              user && user.type === 'admin' ? 
              <AdminDashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
        
        <footer className="footer">
          <p>2025 di buat oleh clarysa sebagai penyelesaian skripsi</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
