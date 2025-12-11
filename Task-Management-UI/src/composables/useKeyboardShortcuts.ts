import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../store/tasks'
import { showToast } from './useToast'

export function useKeyboardShortcuts() {
  const router = useRouter()
  const taskStore = useTaskStore()

  function handleKeyDown(event: KeyboardEvent) {
    // Ignore if typing in input/textarea
    const target = event.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return
    }

    // Cmd/Ctrl + K - Command Palette
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      // Command palette is handled in Header component
      return
    }

    // Cmd/Ctrl + N - New Task
    if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
      event.preventDefault()
      // Trigger new task creation
      const event = new CustomEvent('create-task')
      window.dispatchEvent(event)
      showToast({
        type: 'info',
        title: 'New Task',
        message: 'Press the + button or use Quick Actions to create a task',
      })
      return
    }

    // Cmd/Ctrl + / - Toggle Sidebar
    if ((event.metaKey || event.ctrlKey) && event.key === '/') {
      event.preventDefault()
      // Toggle sidebar if needed
      return
    }

    // Cmd/Ctrl + 1 - Go to List
    if ((event.metaKey || event.ctrlKey) && event.key === '1') {
      event.preventDefault()
      router.push('/list')
      return
    }

    // Cmd/Ctrl + 2 - Go to Board
    if ((event.metaKey || event.ctrlKey) && event.key === '2') {
      event.preventDefault()
      router.push('/board')
      return
    }

    // Cmd/Ctrl + 3 - Go to Calendar
    if ((event.metaKey || event.ctrlKey) && event.key === '3') {
      event.preventDefault()
      router.push('/calendar')
      return
    }

    // Cmd/Ctrl + 4 - Go to Dashboard
    if ((event.metaKey || event.ctrlKey) && event.key === '4') {
      event.preventDefault()
      router.push('/dashboard')
      return
    }

    // Delete - Delete selected tasks
    if (event.key === 'Delete' && taskStore.selectedTasks.length > 0) {
      event.preventDefault()
      const count = taskStore.selectedTasks.length
      taskStore.selectedTasks.forEach(id => {
        taskStore.deleteTask(id)
      })
      showToast({
        type: 'success',
        title: 'Tasks Deleted',
        message: `${count} task${count > 1 ? 's' : ''} deleted`,
      })
      return
    }

    // Escape - Clear selection
    if (event.key === 'Escape') {
      taskStore.deselectAllTasks()
      return
    }

    // Cmd/Ctrl + A - Select all visible tasks
    if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
      event.preventDefault()
      taskStore.selectAllTasks()
      return
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}

