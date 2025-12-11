<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
      <component :is="icon" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
      {{ description }}
    </p>
    <slot name="action">
      <button
        v-if="actionLabel"
        @click="$emit('action')"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
      >
        {{ actionLabel }}
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { FileText } from 'lucide-vue-next'

withDefaults(defineProps<{
  icon?: any
  title?: string
  description?: string
  actionLabel?: string
}>(), {
  icon: FileText,
  title: 'No items found',
  description: 'Get started by creating your first item.',
  actionLabel: 'Create Item',
})

defineEmits<{
  action: []
}>()
</script>

