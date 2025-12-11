<template>
  <div class="flex items-center gap-1 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <button
      v-for="view in views"
      :key="view.id"
      @click="selectView(view.id)"
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
    <div class="ml-auto flex items-center gap-2 px-4">
      <button
        @click="showMore = !showMore"
        class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <MoreHorizontal class="w-4 h-4 text-gray-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { List, LayoutGrid, Calendar, GanttChart, MoreHorizontal } from 'lucide-vue-next'

const router = useRouter()

const views = [
  { id: 'list', label: 'List', icon: List, path: '/list' },
  { id: 'board', label: 'Board', icon: LayoutGrid, path: '/board' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
  { id: 'gantt', label: 'Gantt', icon: GanttChart, path: '/gantt' },
]

const activeView = ref('list')
const showMore = ref(false)

function selectView(viewId: string) {
  activeView.value = viewId
  const view = views.find(v => v.id === viewId)
  if (view) {
    router.push(view.path)
  }
}

// Watch route changes
router.afterEach((to) => {
  const view = views.find(v => to.path.includes(v.id))
  if (view) {
    activeView.value = view.id
  }
})
</script>

