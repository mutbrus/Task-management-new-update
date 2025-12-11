<template>
  <div
    :class="['flex-shrink-0 w-80 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800', getColumnStyle(column.color)]"
    @dragover.prevent
    @drop="onDrop"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span :class="['w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium', getBadgeStyle(column.color)]">
          {{ column.icon }}
        </span>
        <h2 class="font-semibold text-gray-700 dark:text-gray-300 text-sm">{{ column.title }}</h2>
        <span :class="[getBadgeStyle(column.color), 'px-2 py-0.5 rounded-full text-xs font-medium']">
          {{ column.tasks.length }}
        </span>
      </div>
    </div>

    <div class="space-y-2 min-h-[200px]">
      <TaskCard
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        :from-column-id="column.id"
        @dragstart="emitDragStart"
        @click="openTask(task.id)"
      />
    </div>

    <button
      @click="$emit('openModal', column.id)"
      class="w-full mt-3 py-2 text-left px-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center gap-2 transition-colors font-medium text-sm"
    >
      <Plus class="w-4 h-4" />
      <span>Add Task</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import TaskCard from './TaskCard.vue'
import { Plus } from 'lucide-vue-next'

const props = defineProps<{
  column: { id: string; title: string; icon: string; color: string; tasks: any[] }
  getColumnStyle: (color: string) => string
  getBadgeStyle: (color: string) => string
}>()

const emit = defineEmits<{
  dragstart: [payload: { task: any; fromColumnId: string }]
  drop: [columnId: string]
  openModal: [columnId: string]
  openTask: [taskId: string]
}>()

function onDrop() {
  emit('drop', props.column.id)
}

function emitDragStart(payload: { task: any; fromColumnId: string }) {
  emit('dragstart', payload)
}

function openTask(taskId: string) {
  emit('openTask', taskId)
}
</script>
