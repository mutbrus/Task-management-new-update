<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2">Team</h2>
    <nav class="flex flex-col gap-1">
      <a
        v-for="item in items"
        :key="item.id"
        href="#"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors"
        :class="item.active
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
      >
        <component :is="item.icon" class="w-4 h-4" />
        <span>{{ item.label }}</span>
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Users, UserCheck, MessageSquare, Settings } from 'lucide-vue-next'

const items = [
  { id: 1, label: 'Members', icon: Users, active: true },
  { id: 2, label: 'Roles', icon: UserCheck, active: false },
  { id: 3, label: 'Messages', icon: MessageSquare, active: false },
  { id: 4, label: 'Settings', icon: Settings, active: false },
]
</script>

