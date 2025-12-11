<template>
  <div class="w-full space-y-6">
    <!-- Calendar Header -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <button @click="previousMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
          </h2>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <ChevronRight class="w-5 h-5" />
          </button>
          <button @click="goToToday" class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Today
          </button>
        </div>
        <div class="flex items-center gap-2">
          <select v-model="viewMode" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1">
        <!-- Day Headers -->
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
        >
          {{ day }}
        </div>

        <!-- Calendar Days -->
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          :class="{
            'bg-gray-50 dark:bg-gray-800/50': !day.isCurrentMonth,
            'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700': day.isToday,
          }"
        >
          <div class="flex items-center justify-between mb-1">
            <span
              class="text-sm font-medium"
              :class="{
                'text-gray-400': !day.isCurrentMonth,
                'text-blue-600 dark:text-blue-400 font-bold': day.isToday,
                'text-gray-900 dark:text-gray-100': day.isCurrentMonth && !day.isToday,
              }"
            >
              {{ day.date }}
            </span>
          </div>
          <div class="space-y-1">
            <div
              v-for="task in getTasksForDay(day)"
              :key="task.id"
              class="text-xs p-1.5 rounded cursor-pointer truncate"
              :class="getTaskColorClass(task.priority)"
              @click="openTask(task)"
            >
              {{ task.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Tasks -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Upcoming Tasks</h3>
      <div class="space-y-3">
        <div
          v-for="task in upcomingTasks"
          :key="task.id"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          @click="openTask(task)"
        >
          <div class="w-2 h-2 rounded-full" :class="getPriorityDotClass(task.priority)"></div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ task.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ task.dueDate ? formatDate(task.dueDate) : 'No due date' }}
            </p>
          </div>
          <span
            class="px-2 py-1 rounded-md text-xs font-medium"
            :class="getPriorityBadgeClass(task.priority)"
          >
            {{ task.priority }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useTaskStore } from '../../store/tasks'
import { formatDate } from '../../utils'

const taskStore = useTaskStore()
const currentMonth = ref(new Date())
const viewMode = ref('month')

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  const today = new Date()
  
  const days = []
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: prevLastDate - i,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(year, month - 1, prevLastDate - i),
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const fullDate = new Date(year, month, i)
    days.push({
      date: i,
      isCurrentMonth: true,
      isToday: fullDate.toDateString() === today.toDateString(),
      fullDate,
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(year, month + 1, i),
    })
  }
  
  return days
})

const upcomingTasks = computed(() => {
  return taskStore.tasks
    .filter(t => t.dueDate && !t.completed)
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
    .slice(0, 5)
})

function getTasksForDay(day: any) {
  if (!day.isCurrentMonth) return []
  
  return taskStore.tasks.filter(task => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate)
    return taskDate.toDateString() === day.fullDate.toDateString()
  })
}

function getTaskColorClass(priority: string) {
  const classes = {
    urgent: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-green-500 text-white',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-500 text-white'
}

function getPriorityDotClass(priority: string) {
  const classes = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-500'
}

function getPriorityBadgeClass(priority: string) {
  const classes = {
    urgent: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
}

function previousMonth() {
  const newDate = new Date(currentMonth.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentMonth.value = newDate
}

function nextMonth() {
  const newDate = new Date(currentMonth.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentMonth.value = newDate
}

function goToToday() {
  currentMonth.value = new Date()
}

function openTask(task: any) {
  // TODO: Open task detail modal
  console.log('Open task:', task)
}
</script>

