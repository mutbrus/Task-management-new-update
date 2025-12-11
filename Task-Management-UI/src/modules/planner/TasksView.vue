<template>
  <div class="w-full space-y-6">
    <!-- Tasks Header -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Planned Tasks</h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ plannedTasks.length }} tasks</span>
        </div>
        <div class="flex items-center gap-2">
          <select v-model="sortBy" class="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-3">
      <div
        v-for="task in sortedTasks"
        :key="task.id"
        class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-all cursor-pointer"
        @click="openTask(task)"
      >
        <div class="flex items-start gap-4">
          <Checkbox :checked="task.completed" @update:checked="() => toggleTask(task.id)" />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100" :class="{ 'line-through text-gray-400': task.completed }">
                {{ task.title }}
              </h3>
              <span
                class="px-2 py-1 rounded-md text-xs font-medium"
                :class="getPriorityBadgeClass(task.priority)"
              >
                {{ task.priority }}
              </span>
            </div>
            <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {{ task.description }}
            </p>
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                <span>{{ task.dueDate ? formatDate(task.dueDate) : 'No due date' }}</span>
              </div>
              <div v-if="task.assignee" class="flex items-center gap-1">
                <User class="w-4 h-4" />
                <span>{{ task.assignee }}</span>
              </div>
              <div v-if="task.tags.length > 0" class="flex items-center gap-1">
                <Tag class="w-4 h-4" />
                <span>{{ task.tags.join(', ') }}</span>
              </div>
            </div>
            <div v-if="task.subtasks.length > 0" class="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <CheckSquare class="w-4 h-4" />
              <span>{{ task.subtasks.filter(s => s.completed).length }}/{{ task.subtasks.length }} subtasks completed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="sortedTasks.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No planned tasks found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, User, Tag, CheckSquare } from 'lucide-vue-next'
import { Checkbox } from '../../components/ui/checkbox'
import { useTaskStore } from '../../store/tasks'
import { formatDate } from '../../utils'

const taskStore = useTaskStore()
const sortBy = ref('dueDate')

const plannedTasks = computed(() => {
  return taskStore.tasks.filter(t => t.dueDate && !t.completed)
})

const sortedTasks = computed(() => {
  const tasks = [...plannedTasks.value]
  
  switch (sortBy.value) {
    case 'dueDate':
      return tasks.sort((a, b) => {
        if (!a.dueDate || !b.dueDate) return 0
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
    case 'priority':
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return tasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 4
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 4
        return aPriority - bPriority
      })
    case 'title':
      return tasks.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return tasks
  }
})

function getPriorityBadgeClass(priority: string) {
  const classes = {
    urgent: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
}

function toggleTask(id: string) {
  taskStore.toggleTaskComplete(id)
}

function openTask(task: any) {
  console.log('Open task:', task)
}
</script>

