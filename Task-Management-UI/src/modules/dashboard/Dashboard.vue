<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of your workspace and team performance</p>
        </div>
        <div class="flex items-center gap-3">
          <Button variant="outline" class="gap-2">
            <Filter class="w-4 h-4" />
            Filter
          </Button>
          <Button class="gap-2">
            <Plus class="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{{ stat.value }}</p>
              <div class="flex items-center gap-2 mt-2">
                <p class="text-xs font-medium" :class="stat.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ stat.change >= 0 ? '↑' : '↓' }} {{ Math.abs(stat.change) }}%
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">vs last week</p>
              </div>
            </div>
            <div :class="[stat.color, 'p-3 rounded-lg']">
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - 2 spans -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Progress Chart -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Task Progress</h2>
                <select class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 bg-white dark:bg-gray-800">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="item in progressData" :key="item.label" class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{{ item.label }}</span>
                    <span class="text-gray-500 dark:text-gray-400">{{ item.value }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      class="h-2.5 rounded-full transition-all duration-500"
                      :class="item.color"
                      :style="{ width: `${item.value}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Performance -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Team Performance</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="member in teamMembers"
                  :key="member.id"
                  class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                    {{ member.initials }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ member.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ member.role }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ member.tasks }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">tasks</p>
                  </div>
                  <div class="w-24">
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        class="h-2 rounded-full bg-blue-500"
                        :style="{ width: `${member.completion}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Tasks -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Tasks</h2>
                <Button variant="ghost" size="sm" class="text-xs">View all</Button>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div
                  v-for="task in recentTasks"
                  :key="task.id"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                >
                  <Checkbox :checked="task.completed" @update:checked="() => toggleTask(task.id)" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" :class="{ 'line-through text-gray-400': task.completed }">
                      {{ task.title }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ task.project }}</span>
                      <span v-if="task.dueDate" class="text-xs text-gray-500 dark:text-gray-400">•</span>
                      <span v-if="task.dueDate" class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(task.dueDate) }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      v-if="task.priority"
                      class="px-2 py-1 rounded-md text-xs font-medium"
                      :class="{
                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400': task.priority === 'high' || task.priority === 'urgent',
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400': task.priority === 'medium',
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': task.priority === 'low',
                      }"
                    >
                      {{ task.priority }}
                    </span>
                    <Calendar class="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Activity Feed -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="activity in activities"
                  :key="activity.id"
                  class="flex items-start gap-3"
                >
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {{ activity.user.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900 dark:text-gray-100">
                      <span class="font-medium">{{ activity.user }}</span>
                      {{ activity.action }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatDate(activity.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Overview -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Projects</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="project in projects"
                  :key="project.id"
                  class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ project.name }}</h3>
                    <div class="flex items-center gap-1">
                      <Users class="w-4 h-4 text-gray-400" />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ project.members }}</span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-gray-500 dark:text-gray-400">Progress</span>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">{{ project.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        class="h-1.5 rounded-full transition-all"
                        :class="project.color"
                        :style="{ width: `${project.progress}%` }"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between text-xs mt-2">
                      <span class="text-gray-500 dark:text-gray-400">{{ project.completed }}/{{ project.total }} tasks</span>
                      <span class="text-gray-500 dark:text-gray-400">{{ project.dueDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 class="text-lg font-semibold mb-4">This Week</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-blue-100">Tasks Completed</span>
                <span class="text-xl font-bold">{{ weeklyStats.completed }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-blue-100">Hours Tracked</span>
                <span class="text-xl font-bold">{{ weeklyStats.hours }}h</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-blue-100">Productivity</span>
                <span class="text-xl font-bold">{{ weeklyStats.productivity }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus, CheckSquare, Clock, Users, TrendingUp, Calendar, Filter } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { formatDate } from '../../utils'
import { useTaskStore } from '../../store/tasks'

const taskStore = useTaskStore()

const stats = computed(() => {
  const total = taskStore.tasks.length
  const inProgress = taskStore.tasks.filter(t => t.status === 'In Progress').length
  const completed = taskStore.tasks.filter(t => t.status === 'Completed').length
  const overdue = taskStore.tasks.filter(t => {
    if (!t.dueDate || t.completed) return false
    return new Date(t.dueDate) < new Date()
  }).length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return [
    { id: 1, label: 'Total Tasks', value: total.toString(), change: 12, icon: CheckSquare, color: 'bg-blue-500' },
    { id: 2, label: 'In Progress', value: inProgress.toString(), change: 5, icon: Clock, color: 'bg-yellow-500' },
    { id: 3, label: 'Completed', value: completed.toString(), change: 18, icon: CheckSquare, color: 'bg-green-500' },
    { id: 4, label: 'Overdue', value: overdue.toString(), change: -8, icon: TrendingUp, color: 'bg-red-500' },
  ]
})

const progressData = computed(() => {
  const total = taskStore.tasks.length
  const completed = taskStore.tasks.filter(t => t.completed).length
  const inProgress = taskStore.tasks.filter(t => t.status === 'In Progress').length
  const todo = taskStore.tasks.filter(t => t.status === 'To Do').length
  
  return [
    { label: 'Completed', value: total > 0 ? Math.round((completed / total) * 100) : 0, color: 'bg-green-500' },
    { label: 'In Progress', value: total > 0 ? Math.round((inProgress / total) * 100) : 0, color: 'bg-yellow-500' },
    { label: 'To Do', value: total > 0 ? Math.round((todo / total) * 100) : 0, color: 'bg-blue-500' },
  ]
})

const teamMembers = computed(() => {
  const members = new Map<string, { name: string; initials: string; role: string; tasks: number; completion: number }>()
  
  taskStore.tasks.forEach(task => {
    if (task.assignee) {
      const existing = members.get(task.assignee) || {
        name: task.assignee,
        initials: task.assignee.split(' ').map(n => n[0]).join('').toUpperCase(),
        role: 'Team Member',
        tasks: 0,
        completed: 0,
      }
      existing.tasks++
      if (task.completed) existing.completed++
      members.set(task.assignee, existing)
    }
  })
  
  return Array.from(members.values()).map(m => ({
    ...m,
    id: m.name.toLowerCase().replace(' ', '-'),
    completion: m.tasks > 0 ? Math.round((m.completed / m.tasks) * 100) : 0,
  }))
})

const recentTasks = computed(() => {
  return taskStore.tasks
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5)
    .map(t => ({
      id: t.id,
      title: t.title,
      project: t.tags[0] || 'General',
      completed: t.completed,
      priority: t.priority,
      dueDate: t.dueDate,
    }))
})

const activities = computed(() => {
  return taskStore.tasks
    .filter(t => t.comments.length > 0 || t.updatedAt)
    .slice(0, 6)
    .map(t => ({
      id: t.id,
      user: t.assignee || 'System',
      action: t.comments.length > 0 
        ? `commented on task "${t.title}"`
        : `updated task "${t.title}"`,
      date: t.updatedAt,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
})

const projects = computed(() => {
  const projectMap = new Map<string, { name: string; total: number; completed: number; members: number; dueDate: string; color: string }>()
  
  taskStore.tasks.forEach(task => {
    const projectName = task.tags[0] || 'General'
    const existing = projectMap.get(projectName) || {
      name: projectName,
      total: 0,
      completed: 0,
      members: new Set<string>(),
      dueDate: task.dueDate ? formatDate(task.dueDate) : 'No due date',
      color: 'bg-blue-500',
    }
    existing.total++
    if (task.completed) existing.completed++
    if (task.assignee) existing.members.add(task.assignee)
    projectMap.set(projectName, existing)
  })
  
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500']
  let colorIndex = 0
  
  return Array.from(projectMap.values()).map(p => ({
    ...p,
    id: p.name.toLowerCase().replace(' ', '-'),
    members: p.members.size || 1,
    progress: p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0,
    color: colors[colorIndex++ % colors.length],
  })).slice(0, 3)
})

const weeklyStats = computed(() => {
  const completed = taskStore.tasks.filter(t => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return t.completed && t.updatedAt >= weekAgo
  }).length
  
  return {
    completed,
    hours: Math.round(completed * 2.5),
    productivity: Math.min(100, Math.round((completed / taskStore.tasks.length) * 100 * 3)),
  }
})

function toggleTask(id: string) {
  taskStore.toggleTaskComplete(id)
}
</script>
