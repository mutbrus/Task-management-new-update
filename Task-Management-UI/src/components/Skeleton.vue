<template>
  <div class="animate-pulse">
    <div
      class="bg-gray-200 dark:bg-gray-700 rounded"
      :class="{
        'h-4': variant === 'text',
        'h-12 w-12 rounded-full': variant === 'avatar',
        'h-20': variant === 'card',
        'h-8': variant === 'button',
      }"
      :style="{ width: width }"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'text' | 'avatar' | 'card' | 'button'
  width?: string
}>(), {
  variant: 'text',
  width: '100%',
})
</script>

