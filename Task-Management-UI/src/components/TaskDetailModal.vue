<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
      <div class="flex-1 overflow-y-auto">
        <!-- Header -->
        <div class="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <Checkbox v-model="task.completed" class="mt-1" />
                <Input
                  v-model="task.title"
                  placeholder="Task title"
                  class="text-xl font-semibold border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Created {{ formatDate(task.createdAt) }}</span>
                <span>•</span>
                <span>ID: {{ task.id }}</span>
              </div>
            </div>
            <button
              @click="close"
              class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

      <!-- Content -->
      <div class="flex gap-6 px-6 py-4">
        <!-- Main Content -->
        <div class="flex-1 space-y-6">
          <!-- Template Selector (only for new tasks) -->
          <div v-if="!props.task?.id">
            <TaskTemplateSelector @select="applyTemplate" />
          </div>

          <!-- Description -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div class="flex items-center gap-2">
                <button
                  @click="showDescriptionPreview = !showDescriptionPreview"
                  class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {{ showDescriptionPreview ? 'Edit' : 'Preview' }}
                </button>
              </div>
            </div>
            <textarea
              v-if="!showDescriptionPreview"
              v-model="task.description"
              placeholder="Add a description... (Markdown supported)"
              class="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <div
              v-else
              class="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 prose prose-sm dark:prose-invert max-w-none"
              v-html="formatMarkdown(task.description)"
            />
          </div>

            <!-- Subtasks -->
            <div>
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                Subtasks
              </label>
              <div class="space-y-2">
                <div
                  v-for="(subtask, index) in task.subtasks"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <Checkbox v-model="subtask.completed" />
                  <Input
                    v-model="subtask.title"
                    placeholder="Subtask title"
                    class="flex-1"
                  />
                  <button
                    @click="removeSubtask(index)"
                    class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Trash2 class="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button
                  @click="addSubtask"
                  class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <Plus class="w-4 h-4" />
                  <span>Add subtask</span>
                </button>
              </div>
            </div>

            <!-- Comments -->
            <div>
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                Comments
              </label>
              <div class="space-y-4">
                <div
                  v-for="comment in task.comments"
                  :key="comment.id"
                  class="flex gap-3"
                >
                  <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {{ comment.author.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ comment.author }}</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ comment.text }}</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    U
                  </div>
                  <div class="flex-1">
                    <textarea
                      v-model="newComment"
                      placeholder="Add a comment..."
                      @keydown.enter.ctrl="addComment"
                      class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                    />
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Press Ctrl+Enter to send</span>
                      <Button size="sm" @click="addComment" :disabled="!newComment.trim()">
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
              <TaskActivityTimeline :task="task" />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="w-64 space-y-4 flex-shrink-0">
            <!-- Assignee -->
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Assignee
              </label>
              <button
                class="w-full flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                  {{ task.assignee?.charAt(0).toUpperCase() || 'U' }}
                </div>
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ task.assignee || 'Unassigned' }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            </div>

            <!-- Due Date -->
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Due Date
              </label>
              <button
                class="w-full flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Calendar class="w-4 h-4 text-gray-400" />
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {{ task.dueDate ? formatDate(task.dueDate) : 'Set due date' }}
                </span>
              </button>
            </div>

            <!-- Priority -->
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Priority
              </label>
              <select
                v-model="task.priority"
                class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <!-- Tags -->
            <div>
              <TagsManager :tags="task.tags" @update:tags="task.tags = $event" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock class="w-4 h-4" />
          <span>Last updated {{ formatDate(task.updatedAt) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="close">Cancel</Button>
          <Button @click="save">Save Changes</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { X, Plus, Calendar, Clock, Trash2, ChevronDown } from 'lucide-vue-next'
import { Dialog, DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { formatDate } from '../utils'
import TaskTemplateSelector from './TaskTemplateSelector.vue'
import TagsManager from './TagsManager.vue'
import TaskActivityTimeline from './TaskActivityTimeline.vue'
import type { TaskTemplate } from '../store/templates'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  assignee?: string
  dueDate?: Date
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'To Do' | 'In Progress' | 'Completed' | 'On Hold'
  tags: string[]
  subtasks: Array<{ title: string; completed: boolean }>
  comments: Array<{ id: string; author: string; text: string; createdAt: Date }>
  createdAt: Date
  updatedAt: Date
}

const props = defineProps<{
  open?: boolean
  task?: Partial<Task>
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'save': [task: Task]
}>()

const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit('update:open', value)
})

const task = ref<Task>({
  id: props.task?.id || Date.now().toString(),
  title: props.task?.title || '',
  description: props.task?.description || '',
  completed: props.task?.completed || false,
  assignee: props.task?.assignee,
  dueDate: props.task?.dueDate,
  priority: props.task?.priority || 'medium',
  status: props.task?.status || 'To Do',
  tags: props.task?.tags || [],
  subtasks: props.task?.subtasks || [],
  comments: props.task?.comments || [],
  createdAt: props.task?.createdAt || new Date(),
  updatedAt: new Date(),
})

const newComment = ref('')
const showDescriptionPreview = ref(false)

function formatMarkdown(text: string): string {
  if (!text) return ''
  // Simple markdown formatting
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\n/g, '<br>')
}

function applyTemplate(template: TaskTemplate) {
  if (template.task) {
    task.value = {
      ...task.value,
      ...template.task,
      title: template.task.title || task.value.title,
      description: template.task.description || task.value.description,
      status: template.task.status || task.value.status,
      subtasks: template.task.subtasks || [],
      tags: template.task.tags || [],
    } as Task
  }
}

watch(() => props.task, (newTask) => {
  if (newTask) {
    task.value = {
      id: newTask.id || Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      completed: newTask.completed || false,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      priority: newTask.priority || 'medium',
      status: newTask.status || 'To Do',
      tags: newTask.tags || [],
      subtasks: newTask.subtasks || [],
      comments: newTask.comments || [],
      createdAt: newTask.createdAt || new Date(),
      updatedAt: new Date(),
    }
  }
}, { deep: true })

// Listen for template application from QuickActions
onMounted(() => {
  window.addEventListener('apply-template', ((event: CustomEvent) => {
    const template = event.detail
    if (template) {
      applyTemplate(template)
    }
  }) as EventListener)
})

function addSubtask() {
  task.value.subtasks.push({ title: '', completed: false })
}

function removeSubtask(index: number) {
  task.value.subtasks.splice(index, 1)
}

function addComment() {
  if (!newComment.value.trim()) return
  task.value.comments.push({
    id: Date.now().toString(),
    author: 'You',
    text: newComment.value.trim(),
    createdAt: new Date(),
  })
  newComment.value = ''
  // Update task to trigger activity
  task.value.updatedAt = new Date()
}

function save() {
  task.value.updatedAt = new Date()
  emit('save', task.value)
  close()
}

function close() {
  isOpen.value = false
}
</script>

