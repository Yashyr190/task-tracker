import TaskItem from "./TaskItem"

function TaskList({ tasks, onEdit, onDelete, onToggleComplete, currentFilter }) {
  if (tasks.length === 0) {
    const emptyMessages = {
      all: "No tasks yet. Create your first task to get started!",
      completed: "No completed tasks yet. Mark some tasks as complete!",
      pending: "No pending tasks. Great job staying on top of things!",
    }

    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No Tasks Found</h3>
        <p>{emptyMessages[currentFilter]}</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>
          {currentFilter === "all" && "All Tasks"}
          {currentFilter === "completed" && "Completed Tasks"}
          {currentFilter === "pending" && "Pending Tasks"}
          <span className="task-count">({tasks.length})</span>
        </h3>
      </div>

      <div className="task-items">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
