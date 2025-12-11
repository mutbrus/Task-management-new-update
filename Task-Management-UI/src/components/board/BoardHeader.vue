<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shadow-sm">
    <div class="flex items-center gap-2">
      <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
        <Menu class="text-gray-600 dark:text-gray-400 w-5 h-5" />
      </button>
      <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
        <Calendar class="text-gray-600 dark:text-gray-400 w-5 h-5" />
      </button>
      <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-2">Board</h1>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="$emit('openTask')"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm hover:shadow font-medium text-sm"
      >
        <Plus class="w-4 h-4" />
        Task
      </button>
    </div>
  </header>
</template>

<script setup>
import { Menu, Calendar, Plus } from 'lucide-vue-next'

// declare emits so the compiler/TS knows this component emits 'openTask'
defineEmits(['openTask'])
</script>
