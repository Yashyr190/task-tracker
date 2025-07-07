"use client"

function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all },
    { key: "pending", label: "Pending", count: taskCounts.pending },
    { key: "completed", label: "Completed", count: taskCounts.completed },
  ]

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn ${currentFilter === filter.key ? "active" : ""}`}
        >
          {filter.label}
          <span className="filter-count">{filter.count}</span>
        </button>
      ))}
    </div>
  )
}

export default TaskFilter
