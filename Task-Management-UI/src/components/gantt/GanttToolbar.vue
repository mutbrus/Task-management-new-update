<template>
  <div class="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button class="p-1 hover:bg-gray-100 rounded"><Menu class="w-5 h-5" /></button>
      <button class="px-3 py-1 text-sm hover:bg-gray-100 rounded">Today</button>
      <button class="px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100 rounded">
        Week <ChevronDown class="w-4 h-4" />
      </button>
      <button class="px-3 py-1 text-sm hover:bg-gray-100 rounded">Auto fit</button>
      <button @click="$emit('export')" class="px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100 rounded">
        <Download class="w-4 h-4" /> Export
      </button>
    </div>

    <div class="flex items-center gap-3">
      <button class="p-1 hover:bg-gray-100 rounded"><Calendar class="w-5 h-5" /></button>
      <button class="px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100 rounded">
        <span>◇</span> Sort
      </button>
      <button class="px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100 rounded">
        <span>≡</span> Filter
      </button>
      <button class="px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100 rounded">
        <User class="w-4 h-4" /> Assignee
      </button>

      <div class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">M</div>

      <button class="p-1 hover:bg-gray-100 rounded"><Search class="w-5 h-5" /></button>
      <button class="p-1 hover:bg-gray-100 rounded"><Settings class="w-5 h-5" /></button>

      <button @click="$emit('add')" class="px-3 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 flex items-center gap-1">
        Add Task <ChevronDown class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Menu, ChevronDown, Download, Calendar, User, Search, Settings } from 'lucide-vue-next'
</script>
