<template>
  <div class="absolute right-0 top-0 bottom-0 w-48 border-l border-gray-200 bg-white flex flex-col">
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-semibold text-gray-700">Unscheduled</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <Menu class="w-4 h-4" />
        </button>
      </div>
      <div class="text-3xl font-bold text-gray-800">3</div>
    </div>

    <div class="flex-1 p-4 relative">
      <div
        class="absolute right-4 top-1/2 -translate-y-1/2"
        style="writing-mode: vertical-rl"
      >
        <span class="text-sm font-semibold text-gray-700">Overdue</span>
      </div>
      <div class="flex items-center justify-center h-full">
        <div class="text-3xl font-bold text-red-500">0</div>
      </div>
    </div>

    <div class="absolute bottom-6 right-6">
      <div
        class="bg-gray-900 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
      >
        <Target class="w-4 h-4" />
        <span class="font-semibold">0/5</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu, Target } from 'lucide-vue-next'
</script>

<style scoped>
/* sidebar styles if needed */
</style>
