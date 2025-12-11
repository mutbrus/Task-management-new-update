<template>
  <Transition name="slide-up">
    <div
      v-if="selectedCount > 0"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-4 z-50"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ selectedCount }} task{{ selectedCount > 1 ? 's' : '' }} selected
        </span>
      </div>
      <div class="flex items-center gap-2 border-l border-gray-200 dark:border-gray-800 pl-4">
        <button
          @click="handleBulkAction('complete')"
          class="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <CheckCircle class="w-4 h-4 inline mr-1" />
          Complete
        </button>
        <button
          @click="handleBulkAction('delete')"
          class="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
        >
          <Trash2 class="w-4 h-4 inline mr-1" />
          Delete
        </button>
        <button
          @click="handleBulkAction('assign')"
          class="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <User class="w-4 h-4 inline mr-1" />
          Assign
        </button>
        <button
          @click="handleBulkAction('priority')"
          class="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <Flag class="w-4 h-4 inline mr-1" />
          Priority
        </button>
        <button
          @click="clearSelection"
          class="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, Trash2, User, Flag, X } from 'lucide-vue-next'
import { useTaskStore } from '../store/tasks'
import { showToast } from '../composables/useToast'

const taskStore = useTaskStore()

const selectedCount = computed(() => taskStore.selectedTasks.length)

function handleBulkAction(action: string) {
  const count = selectedCount.value
  
  switch (action) {
    case 'complete':
      taskStore.selectedTasks.forEach(id => {
        taskStore.updateTask(id, { completed: true, status: 'Completed' })
      })
      showToast({
        type: 'success',
        title: 'Tasks Completed',
        message: `${count} task${count > 1 ? 's' : ''} marked as complete`,
      })
      break
    case 'delete':
      taskStore.selectedTasks.forEach(id => {
        taskStore.deleteTask(id)
      })
      showToast({
        type: 'success',
        title: 'Tasks Deleted',
        message: `${count} task${count > 1 ? 's' : ''} deleted`,
      })
      break
    case 'assign':
      // Open assign dialog
      showToast({
        type: 'info',
        title: 'Assign Tasks',
        message: 'Assignee dialog will open here',
      })
      break
    case 'priority':
      // Open priority dialog
      showToast({
        type: 'info',
        title: 'Set Priority',
        message: 'Priority dialog will open here',
      })
      break
  }
  
  taskStore.deselectAllTasks()
}

function clearSelection() {
  taskStore.deselectAllTasks()
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translate(-50%, 0);
}

.slide-up-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>

