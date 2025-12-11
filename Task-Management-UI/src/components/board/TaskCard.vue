<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group"
    draggable="true"
    @dragstart="onDragStart"
    @click="handleClick"
  >
    <div class="font-medium text-gray-900 dark:text-gray-100 mb-3 text-sm">{{ task.title }}</div>
    <div class="flex items-center gap-2 text-gray-400">
      <button class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Assignee">
        <User class="w-4 h-4" />
      </button>
      <button class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Due Date">
        <Calendar class="w-4 h-4" />
      </button>
      <button class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Priority">
        <Flag class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Calendar, Flag } from 'lucide-vue-next'

const props = defineProps<{
  task: { id: string; title: string; [key: string]: any }
  fromColumnId: string
}>()

const emit = defineEmits<{
  dragstart: [payload: { task: any; fromColumnId: string }]
  click: [taskId: string]
}>()

function onDragStart(e: DragEvent) {
  // Optional: set dataTransfer to support native drop behavior
  try { e.dataTransfer?.setData('text/plain', String(props.task.id)) } catch {}
  emit('dragstart', { task: props.task, fromColumnId: props.fromColumnId })
}

function handleClick() {
  emit('click', props.task.id)
}
</script>
