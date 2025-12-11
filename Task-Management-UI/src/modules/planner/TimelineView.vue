<template>
  <div class="w-full space-y-6">
    <!-- Timeline Header -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="previousWeek" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ weekRange }}
          </h2>
          <button @click="nextWeek" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <ChevronRight class="w-5 h-5" />
          </button>
          <button @click="goToToday" class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Today
          </button>
        </div>
        <div class="flex items-center gap-2">
          <select v-model="zoomLevel" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Timeline Grid -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <div class="min-w-full">
          <!-- Time Header -->
          <div class="flex border-b border-gray-200 dark:border-gray-800">
            <div class="w-48 p-3 border-r border-gray-200 dark:border-gray-800 font-semibold text-sm text-gray-700 dark:text-gray-300">
              Task
            </div>
            <div class="flex-1 flex">
              <div
                v-for="day in weekDays"
                :key="day.date"
                class="flex-1 p-3 border-r border-gray-200 dark:border-gray-800 text-center"
                :class="day.isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''"
              >
                <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ day.dayName }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ day.dateStr }}</div>
              </div>
            </div>
          </div>

          <!-- Tasks Timeline -->
          <div class="divide-y divide-gray-200 dark:divide-gray-800">
            <div
              v-for="task in timelineTasks"
              :key="task.id"
              class="flex min-h-[60px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <!-- Task Name -->
              <div class="w-48 p-3 border-r border-gray-200 dark:border-gray-800 flex items-center">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ task.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ task.assignee || 'Unassigned' }}</p>
                </div>
              </div>
              
              <!-- Timeline Bar -->
              <div class="flex-1 flex relative">
                <div
                  v-for="day in weekDays"
                  :key="day.date"
                  class="flex-1 border-r border-gray-200 dark:border-gray-800 relative"
                >
                  <div
                    v-if="isTaskOnDay(task, day)"
                    class="absolute inset-y-1 mx-1 rounded-md flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
                    :class="getTaskColorClass(task.priority)"
                    :style="getTaskBarStyle(task, day)"
                    @click="openTask(task)"
                  >
                    {{ task.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useTaskStore } from '../../store/tasks'

const taskStore = useTaskStore()
const currentWeek = ref(new Date())
const zoomLevel = ref('week')

const weekDays = computed(() => {
  const startOfWeek = new Date(currentWeek.value)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day
  startOfWeek.setDate(diff)
  startOfWeek.setHours(0, 0, 0, 0)
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return {
      date: date.toISOString(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday: date.toDateString() === today.toDateString(),
      fullDate: date,
    }
  })
})

const weekRange = computed(() => {
  if (weekDays.value.length === 0) return ''
  const start = weekDays.value[0].fullDate
  const end = weekDays.value[6].fullDate
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
})

const timelineTasks = computed(() => {
  return taskStore.tasks.filter(t => t.dueDate && !t.completed)
})

function isTaskOnDay(task: any, day: any) {
  if (!task.dueDate) return false
  const taskDate = new Date(task.dueDate)
  taskDate.setHours(0, 0, 0, 0)
  return taskDate.toDateString() === day.fullDate.toDateString()
}

function getTaskBarStyle(task: any, day: any) {
  if (!isTaskOnDay(task, day)) return {}
  return {
    left: '10%',
    right: '10%',
  }
}

function getTaskColorClass(priority: string) {
  const classes = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-500'
}

function previousWeek() {
  const newDate = new Date(currentWeek.value)
  newDate.setDate(newDate.getDate() - 7)
  currentWeek.value = newDate
}

function nextWeek() {
  const newDate = new Date(currentWeek.value)
  newDate.setDate(newDate.getDate() + 7)
  currentWeek.value = newDate
}

function goToToday() {
  currentWeek.value = new Date()
}

function openTask(task: any) {
  console.log('Open task:', task)
}
</script>

