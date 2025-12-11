<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Time Tracking</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Track time spent on tasks and projects</p>
        </div>
        <div class="flex items-center gap-3">
          <Button variant="outline" class="gap-2">
            <Download class="w-4 h-4" />
            Export
          </Button>
          <Button class="gap-2" @click="startTimer">
            <Play class="w-4 h-4" />
            Start Timer
          </Button>
        </div>
      </div>

      <!-- Active Timer -->
      <div v-if="activeTimer" class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-100 mb-1">Currently Tracking</p>
            <h2 class="text-2xl font-bold mb-2">{{ activeTimer.taskTitle }}</h2>
            <p class="text-3xl font-mono font-bold">{{ formatTime(activeTimer.elapsed) }}</p>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="outline" class="bg-white/20 border-white/30 text-white hover:bg-white/30" @click="pauseTimer">
              <Pause class="w-4 h-4 mr-2" />
              Pause
            </Button>
            <Button variant="outline" class="bg-white/20 border-white/30 text-white hover:bg-white/30" @click="stopTimer">
              <Square class="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      </div>

      <!-- Time Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          v-for="stat in timeStats"
          :key="stat.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            <component :is="stat.icon" class="w-5 h-5 text-gray-400" />
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ stat.value }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ stat.description }}</p>
        </div>
      </div>

      <!-- Time Entries -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Time Entries</h2>
            <select v-model="filterPeriod" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-for="entry in filteredEntries"
                :key="entry.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ entry.taskTitle }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    {{ entry.project }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(entry.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ formatTime(entry.duration) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="text-red-500 hover:text-red-700 text-sm" @click="deleteEntry(entry.id)">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Weekly Summary</h3>
          <div class="space-y-3">
            <div v-for="day in weeklySummary" :key="day.day" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ day.day }}</span>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ formatTime(day.hours) }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  :style="{ width: `${(day.hours / maxDailyHours) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Tasks</h3>
          <div class="space-y-4">
            <div v-for="task in topTasks" :key="task.id" class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ task.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ task.project }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ formatTime(task.totalTime) }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ task.entries }} entries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Play, Pause, Square, Download, Trash2, Clock, Calendar, TrendingUp, Target } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'
import { formatDate } from '../../utils'
import { showToast } from '../../composables/useToast'

const filterPeriod = ref('week')
const activeTimer = ref<{ taskTitle: string; startTime: number; elapsed: number } | null>(null)
let timerInterval: number | null = null

const timeEntries = ref([
  {
    id: '1',
    taskTitle: 'Design Database Schema',
    project: 'Backend',
    date: new Date(),
    duration: 3600000, // 1 hour in ms
  },
  {
    id: '2',
    taskTitle: 'Implement API Endpoints',
    project: 'Backend',
    date: new Date(Date.now() - 86400000),
    duration: 7200000, // 2 hours
  },
  {
    id: '3',
    taskTitle: 'Create UI Components',
    project: 'Frontend',
    date: new Date(Date.now() - 2 * 86400000),
    duration: 5400000, // 1.5 hours
  },
])

const timeStats = computed(() => {
  const today = timeEntries.value
    .filter(e => e.date.toDateString() === new Date().toDateString())
    .reduce((sum, e) => sum + e.duration, 0)
  
  const week = timeEntries.value
    .filter(e => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return e.date >= weekAgo
    })
    .reduce((sum, e) => sum + e.duration, 0)
  
  return [
    {
      id: 1,
      label: 'Today',
      value: formatTime(today),
      description: 'Time tracked today',
      icon: Clock,
    },
    {
      id: 2,
      label: 'This Week',
      value: formatTime(week),
      description: 'Total this week',
      icon: Calendar,
    },
    {
      id: 3,
      label: 'Avg Daily',
      value: formatTime(week / 7),
      description: 'Average per day',
      icon: TrendingUp,
    },
    {
      id: 4,
      label: 'Total Tasks',
      value: timeEntries.value.length.toString(),
      description: 'Tasks tracked',
      icon: Target,
    },
  ]
})

const filteredEntries = computed(() => {
  const now = new Date()
  let startDate = new Date()
  
  switch (filterPeriod.value) {
    case 'today':
      startDate.setHours(0, 0, 0, 0)
      break
    case 'week':
      startDate.setDate(startDate.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1)
      break
  }
  
  return timeEntries.value
    .filter(e => e.date >= startDate)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
})

const weeklySummary = computed(() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  
  return days.map((day, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    
    const dayEntries = timeEntries.value.filter(e => {
      return e.date.toDateString() === date.toDateString()
    })
    
    const hours = dayEntries.reduce((sum, e) => sum + e.duration, 0)
    
    return {
      day,
      hours,
    }
  })
})

const maxDailyHours = computed(() => {
  return Math.max(...weeklySummary.value.map(d => d.hours), 1)
})

const topTasks = computed(() => {
  const taskMap = new Map()
  
  timeEntries.value.forEach(entry => {
    const existing = taskMap.get(entry.taskTitle) || {
      title: entry.taskTitle,
      project: entry.project,
      totalTime: 0,
      entries: 0,
    }
    existing.totalTime += entry.duration
    existing.entries++
    taskMap.set(entry.taskTitle, existing)
  })
  
  return Array.from(taskMap.values())
    .sort((a, b) => b.totalTime - a.totalTime)
    .slice(0, 5)
    .map((t, i) => ({ ...t, id: `task-${i}` }))
})

function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function startTimer() {
  if (activeTimer.value) {
    showToast({
      type: 'info',
      title: 'Timer Running',
      message: 'Please stop the current timer first',
    })
    return
  }
  
  activeTimer.value = {
    taskTitle: 'New Task',
    startTime: Date.now(),
    elapsed: 0,
  }
  
  timerInterval = setInterval(() => {
    if (activeTimer.value) {
      activeTimer.value.elapsed = Date.now() - activeTimer.value.startTime
    }
  }, 1000) as unknown as number
  
  showToast({
    type: 'success',
    title: 'Timer Started',
    message: 'Time tracking has started',
  })
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function stopTimer() {
  if (activeTimer.value && timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
    
    // Add entry
    timeEntries.value.unshift({
      id: Date.now().toString(),
      taskTitle: activeTimer.value.taskTitle,
      project: 'General',
      date: new Date(),
      duration: activeTimer.value.elapsed,
    })
    
    activeTimer.value = null
    
    showToast({
      type: 'success',
      title: 'Timer Stopped',
      message: 'Time entry has been saved',
    })
  }
}

function deleteEntry(id: string) {
  const index = timeEntries.value.findIndex(e => e.id === id)
  if (index > -1) {
    timeEntries.value.splice(index, 1)
    showToast({
      type: 'success',
      title: 'Entry Deleted',
      message: 'Time entry has been removed',
    })
  }
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

