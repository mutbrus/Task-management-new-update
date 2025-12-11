<script setup lang="ts">
import Workspace from '../button/Workspace.vue';
import Account from '../button/Account.vue';
import CommandPalette from '../CommandPalette.vue';

import { Calendar, Search as SearchIcon, Moon, Sun, Bell, BarChart3, Video } from 'lucide-vue-next'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Input } from '../ui/input'
import { useThemeStore } from '../../store/theme'
import { useTaskStore } from '../../store/tasks'

interface Props {
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [query: string]
}>()

const searchQuery = ref(props.modelValue)
const showCommandPalette = ref(false)
const themeStore = useThemeStore()
const taskStore = useTaskStore()

const handleSearch = () => {
  emit('update:modelValue', searchQuery.value)
  emit('search', searchQuery.value)
  // Update task store search filter
  taskStore.setFilter('search', searchQuery.value)
}

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue
})

function openCommandPalette() {
  showCommandPalette.value = true
}

function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openCommandPalette()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm px-4 py-2 rounded-t-lg">
    <div class="flex items-center justify-between gap-4 w-full">
      <div class="flex items-center gap-2 flex-shrink-0">
        <Workspace />
        <button
          class="hidden sm:flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Calendar"
        >
          <Calendar class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div class="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <button
          @click="openCommandPalette"
          class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow text-left"
        >
          <SearchIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span class="text-sm text-gray-500 dark:text-gray-400 flex-1">Search or type a command...</span>
          <kbd class="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            ⌘K
          </kbd>
        </button>
      </div>

      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          class="flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Notifications"
        >
          <Bell class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          class="flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Analytics"
        >
          <BarChart3 class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          class="flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Video"
        >
          <Video class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          @click="themeStore.toggleTheme()"
          class="flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="themeStore.isDark" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <Moon v-else class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <Account />
      </div>
    </div>

    <CommandPalette v-model:open="showCommandPalette" />
  </div>
</template>
