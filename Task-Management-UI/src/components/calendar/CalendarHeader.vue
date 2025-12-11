<template>
  <header class="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
        Today
      </button>

      <button
        class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        {{ viewMode }}
        <ChevronDown class="w-4 h-4" />
      </button>

      <div class="flex items-center gap-1">
        <button @click="$emit('navigateMonth', -1)" class="p-1.5 hover:bg-gray-100 rounded">
          <ChevronLeft class="w-4 h-4 text-gray-600" />
        </button>
        <button @click="$emit('navigateMonth', 1)" class="p-1.5 hover:bg-gray-100 rounded">
          <ChevronRight class="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <h1 class="text-base font-medium text-gray-700">
        {{ formatMonthYear }}
      </h1>
    </div>

    <div class="flex items-center gap-2">
      <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
        <SlidersHorizontal class="w-4 h-4" /> Filter
      </button>
      <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
        <XCircle class="w-4 h-4" /> Closed
      </button>
      <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
        <Users class="w-4 h-4" /> Assignee
      </button>
      <button class="p-2 hover:bg-gray-100 rounded">
        <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
          M
        </div>
      </button>
      <button class="p-2 hover:bg-gray-100 rounded">
        <Search class="w-4 h-4 text-gray-600" />
      </button>
      <button class="p-2 hover:bg-gray-100 rounded">
        <Settings class="w-4 h-4 text-gray-600" />
      </button>

      <button @click="$emit('openQuickAdd')" class="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 text-sm font-medium">
        Add Task
        <ChevronDown class="w-4 h-4" />
      </button>
    </div>
  </header>
</template>

<script setup>

import { ChevronLeft, ChevronRight, ChevronDown, Search, Settings, SlidersHorizontal, XCircle, Users } from 'lucide-vue-next'

const props = defineProps({
  viewMode: { type: String, default: 'Month' },
  formatMonthYear: { type: String, default: '' }
})
</script>

<style scoped>
/* header-specific small styles if needed */
</style>
