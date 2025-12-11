<template>
  <div>
    <!-- Header Row -->
    <div class="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div class="flex">
        <div class="w-48 p-3 border-r border-gray-200 text-sm font-medium">Name</div>
        <div class="w-32 p-3 border-r border-gray-200 text-sm font-medium">Due Date</div>
        <div class="flex-1 flex">
          <div class="flex items-center gap-2 px-3 py-2">
            <button class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <Plus class="w-3.5 h-3.5" />
            </button>
            <span class="text-sm font-medium">lov 1</span>
          </div>
        </div>
      </div>

      <!-- Week Header -->
      <div class="flex border-t border-gray-200">
        <div class="w-48"></div>
        <div class="w-32"></div>
        <div class="flex-1 flex">
          <div class="flex items-center gap-2 px-3 py-2">
            <div class="px-4 py-2 text-xs font-medium text-gray-600">W44 Nov 2 - 8</div>
          </div>
        </div>
      </div>

      <!-- Day Headers -->
      <div class="flex border-t border-gray-200 bg-gray-50">
        <div class="w-48 border-r border-gray-200"></div>
        <div class="w-32 border-r border-gray-200"></div>
        <div class="flex-1 flex">
          <div
            v-for="(d, i) in weekDates"
            :key="i"
            :class="[ 'flex-1 px-4 py-2 text-center border-r border-gray-200', (i === 0 || i === 5) && 'bg-gray-100', i === 3 && 'bg-red-50' ]"
          >
            <div class="text-xs text-gray-600">{{ d.day }}</div>
            <div :class="[ 'text-sm font-medium mt-0.5', i === 3 ? 'w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto' : '' ]">
              {{ d.date }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid Body -->
    <div class="flex min-h-96">
      <div class="w-48 border-r border-gray-200"></div>
      <div class="w-32 border-r border-gray-200"></div>
      <div class="flex-1 flex relative">
        <div
          v-for="(d, i) in weekDates"
          :key="i"
          :class="[ 'flex-1 border-r border-gray-200', (i === 0 || i === 5) && 'bg-gray-50 bg-opacity-50' ]"
          :style="(i === 0 || i === 5) ? { backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)' } : {}"
        ></div>

        <!-- Today indicator -->
        <div class="absolute top-0 bottom-0 w-0.5 bg-red-500" style="left: calc(50% + 12.5%)"></div>
      </div>
    </div>

    <!-- Bottom Badge -->
    <div class="fixed bottom-4 right-4 flex items-center gap-2">
      <div class="bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
        <span>🔒</span> 0/5
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'
const props = defineProps({
  weekDates: { type: Array, default: () => [] }
})
</script>
