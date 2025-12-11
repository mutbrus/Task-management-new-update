<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
      >
        <Plus v-if="!isOpen" class="w-6 h-6 transition-transform duration-200" />
        <X v-else class="w-6 h-6 transition-transform duration-200" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      side="top"
      align="end"
      class="mb-2 w-56"
    >
      <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleAction('task')">
        <FileText class="w-4 h-4 mr-2" />
        <span>Create Task</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Templates</DropdownMenuLabel>
      <DropdownMenuItem
        v-for="template in templates.slice(0, 3)"
        :key="template.id"
        @click="handleTemplateAction(template)"
      >
        <span class="mr-2">{{ template.icon }}</span>
        <span>{{ template.name }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="handleAction('doc')">
        <FileText class="w-4 h-4 mr-2" />
        <span>Create Document</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="handleAction('whiteboard')">
        <Layout class="w-4 h-4 mr-2" />
        <span>Create Whiteboard</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="handleAction('chat')">
        <MessageSquare class="w-4 h-4 mr-2" />
        <span>Start Chat</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleAction('import')">
        <Upload class="w-4 h-4 mr-2" />
        <span>Import</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <TaskDetailModal
    v-model:open="showTaskModal"
    @save="(task) => { taskStore.addTask(task); showToast({ type: 'success', title: 'Task Created', message: 'Task has been created successfully' }); showTaskModal = false }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, X, FileText, Layout, MessageSquare, Upload } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { showToast } from '../composables/useToast'
import TaskDetailModal from './TaskDetailModal.vue'
import { useTaskStore } from '../store/tasks'
import { useTemplateStore } from '../store/templates'

const taskStore = useTaskStore()
const templateStore = useTemplateStore()
const templates = templateStore.getAllTemplates()

const isOpen = ref(false)

const showTaskModal = ref(false)

function handleTemplateAction(template: any) {
  isOpen.value = false
  showTaskModal.value = true
  // Template will be applied in modal
  setTimeout(() => {
    const event = new CustomEvent('apply-template', { detail: template })
    window.dispatchEvent(event)
  }, 100)
}

function handleAction(action: string) {
  isOpen.value = false
  switch (action) {
    case 'task':
      showTaskModal.value = true
      break
    case 'doc':
      showToast({
        type: 'info',
        title: 'Create Document',
        message: 'Document creation dialog will open here',
      })
      break
    case 'whiteboard':
      showToast({
        type: 'info',
        title: 'Create Whiteboard',
        message: 'Whiteboard creation dialog will open here',
      })
      break
    case 'chat':
      showToast({
        type: 'info',
        title: 'Start Chat',
        message: 'Chat window will open here',
      })
      break
    case 'import':
      showToast({
        type: 'info',
        title: 'Import',
        message: 'Import dialog will open here',
      })
      break
  }
}
</script>

