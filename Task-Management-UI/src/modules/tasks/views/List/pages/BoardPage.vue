<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- use new header component -->
    <BoardHeader @openTask="openTaskModal" />

    <!-- Board -->
    <div class="flex gap-4 p-6 overflow-x-auto scrollbar-hide">
      <BoardColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :get-column-style="getColumnStyle"
        :get-badge-style="getBadgeStyle"
        @dragstart="handleDragStart"
        @drop="handleDrop"
        @openModal="(colId) => openTaskModal(undefined, colId)"
        @openTask="(taskId) => openTaskModal(taskId)"
      />
    </div>

    <TaskDetailModal
      v-model:open="showTaskModal"
      :task="selectedTask ? taskStore.tasks.find(t => t.id === selectedTask) : undefined"
      @save="saveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BoardHeader from '../../../../../components/board/BoardHeader.vue'
import BoardColumn from '../../../../../components/board/BoardColumn.vue'
import TaskDetailModal from '../../../../../components/TaskDetailModal.vue'
import { useTaskStore } from '../../../../../store/tasks'
import { showToast } from '../../../../../composables/useToast'
import type { Task } from '../../../../../store/tasks'

const taskStore = useTaskStore()
const selectedTask = ref<string | null>(null)
const showTaskModal = ref(false)

const statusMap: Record<string, 'To Do' | 'In Progress' | 'Completed' | 'On Hold'> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'complete': 'Completed',
  'on-hold': 'On Hold',
}

const columns = computed(() => [
  { 
    id: 'todo', 
    title: 'TO DO', 
    icon: '○', 
    color: 'gray',
    status: 'To Do' as const,
    tasks: taskStore.filteredTasks.filter(t => t.status === 'To Do')
  },
  { 
    id: 'in-progress', 
    title: 'IN PROGRESS', 
    icon: '◐', 
    color: 'blue',
    status: 'In Progress' as const,
    tasks: taskStore.filteredTasks.filter(t => t.status === 'In Progress')
  },
  { 
    id: 'complete', 
    title: 'COMPLETE', 
    icon: '✓', 
    color: 'green',
    status: 'Completed' as const,
    tasks: taskStore.filteredTasks.filter(t => t.status === 'Completed')
  },
  { 
    id: 'on-hold', 
    title: 'ON HOLD', 
    icon: '◐', 
    color: 'yellow',
    status: 'On Hold' as const,
    tasks: taskStore.filteredTasks.filter(t => t.status === 'On Hold')
  },
])

const draggedTask = ref<Task | null>(null)
const draggedFrom = ref<string | null>(null)

const handleDragStart = (payload: { task: Task; fromColumnId: string }) => {
  draggedTask.value = payload.task
  draggedFrom.value = payload.fromColumnId
}

const handleDrop = (targetColumnId: string) => {
  if (!draggedTask.value || !draggedFrom.value) return
  
  const targetColumn = columns.value.find(c => c.id === targetColumnId)
  if (targetColumn && draggedTask.value) {
    taskStore.updateTask(draggedTask.value.id, { 
      status: targetColumn.status 
    })
    showToast({
      type: 'success',
      title: 'Task Moved',
      message: `Task moved to ${targetColumn.title}`,
    })
  }
  
  draggedTask.value = null
  draggedFrom.value = null
}

const openTaskModal = (taskId?: string, columnId?: string) => {
  if (taskId) {
    selectedTask.value = taskId
  } else if (columnId) {
    const col = columns.value.find(c => c.id === columnId)
    selectedTask.value = null
  }
  showTaskModal.value = true
}

function saveTask(task: Task) {
  if (selectedTask.value) {
    taskStore.updateTask(selectedTask.value, task)
    showToast({
      type: 'success',
      title: 'Task Updated',
      message: 'Task has been updated successfully',
    })
  } else {
    taskStore.addTask(task)
    showToast({
      type: 'success',
      title: 'Task Created',
      message: 'Task has been created successfully',
    })
  }
  showTaskModal.value = false
  selectedTask.value = null
}

const getColumnStyle = (color: string) => ({
  gray: 'bg-gray-50 dark:bg-gray-900/50',
  blue: 'bg-blue-50 dark:bg-blue-900/20',
  green: 'bg-green-50 dark:bg-green-900/20',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/20'
}[color] || 'bg-gray-50 dark:bg-gray-900/50')

const getBadgeStyle = (color: string) => ({
  gray: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  yellow: 'bg-yellow-500 text-white'
}[color] || 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300')
</script>
