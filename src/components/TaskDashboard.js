"use client"

import { useState, useEffect } from "react"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import TaskFilter from "./TaskFilter"
import { getTasks, storeTasks } from "../utils/localStorage"

function TaskDashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const storedTasks = getTasks()
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    storeTasks(tasks)
  }, [tasks])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([newTask, ...tasks])
    setShowForm(false)
  }

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task)))
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId))
    }
  }

  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <h1>Welcome back, {user}!</h1>
            <p>Manage your tasks efficiently</p>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-controls">
          <button onClick={() => setShowForm(true)} className="add-task-btn" disabled={showForm || editingTask}>
            + Add New Task
          </button>

          <TaskFilter currentFilter={filter} onFilterChange={setFilter} taskCounts={taskCounts} />
        </div>

        {showForm && <TaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={(data) => updateTask(editingTask.id, data)}
            onCancel={() => setEditingTask(null)}
            isEditing={true}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          currentFilter={filter}
        />
      </main>
    </div>
  )
}

export default TaskDashboard
