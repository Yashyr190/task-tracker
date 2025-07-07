"use client"

import { useState, useEffect } from "react"

function TaskForm({ task, onSubmit, onCancel, isEditing = false }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || "")
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Task title is required")
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    })

    if (!isEditing) {
      setTitle("")
      setDescription("")
    }
    setError("")
  }

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h3>{isEditing ? "Edit Task" : "Add New Task"}</h3>
          <button onClick={onCancel} className="close-btn">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError("")
              }}
              placeholder="Enter task title"
              className={error ? "error" : ""}
            />
            <label htmlFor="title">Task Title *</label>
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="form-group">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="3"
            />
            <label htmlFor="description">Description (Optional)</label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
