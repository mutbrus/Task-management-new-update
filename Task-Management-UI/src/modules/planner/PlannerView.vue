<template>
  <div class="w-full h-full bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Planner</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Plan, schedule, and track your tasks</p>
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

      <!-- View Tabs -->
      <div class="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
        <button
          v-for="view in views"
          :key="view.id"
          @click="activeView = view.id"
          class="px-4 py-2 text-sm font-medium transition-colors relative"
          :class="activeView === view.id
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'"
        >
          <div class="flex items-center gap-2">
            <component :is="view.icon" class="w-4 h-4" />
            <span>{{ view.label }}</span>
          </div>
          <div
            v-if="activeView === view.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
          />
        </button>
      </div>

      <!-- Content -->
      <div class="mt-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, Filter, Calendar, Clock, ListTodo, CheckSquare } from 'lucide-vue-next'
import { Button } from '../../components/ui/button'

const router = useRouter()
const route = useRoute()
const activeView = ref('calendar')

const views = [
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/planner/calendar' },
  { id: 'timeline', label: 'Timeline', icon: Clock, path: '/planner/timeline' },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, path: '/planner/tasks' },
  { id: 'completed', label: 'Completed', icon: CheckSquare, path: '/planner/completed' },
]

watch(() => route.path, (newPath) => {
  const view = views.find(v => newPath.includes(v.id))
  if (view) {
    activeView.value = view.id
  }
}, { immediate: true })

watch(activeView, (newView) => {
  const view = views.find(v => v.id === newView)
  if (view) {
    router.push(view.path).catch(() => {})
  }
})
</script>

