<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2">Planner</h2>
    <nav class="flex flex-col gap-1">
      <button
        v-for="item in items"
        :key="item.id"
        @click="navigate(item.path)"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left w-full"
        :class="isActive(item.path)
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
      >
        <component :is="item.icon" class="w-4 h-4" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Clock, ListTodo, CheckSquare } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const items = [
  { id: 1, label: 'Calendar', icon: Calendar, path: '/planner/calendar' },
  { id: 2, label: 'Timeline', icon: Clock, path: '/planner/timeline' },
  { id: 3, label: 'Tasks', icon: ListTodo, path: '/planner/tasks' },
  { id: 4, label: 'Completed', icon: CheckSquare, path: '/planner/completed' },
]

function isActive(path: string) {
  return route.path.startsWith(path)
}

function navigate(path: string) {
  router.push(path).catch(() => {})
}
</script>

