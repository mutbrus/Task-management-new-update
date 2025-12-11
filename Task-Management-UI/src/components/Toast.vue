<template>
  <TransitionGroup
    name="toast"
    tag="div"
    class="fixed top-4 right-4 z-50 flex flex-col gap-2"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-start gap-3 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[320px] max-w-md bg-white dark:bg-gray-900"
      :class="{
        'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20': toast.type === 'success',
        'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20': toast.type === 'error',
        'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20': toast.type === 'warning',
        'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20': toast.type === 'info',
      }"
    >
      <component
        :is="toastIcons[toast.type]"
        class="w-5 h-5 flex-shrink-0 mt-0.5"
        :class="{
          'text-green-600 dark:text-green-400': toast.type === 'success',
          'text-red-600 dark:text-red-400': toast.type === 'error',
          'text-yellow-600 dark:text-yellow-400': toast.type === 'warning',
          'text-blue-600 dark:text-blue-400': toast.type === 'info',
        }"
      />
      <div class="flex-1">
        <p
          class="text-sm font-medium"
          :class="{
            'text-green-900 dark:text-green-100': toast.type === 'success',
            'text-red-900 dark:text-red-100': toast.type === 'error',
            'text-yellow-900 dark:text-yellow-100': toast.type === 'warning',
            'text-blue-900 dark:text-blue-100': toast.type === 'info',
          }"
        >
          {{ toast.title }}
        </p>
        <p
          v-if="toast.message"
          class="text-xs mt-1"
          :class="{
            'text-green-700 dark:text-green-300': toast.type === 'success',
            'text-red-700 dark:text-red-300': toast.type === 'error',
            'text-yellow-700 dark:text-yellow-300': toast.type === 'warning',
            'text-blue-700 dark:text-blue-300': toast.type === 'info',
          }"
        >
          {{ toast.message }}
        </p>
      </div>
      <button
        @click="removeToast(toast.id)"
        class="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        <X class="w-4 h-4 text-gray-500" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'
import type { Toast } from '../composables/useToast'

const { toasts, removeToast } = useToast()

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

