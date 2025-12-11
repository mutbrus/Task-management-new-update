<template>
  <div class="flex flex-col h-full">
    <header class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-1 bg-white dark:bg-gray-900">
      <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Personal</p>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">My Tasks</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tasks assigned to you across every space.</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Group by status
          </button>
          <button class="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors">
            Add task
          </button>
        </div>
      </div>
    </header>

    <div class="flex-1 overflow-auto p-4 space-y-4">
      <section class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div class="flex flex-wrap gap-3 text-sm">
          <span class="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Today</span>
          <span class="px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Overdue</span>
          <span class="px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">Upcoming</span>
        </div>
      </section>

      <TaskList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskList from '../../../../components/lists/TaskList.vue'
</script>

