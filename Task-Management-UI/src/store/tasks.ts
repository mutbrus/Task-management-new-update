import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  assignee?: string
  assigneeId?: number
  dueDate?: Date
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'To Do' | 'In Progress' | 'Completed' | 'On Hold'
  tags: string[]
  subtasks: Array<{ title: string; completed: boolean }>
  comments: Array<{ id: string; author: string; text: string; createdAt: Date }>
  createdAt: Date
  updatedAt: Date
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Doing Frontend',
      description: 'Complete the frontend implementation',
      completed: false,
      assignee: 'John Doe',
      assigneeId: 1,
      dueDate: new Date(Date.now() + 86400000),
      priority: 'high',
      status: 'In Progress',
      tags: ['frontend', 'development'],
      subtasks: [
        { title: 'Setup components', completed: true },
        { title: 'Add styling', completed: false },
      ],
      comments: [],
      createdAt: new Date(Date.now() - 86400000 * 2),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Design Database',
      description: 'Design the database schema',
      completed: false,
      assignee: 'Jane Smith',
      assigneeId: 2,
      dueDate: new Date(Date.now() + 86400000 * 3),
      priority: 'medium',
      status: 'To Do',
      tags: ['database', 'design'],
      subtasks: [],
      comments: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Define Role and Permission',
      description: 'Define user roles and permissions',
      completed: true,
      assignee: 'Bob Wilson',
      assigneeId: 3,
      dueDate: new Date(Date.now() - 86400000),
      priority: 'low',
      status: 'Completed',
      tags: ['security', 'auth'],
      subtasks: [
        { title: 'Define roles', completed: true },
        { title: 'Implement permissions', completed: true },
      ],
      comments: [
        {
          id: '1',
          author: 'Alice Brown',
          text: 'Great work on this!',
          createdAt: new Date(Date.now() - 3600000),
        },
      ],
      createdAt: new Date(Date.now() - 86400000 * 5),
      updatedAt: new Date(),
    },
  ])

  const filters = ref({
    status: null as string | null,
    assignee: null as number | null,
    priority: null as string | null,
    date: null as string | null,
    search: '',
  })

  const selectedTasks = ref<string[]>([])

  const filteredTasks = computed(() => {
    let result = [...tasks.value]

    if (filters.value.status) {
      result = result.filter(t => t.status === filters.value.status)
    }

    if (filters.value.assignee) {
      result = result.filter(t => t.assigneeId === filters.value.assignee)
    }

    if (filters.value.priority) {
      result = result.filter(t => t.priority === filters.value.priority)
    }

    if (filters.value.date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      result = result.filter(t => {
        if (!t.dueDate) return false
        const dueDate = new Date(t.dueDate)
        dueDate.setHours(0, 0, 0, 0)

        switch (filters.value.date) {
          case 'today':
            return dueDate.getTime() === today.getTime()
          case 'tomorrow':
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            return dueDate.getTime() === tomorrow.getTime()
          case 'overdue':
            return dueDate.getTime() < today.getTime() && !t.completed
          default:
            return true
        }
      })
    }

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search) ||
        t.tags.some(tag => tag.toLowerCase().includes(search))
      )
    }

    return result
  })

  function addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tasks.value.push(newTask)
    return newTask
  }

  function updateTask(id: string, updates: Partial<Task>) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index > -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...updates,
        updatedAt: new Date(),
      }
    }
  }

  function deleteTask(id: string) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  function toggleTaskComplete(id: string) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      task.status = task.completed ? 'Completed' : 'To Do'
      task.updatedAt = new Date()
    }
  }

  function setFilter(key: keyof typeof filters.value, value: any) {
    filters.value[key] = value
  }

  function clearFilters() {
    filters.value = {
      status: null,
      assignee: null,
      priority: null,
      date: null,
      search: '',
    }
  }

  function toggleTaskSelection(id: string) {
    const index = selectedTasks.value.indexOf(id)
    if (index > -1) {
      selectedTasks.value.splice(index, 1)
    } else {
      selectedTasks.value.push(id)
    }
  }

  function selectAllTasks() {
    selectedTasks.value = filteredTasks.value.map(t => t.id)
  }

  function deselectAllTasks() {
    selectedTasks.value = []
  }

  return {
    tasks,
    filteredTasks,
    filters,
    selectedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setFilter,
    clearFilters,
    toggleTaskSelection,
    selectAllTasks,
    deselectAllTasks,
  }
})

