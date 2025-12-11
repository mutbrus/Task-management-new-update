<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between px-2">
      <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Invite</h2>
      <button class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <X class="w-4 h-4 text-gray-500" />
      </button>
    </div>
    <div class="px-2">
      <Input placeholder="Search or invite by email..." class="w-full" />
    </div>
    <div class="px-2">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Recent</p>
      <div class="flex flex-col gap-2">
        <div
          v-for="person in recentPeople"
          :key="person.id"
          class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
            {{ person.initials }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ person.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ person.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { Input } from '../../ui/input'

const recentPeople = [
  { id: 1, name: 'John Doe', email: 'john@example.com', initials: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', initials: 'BW' },
]
</script>

