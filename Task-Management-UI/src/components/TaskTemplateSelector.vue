<template>
  <div class="w-full">
    <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
      Use Template
    </label>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="template in templates"
        :key="template.id"
        @click="selectTemplate(template)"
        class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
      >
        <div class="flex items-start gap-3">
          <span class="text-2xl">{{ template.icon }}</span>
          <div class="flex-1">
            <div class="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {{ template.name }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ template.description }}
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateStore } from '../store/templates'
import type { TaskTemplate } from '../store/templates'

const templateStore = useTemplateStore()
const templates = templateStore.getAllTemplates()

const emit = defineEmits<{
  select: [template: TaskTemplate]
}>()

function selectTemplate(template: TaskTemplate) {
  emit('select', template)
}
</script>

