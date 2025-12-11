<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Goals</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and achieve your objectives</p>
        </div>
        <Button class="gap-2">
          <Plus class="w-4 h-4" />
          New Goal
        </Button>
      </div>

      <!-- Goals Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          v-for="stat in goalStats"
          :key="stat.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            <component :is="stat.icon" class="w-5 h-5 text-gray-400" />
          </div>
          <p class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Active Goals -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Goals</h2>
        </div>
        <div class="p-6 space-y-4">
          <div
            v-for="goal in activeGoals"
            :key="goal.id"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{{ goal.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ goal.description }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(goal.status)"
                >
                  {{ goal.status }}
                </span>
                <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  <MoreVertical class="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div class="space-y-2 mb-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Progress</span>
                <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ goal.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  class="h-3 rounded-full transition-all duration-500"
                  :class="goal.color"
                  :style="{ width: `${goal.progress}%` }"
                ></div>
              </div>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <Calendar class="w-4 h-4" />
                  <span>{{ goal.dueDate }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Target class="w-4 h-4" />
                  <span>{{ goal.current }}/{{ goal.target }} {{ goal.unit }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <Users class="w-4 h-4" />
                <span>{{ goal.participants }} participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Completed Goals -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Completed Goals</h2>
        </div>
        <div class="p-6">
          <div class="space-y-3">
            <div
              v-for="goal in completedGoals"
              :key="goal.id"
              class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ goal.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Completed {{ goal.completedDate }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ goal.target }} {{ goal.unit }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Achieved</p>
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
import { Plus, Target, CheckCircle, TrendingUp, Calendar, Users, MoreVertical, Check } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'

const goalStats = computed(() => {
  return [
    {
      id: 1,
      label: 'Active Goals',
      value: '5',
      icon: Target,
    },
    {
      id: 2,
      label: 'Completed',
      value: '12',
      icon: CheckCircle,
    },
    {
      id: 3,
      label: 'On Track',
      value: '4',
      icon: TrendingUp,
    },
    {
      id: 4,
      label: 'Success Rate',
      value: '85%',
      icon: Target,
    },
  ]
})

const activeGoals = computed(() => {
  return [
    {
      id: 1,
      title: 'Complete Q1 Project Milestones',
      description: 'Finish all critical features for the Q1 release',
      status: 'On Track',
      progress: 75,
      current: 15,
      target: 20,
      unit: 'tasks',
      dueDate: 'Mar 31, 2025',
      participants: 5,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Improve Team Productivity',
      description: 'Increase task completion rate by 20%',
      status: 'In Progress',
      progress: 45,
      current: 9,
      target: 20,
      unit: '%',
      dueDate: 'Apr 15, 2025',
      participants: 8,
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Reduce Bug Count',
      description: 'Bring down critical bugs to zero',
      status: 'At Risk',
      progress: 30,
      current: 7,
      target: 0,
      unit: 'bugs',
      dueDate: 'Mar 20, 2025',
      participants: 3,
      color: 'bg-yellow-500',
    },
  ]
})

const completedGoals = computed(() => {
  return [
    {
      id: 1,
      title: 'Launch Mobile App',
      completedDate: '2 weeks ago',
      target: 1,
      unit: 'app',
    },
    {
      id: 2,
      title: 'Team Training Program',
      completedDate: '1 month ago',
      target: 10,
      unit: 'sessions',
    },
  ]
})

function getStatusClass(status: string) {
  const classes = {
    'On Track': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    'In Progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'At Risk': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    'Completed': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
}
</script>

