<template>
  <div
    v-if="visible"
    class="fixed bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[200px]"
    :style="{ top: `${y}px`, left: `${x}px` }"
    @click.stop
  >
    <button
      v-for="item in items"
      :key="item.id"
      @click="handleClick(item)"
      class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
      :class="item.danger ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : ''"
    >
      <component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
      <span>{{ item.label }}</span>
      <span v-if="item.shortcut" class="ml-auto text-xs text-gray-500 dark:text-gray-400">{{ item.shortcut }}</span>
    </button>
    <div v-if="items.length > 0" class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface ContextMenuItem {
  id: string
  label: string
  icon?: any
  shortcut?: string
  danger?: boolean
  action?: () => void
}

const props = defineProps<{
  items: ContextMenuItem[]
}>()

const visible = ref(false)
const x = ref(0)
const y = ref(0)

function show(event: MouseEvent) {
  event.preventDefault()
  x.value = event.clientX
  y.value = event.clientY
  visible.value = true
}

function hide() {
  visible.value = false
}

function handleClick(item: ContextMenuItem) {
  if (item.action) {
    item.action()
  }
  hide()
}

function handleClickOutside(event: MouseEvent) {
  if (visible.value) {
    hide()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('contextmenu', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleClickOutside)
})

defineExpose({
  show,
  hide,
})
</script>

