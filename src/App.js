"use client"

import { useState, useEffect } from "react"
import Login from "./components/Login"
import TaskDashboard from "./components/TaskDashboard"
import { getStoredUser } from "./utils/localStorage"
import "./styles/App.css"

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (username) => {
    setUser(username)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("taskTracker_user")
    localStorage.removeItem("taskTracker_tasks")
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="app">
      {user ? <TaskDashboard user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </div>
  )
}

export default App
