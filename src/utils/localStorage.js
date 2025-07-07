const USER_KEY = "taskTracker_user"
const TASKS_KEY = "taskTracker_tasks"

export const storeUser = (username) => {
  localStorage.setItem(USER_KEY, username)
}

export const getStoredUser = () => {
  return localStorage.getItem(USER_KEY)
}

export const storeTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY)
  return tasks ? JSON.parse(tasks) : []
}
