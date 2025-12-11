<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-2xl p-0 overflow-hidden">
      <div class="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <Search class="w-5 h-5 text-gray-400 mr-3" />
        <Input
          v-model="searchQuery"
          placeholder="Type a command or search..."
          class="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          @keydown.escape="close"
          @keydown.down.prevent="navigateDown"
          @keydown.up.prevent="navigateUp"
          @keydown.enter.prevent="selectItem"
        />
      </div>

      <div class="max-h-96 overflow-y-auto">
        <div v-if="filteredItems.length === 0" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
          No results found
        </div>
        <div v-else class="py-2">
          <div
            v-for="(group, groupIndex) in groupedItems"
            :key="groupIndex"
            class="mb-2"
          >
            <div class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {{ group.title }}
            </div>
            <div
              v-for="(item, itemIndex) in group.items"
              :key="item.id"
              :ref="el => setItemRef(el, getItemIndex(groupIndex, itemIndex))"
              class="flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/30': selectedIndex === getItemIndex(groupIndex, itemIndex),
                'hover:bg-gray-100 dark:hover:bg-gray-800': selectedIndex !== getItemIndex(groupIndex, itemIndex)
              }"
              @click="executeCommand(item)"
              @mouseenter="selectedIndex = getItemIndex(groupIndex, itemIndex)"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.label }}</div>
                <div v-if="item.description" class="text-xs text-gray-500 dark:text-gray-400">{{ item.description }}</div>
              </div>
              <kbd v-if="item.shortcut" class="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                {{ item.shortcut }}
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { Search, Plus, FileText, Calendar, Users, Settings, Moon, Sun, LayoutDashboard } from 'lucide-vue-next'
import { Dialog, DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { useThemeStore } from '../store/theme'

const props = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit('update:open', value)
})

const searchQuery = ref('')
const selectedIndex = ref(0)
const itemRefs = ref<(HTMLElement | null)[]>([])

const themeStore = useThemeStore()

const allItems = [
  { id: 1, label: 'Create Task', icon: Plus, group: 'Actions', shortcut: '⌘K', action: () => console.log('Create task') },
  { id: 2, label: 'Create Document', icon: FileText, group: 'Actions', shortcut: '⌘D', action: () => console.log('Create doc') },
  { id: 3, label: 'Open Calendar', icon: Calendar, group: 'Navigation', shortcut: '⌘C', action: () => console.log('Open calendar') },
  { id: 4, label: 'View Dashboard', icon: LayoutDashboard, group: 'Navigation', shortcut: '⌘B', action: () => console.log('View dashboard') },
  { id: 5, label: 'Team Members', icon: Users, group: 'Navigation', action: () => console.log('Team members') },
  { id: 6, label: 'Settings', icon: Settings, group: 'Navigation', shortcut: '⌘,', action: () => console.log('Settings') },
  { id: 7, label: 'Toggle Theme', icon: themeStore.isDark ? Sun : Moon, group: 'Preferences', action: () => themeStore.toggleTheme() },
]

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return allItems
  const query = searchQuery.value.toLowerCase()
  return allItems.filter(item =>
    item.label.toLowerCase().includes(query) ||
    item.group.toLowerCase().includes(query)
  )
})

const groupedItems = computed(() => {
  const groups: Record<string, typeof allItems> = {}
  filteredItems.value.forEach(item => {
    if (!groups[item.group]) {
      groups[item.group] = []
    }
    groups[item.group].push(item)
  })
  return Object.entries(groups).map(([title, items]) => ({ title, items }))
})

function getItemIndex(groupIndex: number, itemIndex: number): number {
  let index = 0
  for (let i = 0; i < groupIndex; i++) {
    index += groupedItems.value[i].items.length
  }
  return index + itemIndex
}

function setItemRef(el: HTMLElement | null, index: number) {
  if (el) {
    itemRefs.value[index] = el
  }
}

function navigateDown() {
  if (selectedIndex.value < filteredItems.value.length - 1) {
    selectedIndex.value++
    scrollToSelected()
  }
}

function navigateUp() {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
    scrollToSelected()
  }
}

function scrollToSelected() {
  nextTick(() => {
    const element = itemRefs.value[selectedIndex.value]
    if (element) {
      element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })
}

function selectItem() {
  const item = filteredItems.value[selectedIndex.value]
  if (item) {
    executeCommand(item)
  }
}

function executeCommand(item: typeof allItems[0]) {
  if (item.action) {
    item.action()
  }
  close()
}

function close() {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
}

watch(() => props.open, (newValue) => {
  if (newValue) {
    nextTick(() => {
      selectedIndex.value = 0
    })
  }
})
</script>

