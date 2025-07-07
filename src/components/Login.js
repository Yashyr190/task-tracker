"use client"

import { useState } from "react"
import { storeUser } from "../utils/localStorage"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters")
      return
    }

    storeUser(username.trim())
    onLogin(username.trim())
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Personal Task Tracker</h1>
          <p>Welcome! Please enter your username to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              placeholder="Enter your username"
              className={error ? "error" : ""}
            />
            <label htmlFor="username">Username</label>
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="login-btn">
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
