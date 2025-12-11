<template>
  <div class="h-screen bg-white flex flex-col">
    <!-- Top Toolbar -->
    <GanttToolbar @export="handleExport" @add="handleAdd" />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <GanttSidebar
        class="w-64 border-r border-gray-200 bg-gray-50"
        :tasks="tasks"
        :show-add="showAddTask"
        :value="newTaskName"
        @start-add="showAddTask = true"
        @add="addTask"
        @cancel-add="showAddTask = false"
      />

      <!-- Right Content - Calendar -->
      <GanttGrid class="flex-1 overflow-auto" :week-dates="weekDates" />
    </div>

    <!-- Zoom Controls -->
    <div class="fixed bottom-4 right-20 flex flex-col gap-1">
      <button
        class="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
      >
        <Plus class="w-4 h-4" />
      </button>
      <button
        class="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
      >
        <Minus class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GanttToolbar from '../../../../../components/gantt/GanttToolbar.vue'
import GanttSidebar from '../../../../../components/gantt/GanttSidebar.vue'
import GanttGrid from '../../../../../components/gantt/GanttGrid.vue'

import {
  ChevronDown,
  Plus,
  Minus,
  Menu,
  Search,
  Settings,
  User,
  Calendar,
  Download
} from 'lucide-vue-next'

const tasks = ref([])
const showAddTask = ref(false)
const newTaskName = ref('')

// Generate week dates (Nov 2 week)
const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const dates = [27, 28, 29, 30, 31, 1, 2]
const weekDates = days.map((day, i) => ({ day, date: dates[i] }))

// Add Task used by the sidebar component
const addTask = (name) => {
  const value = (typeof name === 'string') ? name.trim() : newTaskName.value.trim()
  if (value) {
    tasks.value.push({ id: Date.now(), name: value })
    newTaskName.value = ''
    showAddTask.value = false
  }
}

// toolbar handlers
function handleExport() {
  // simple placeholder - replace with real export logic
  console.log('Export requested')
}
function handleAdd() {
  showAddTask.value = true
}
</script>
