<template>
  <div class="w-full space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Completed Tasks</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ completedTasks.length }} tasks completed</p>
        </div>
        <div class="flex items-center gap-2">
          <select v-model="sortBy" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
          <Button variant="outline" size="sm" @click="clearCompleted">
            Clear All
          </Button>
        </div>
      </div>
    </div>

    <!-- Completed Tasks -->
    <div class="space-y-3">
      <div
        v-for="task in sortedTasks"
        :key="task.id"
        class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-all"
      >
        <div class="flex items-start gap-4">
          <div class="mt-1">
            <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check class="w-3 h-3 text-white" />
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 line-through opacity-75">
                {{ task.title }}
              </h3>
              <span
                class="px-2 py-1 rounded-md text-xs font-medium"
                :class="getPriorityBadgeClass(task.priority)"
              >
                {{ task.priority }}
              </span>
            </div>
            <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-through opacity-60">
              {{ task.description }}
            </p>
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                <span>Completed {{ formatDate(task.updatedAt) }}</span>
              </div>
              <div v-if="task.assignee" class="flex items-center gap-1">
                <User class="w-4 h-4" />
                <span>{{ task.assignee }}</span>
              </div>
              <div v-if="task.tags.length > 0" class="flex items-center gap-1">
                <Tag class="w-4 h-4" />
                <span>{{ task.tags.join(', ') }}</span>
              </div>
            </div>
            <div v-if="task.subtasks.length > 0" class="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <CheckSquare class="w-4 h-4" />
              <span>{{ task.subtasks.filter(s => s.completed).length }}/{{ task.subtasks.length }} subtasks completed</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" @click="reopenTask(task.id)">
              <RotateCcw class="w-4 h-4 mr-1" />
              Reopen
            </Button>
            <Button variant="ghost" size="sm" @click="deleteTask(task.id)">
              <Trash2 class="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
      
      <div v-if="sortedTasks.length === 0" class="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <CheckCircle class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400 font-medium">No completed tasks yet</p>
        <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Complete tasks to see them here</p>
      </div>
    </div>

    <!-- Completion Stats -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Completion Statistics</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ completionStats.total }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Completed</p>
        </div>
        <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ completionStats.thisWeek }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">This Week</p>
        </div>
        <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ completionStats.thisMonth }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">This Month</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, User, Tag, CheckSquare, Check, CheckCircle, RotateCcw, Trash2 } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'
import { useTaskStore } from '../../store/tasks'
import { formatDate } from '../../utils'
import { showToast } from '../../composables/useToast'

const taskStore = useTaskStore()
const sortBy = ref('date')

const completedTasks = computed(() => {
  return taskStore.tasks.filter(t => t.completed)
})

const sortedTasks = computed(() => {
  const tasks = [...completedTasks.value]
  
  switch (sortBy.value) {
    case 'date':
      return tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    case 'priority':
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return tasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 4
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 4
        return aPriority - bPriority
      })
    case 'title':
      return tasks.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return tasks
  }
})

const completionStats = computed(() => {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  return {
    total: completedTasks.value.length,
    thisWeek: completedTasks.value.filter(t => t.updatedAt >= weekAgo).length,
    thisMonth: completedTasks.value.filter(t => t.updatedAt >= monthAgo).length,
  }
})

function getPriorityBadgeClass(priority: string) {
  const classes = {
    urgent: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
}

function reopenTask(id: string) {
  taskStore.toggleTaskComplete(id)
  showToast({
    type: 'success',
    title: 'Task Reopened',
    message: 'Task has been moved back to active tasks',
  })
}

function deleteTask(id: string) {
  const task = taskStore.tasks.find(t => t.id === id)
  if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
    taskStore.deleteTask(id)
    showToast({
      type: 'success',
      title: 'Task Deleted',
      message: 'Task has been permanently deleted',
    })
  }
}

function clearCompleted() {
  if (confirm('Are you sure you want to delete all completed tasks? This action cannot be undone.')) {
    completedTasks.value.forEach(task => {
      taskStore.deleteTask(task.id)
    })
    showToast({
      type: 'success',
      title: 'Completed Tasks Cleared',
      message: 'All completed tasks have been deleted',
    })
  }
}
</script>

