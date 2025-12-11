<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed insights and analytics</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="reportPeriod" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <Button variant="outline" class="gap-2">
            <Download class="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <!-- Report Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="report in reportCards"
          :key="report.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ report.title }}</h3>
            <component :is="report.icon" class="w-5 h-5 text-gray-400" />
          </div>
          <div class="space-y-2">
            <p class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ report.value }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ report.description }}</p>
            <div class="flex items-center gap-2 mt-3">
              <span class="text-xs font-medium" :class="report.trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ report.trend >= 0 ? '↑' : '↓' }} {{ Math.abs(report.trend) }}%
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">vs previous period</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Task Completion Chart -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Task Completion Trend</h3>
          <div class="space-y-4">
            <div v-for="day in completionData" :key="day.date" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">{{ day.date }}</span>
                <span class="text-gray-500 dark:text-gray-400">{{ day.completed }}/{{ day.total }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  class="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  :style="{ width: `${(day.completed / day.total) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Priority Distribution -->
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Priority Distribution</h3>
          <div class="space-y-4">
            <div v-for="priority in priorityData" :key="priority.name" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" :class="priority.color"></div>
                  <span class="text-gray-700 dark:text-gray-300 capitalize">{{ priority.name }}</span>
                </div>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ priority.count }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-500"
                  :class="priority.color"
                  :style="{ width: `${priority.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Performance Table -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Team Performance</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tasks</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion Rate</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Time</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-for="member in teamPerformance"
                :key="member.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                      {{ member.initials }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ member.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ member.role }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ member.totalTasks }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ member.completed }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        class="h-2 rounded-full bg-blue-500"
                        :style="{ width: `${member.rate}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-900 dark:text-gray-100">{{ member.rate }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ member.avgTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Download, FileText, TrendingUp, Clock } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'
import { useTaskStore } from '../../store/tasks'

const taskStore = useTaskStore()
const reportPeriod = ref('month')

const reportCards = computed(() => {
  const total = taskStore.tasks.length
  const completed = taskStore.tasks.filter(t => t.completed).length
  const avgCompletionTime = 2.5 // hours
  
  return [
    {
      id: 1,
      title: 'Total Tasks',
      value: total,
      description: 'All tasks in workspace',
      trend: 12,
      icon: FileText,
    },
    {
      id: 2,
      title: 'Completion Rate',
      value: `${total > 0 ? Math.round((completed / total) * 100) : 0}%`,
      description: 'Tasks completed',
      trend: 8,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'Avg Completion',
      value: `${avgCompletionTime}h`,
      description: 'Average time per task',
      trend: -5,
      icon: Clock,
    },
  ]
})

const completionData = computed(() => {
  const days = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    
    // Simulate data - in real app, filter by date
    const dayTasks = taskStore.tasks.filter(t => {
      const taskDate = new Date(t.createdAt)
      return taskDate.toDateString() === date.toDateString()
    })
    
    days.push({
      date: dateStr,
      total: dayTasks.length || Math.floor(Math.random() * 10) + 5,
      completed: dayTasks.filter(t => t.completed).length || Math.floor(Math.random() * 5) + 2,
    })
  }
  
  return days
})

const priorityData = computed(() => {
  const priorities = ['urgent', 'high', 'medium', 'low']
  const total = taskStore.tasks.length
  
  return priorities.map(priority => {
    const count = taskStore.tasks.filter(t => t.priority === priority).length
    return {
      name: priority,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: {
        urgent: 'bg-red-500',
        high: 'bg-orange-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
      }[priority] || 'bg-gray-500',
    }
  })
})

const teamPerformance = computed(() => {
  const members = new Map()
  
  taskStore.tasks.forEach(task => {
    if (task.assignee) {
      const existing = members.get(task.assignee) || {
        name: task.assignee,
        initials: task.assignee.split(' ').map(n => n[0]).join('').toUpperCase(),
        role: 'Team Member',
        totalTasks: 0,
        completed: 0,
      }
      existing.totalTasks++
      if (task.completed) existing.completed++
      members.set(task.assignee, existing)
    }
  })
  
  return Array.from(members.values()).map(m => ({
    ...m,
    id: m.name.toLowerCase().replace(' ', '-'),
    rate: m.totalTasks > 0 ? Math.round((m.completed / m.totalTasks) * 100) : 0,
    avgTime: '2.5h',
  }))
})
</script>

