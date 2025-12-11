<template>
  <div class="flex-1 flex flex-col">
    <!-- Day Headers -->
    <div class="grid grid-cols-7 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="px-3 py-3 text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Days -->
    <div class="flex-1 grid grid-cols-7 auto-rows-fr overflow-auto">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'border-r border-b border-gray-200 p-3 relative group hover:bg-gray-50 transition-colors min-h-[120px]',
          !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
        ]"
      >
        <button
          v-if="index === 0"
          class="absolute top-2 left-2 w-6 h-6 bg-gray-700 hover:bg-gray-800 rounded flex items-center justify-center text-white"
        >
          <Plus class="w-3.5 h-3.5" />
        </button>

        <div
          :class="[
            'text-sm font-medium',
            day.isToday
              ? 'bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center'
              : day.isCurrentMonth
              ? 'text-gray-700'
              : 'text-gray-400'
          ]"
        >
          {{ day.date }}
        </div>

        <div class="mt-2 space-y-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { Plus } from 'lucide-vue-next'

const props = defineProps({
  daysOfWeek: { type: Array, required: true },
  calendarDays: { type: Array, required: true }
})
</script>

<style scoped>
/* grid-specific styles if needed */
</style>
