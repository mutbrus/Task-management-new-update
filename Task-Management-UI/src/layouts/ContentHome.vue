<template>
  <div class="w-full h-full flex flex-col bg-white dark:bg-gray-900">
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <h1 class="font-semibold text-gray-900 dark:text-gray-100 text-lg">Home</h1>
      <div class="flex items-center gap-2">
        <button
          class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          @click="$emit('toggle', 'search')"
        >
          <Search class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          class="p-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <ChevronDown class="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto scrollbar-hide">
      <nav class="flex flex-col gap-0.5 p-2 text-sm">
        <SidebarItem icon="Inbox" label="Inbox" value="inbox" @click="setActive('inbox')" :active="active === 'inbox'" />
        <SidebarItem icon="Clock" label="Followups / Assigned Comments" value="followups" @click="setActive('followups')" :active="active === 'followups'" />
        <SidebarItem icon="User" label="My Tasks" value="mytasks" @click="setActive('mytasks')" :active="active === 'mytasks'" />
        <SidebarItem icon="MoreHorizontal" label="More" value="more" @click="setActive('more')" :active="active === 'more'" />
      </nav>

      <div class="border-t border-gray-200 dark:border-gray-800 my-2"></div>

      <div class="px-4 py-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Favorites</p>
        </div>
      </div>

      <div class="px-2">
        <CollapsibleSection title="Spaces" :items="spaces" />
      </div>

      <div class="border-t border-gray-200 dark:border-gray-800 my-2"></div>

      <div class="px-4 py-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Recent</p>
        </div>
      </div>

      <div class="px-2">
        <nav class="flex flex-col gap-0.5">
          <a
            v-for="item in recentItems"
            :key="item.id"
            href="#"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, ChevronDown, Plus, LayoutDashboard, Folder, Star } from "lucide-vue-next";
import SidebarItem from "../components/icons/SidebarItem.vue";
import CollapsibleSection from "../components/layout/CollapsibleSection.vue";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const active = computed(() => {
  if (route.path.includes('/followups')) return 'followups'
  if (route.path.includes('/my-tasks')) return 'mytasks'
  if (route.path.includes('/inbox')) return 'inbox'
  return null
})

const spaces = [
  { id: 1, name: 'Design Team', icon: LayoutDashboard, color: 'bg-blue-500' },
  { id: 2, name: 'Development', icon: Folder, color: 'bg-green-500' },
  { id: 3, name: 'Marketing', icon: Star, color: 'bg-purple-500' },
]

const recentItems = [
  { id: 1, label: 'Project Alpha', icon: Folder },
  { id: 2, label: 'Sprint Planning', icon: LayoutDashboard },
]

function setActive(name: string) {
  if (name === 'inbox') {
    router.push({ name: 'Inbox' }).catch(() => {})
  } else if (name === 'followups') {
    router.push({ name: 'Followups' }).catch(() => {})
  } else if (name === 'mytasks') {
    router.push({ name: 'MyTasks' }).catch(() => {})
  }
}
</script>