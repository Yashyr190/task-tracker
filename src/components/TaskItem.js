"use client"

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : "pending"}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <span className="task-status">{task.completed ? "Completed" : "Pending"}</span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="edit-btn" title="Edit task">
          ✏️
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn" title="Delete task">
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskItem
