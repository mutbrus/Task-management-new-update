<template>
  <div class="flex flex-col h-full">
    <header class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
      <div>
        <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Inbox</p>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Follow-ups</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Everything you need to respond to or keep alive.</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Snooze
        </button>
        <button class="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors">
          New follow-up
        </button>
      </div>
    </header>

    <div class="flex-1 overflow-auto p-4 space-y-4">
      <section class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <span class="inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            Waiting on others
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            Needs reply
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Watching
          </div>
        </div>
      </section>

      <TaskList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskList from '../../../../components/lists/TaskList.vue'
</script>

