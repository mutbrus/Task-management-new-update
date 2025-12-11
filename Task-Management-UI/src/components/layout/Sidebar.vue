<script setup lang="ts">

import {
  Home,
  LayoutDashboard,
  NotepadText,
  AppWindow,
  UserPlus,
  Users,
  FileText,
  Folder,
} from "lucide-vue-next";

const props = defineProps<{
  activePanel: string | null
}>()

const emit = defineEmits<(e: "toggle", panel: string) => void>()

const menuItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'planner', icon: NotepadText, label: 'Planner' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'doc', icon: FileText, label: 'Doc' },
  { id: 'whiteboard', icon: Folder, label: 'Whiteboard' },
  { id: 'more', icon: AppWindow, label: 'More' },
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-2 rounded-l-lg shadow-sm">
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-col items-center justify-center gap-3 pt-2">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="flex px-2 items-center justify-center flex-col cursor-pointer group"
          @click="emit('toggle', item.id)"
        >
          <span
            class="rounded-md flex items-center justify-center h-10 w-10 transition-all duration-200"
            :class="props.activePanel === item.id
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            <component :is="item.icon" class="w-5 h-5" />
          </span>
          <p
            class="text-[10px] mt-1 transition-colors"
            :class="props.activePanel === item.id
              ? 'text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400'"
          >
            {{ item.label }}
          </p>
        </div>
      </div>

      <!-- Invite -->
      <div
        class="flex items-center justify-center flex-col cursor-pointer pb-2 group"
        @click="emit('toggle', 'invite')"
      >
        <span
          class="rounded-md flex items-center justify-center h-10 w-10 transition-all duration-200"
          :class="props.activePanel === 'invite'
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
        >
          <UserPlus class="w-5 h-5" />
        </span>
        <p
          class="text-[10px] mt-1 transition-colors"
          :class="props.activePanel === 'invite'
            ? 'text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-600 dark:text-gray-400'"
        >
          Invite
        </p>
      </div>
    </div>
  </div>
</template>
