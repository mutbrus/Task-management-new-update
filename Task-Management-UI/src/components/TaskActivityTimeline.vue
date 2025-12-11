<template>
  <div class="space-y-4">
    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Activity</h3>
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex gap-3"
      >
        <div class="flex-shrink-0">
          <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
            {{ activity.user.charAt(0).toUpperCase() }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ activity.user }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTime(activity.date) }}</span>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300">{{ activity.action }}</p>
          <div v-if="activity.changes" class="mt-2 space-y-1">
            <div
              v-for="change in activity.changes"
              :key="change.field"
              class="text-xs text-gray-500 dark:text-gray-400"
            >
              <span class="font-medium">{{ change.field }}:</span>
              <span v-if="change.oldValue" class="line-through text-gray-400 ml-1">{{ change.oldValue }}</span>
              <span class="ml-1">{{ change.newValue }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activities.length === 0" class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
        No activity yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '../store/tasks'
import { formatDate } from '../utils'

const props = defineProps<{
  task: Task
}>()

interface Activity {
  id: string
  user: string
  action: string
  date: Date
  changes?: Array<{ field: string; oldValue?: string; newValue: string }>
}

const activities = computed<Activity[]>(() => {
  const acts: Activity[] = []

  // Task creation
  acts.push({
    id: 'created',
    user: 'System',
    action: 'created this task',
    date: props.task.createdAt,
  })

  // Comments
  props.task.comments.forEach(comment => {
    acts.push({
      id: comment.id,
      user: comment.author,
      action: 'commented',
      date: comment.createdAt,
    })
  })

  // Updates (if we track them)
  if (props.task.updatedAt.getTime() !== props.task.createdAt.getTime()) {
    acts.push({
      id: 'updated',
      user: props.task.assignee || 'System',
      action: 'updated this task',
      date: props.task.updatedAt,
    })
  }

  // Sort by date (newest first)
  return acts.sort((a, b) => b.date.getTime() - a.date.getTime())
})

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}
</script>

