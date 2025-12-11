<template>
    <RouterView />
    <Toast />
    <QuickActions />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Toast from './components/Toast.vue'
import QuickActions from './components/QuickActions.vue'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'

// Initialize keyboard shortcuts
useKeyboardShortcuts()
</script>
