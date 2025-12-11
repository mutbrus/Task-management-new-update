<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Deep insights into your productivity</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="timeRange" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          v-for="metric in keyMetrics"
          :key="metric.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ metric.label }}</p>
            <component :is="metric.icon" class="w-5 h-5 text-gray-400" />
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ metric.value }}</p>
          <div class="flex items-center gap-1 mt-2">
            <component :is="metric.trend >= 0 ? TrendingUp : TrendingDown" class="w-4 h-4" :class="metric.trend >= 0 ? 'text-green-500' : 'text-red-500'" />
            <span class="text-xs font-medium" :class="metric.trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ Math.abs(metric.trend) }}%
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Productivity Chart -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Productivity Trend</h3>
          <div class="space-y-3">
            <div v-for="item in productivityData" :key="item.week" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Week {{ item.week }}</span>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ item.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  class="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                  :style="{ width: `${item.score}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Task Status Breakdown -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Task Status Breakdown</h3>
          <div class="space-y-4">
            <div v-for="status in statusBreakdown" :key="status.name" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" :class="status.color"></div>
                  <span class="text-gray-700 dark:text-gray-300">{{ status.name }}</span>
                </div>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ status.count }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  class="h-2.5 rounded-full transition-all duration-500"
                  :class="status.color"
                  :style="{ width: `${status.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Insights -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Peak Hours -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Peak Productivity Hours</h3>
          <div class="space-y-3">
            <div v-for="hour in peakHours" :key="hour.time" class="flex items-center gap-4">
              <div class="w-16 text-sm text-gray-600 dark:text-gray-400">{{ hour.time }}</div>
              <div class="flex-1">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    class="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    :style="{ width: `${hour.productivity}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-12 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">{{ hour.productivity }}%</div>
            </div>
          </div>
        </div>

        <!-- Task Velocity -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Task Velocity</h3>
          <div class="space-y-4">
            <div v-for="period in velocityData" :key="period.period" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ period.period }}</span>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ period.tasks }} tasks</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  class="h-3 rounded-full bg-blue-500 transition-all duration-500"
                  :style="{ width: `${(period.tasks / maxVelocity) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Efficiency Metrics -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Efficiency Metrics</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="metric in efficiencyMetrics" :key="metric.id" class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ metric.value }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ metric.label }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ metric.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, TrendingDown, Zap, Target, Clock, BarChart3 } from 'lucide-vue-next'
import { useTaskStore } from '../../store/tasks'

const taskStore = useTaskStore()
const timeRange = ref('30d')

const keyMetrics = computed(() => {
  const total = taskStore.tasks.length
  const completed = taskStore.tasks.filter(t => t.completed).length
  const inProgress = taskStore.tasks.filter(t => t.status === 'In Progress').length
  
  return [
    {
      id: 1,
      label: 'Productivity Score',
      value: '87%',
      trend: 5,
      icon: Zap,
    },
    {
      id: 2,
      label: 'Tasks Completed',
      value: completed.toString(),
      trend: 12,
      icon: Target,
    },
    {
      id: 3,
      label: 'Avg Time/Task',
      value: '2.3h',
      trend: -8,
      icon: Clock,
    },
    {
      id: 4,
      label: 'Active Tasks',
      value: inProgress.toString(),
      trend: 3,
      icon: BarChart3,
    },
  ]
})

const productivityData = computed(() => {
  return Array.from({ length: 8 }, (_, i) => ({
    week: i + 1,
    score: Math.floor(Math.random() * 30) + 70,
  }))
})

const statusBreakdown = computed(() => {
  const total = taskStore.tasks.length
  const statuses = ['To Do', 'In Progress', 'Completed', 'On Hold']
  
  return statuses.map(status => {
    const count = taskStore.tasks.filter(t => t.status === status).length
    return {
      name: status,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: {
        'To Do': 'bg-blue-500',
        'In Progress': 'bg-yellow-500',
        'Completed': 'bg-green-500',
        'On Hold': 'bg-gray-500',
      }[status] || 'bg-gray-500',
    }
  })
})

const peakHours = computed(() => {
  const hours = []
  for (let i = 9; i <= 17; i++) {
    hours.push({
      time: `${i}:00`,
      productivity: Math.floor(Math.random() * 40) + 60,
    })
  }
  return hours
})

const velocityData = computed(() => {
  return [
    { period: 'This Week', tasks: taskStore.tasks.filter(t => !t.completed).length },
    { period: 'Last Week', tasks: Math.floor(Math.random() * 10) + 15 },
    { period: 'This Month', tasks: taskStore.tasks.length },
    { period: 'Last Month', tasks: Math.floor(Math.random() * 20) + 30 },
  ]
})

const maxVelocity = computed(() => {
  return Math.max(...velocityData.value.map(v => v.tasks))
})

const efficiencyMetrics = computed(() => {
  return [
    {
      id: 1,
      value: '94%',
      label: 'On-Time Completion',
      description: 'Tasks completed by due date',
    },
    {
      id: 2,
      value: '2.3h',
      label: 'Avg Task Duration',
      description: 'Average time to complete',
    },
    {
      id: 3,
      value: '87%',
      label: 'Efficiency Rate',
      description: 'Overall productivity score',
    },
  ]
})
</script>

