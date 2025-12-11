<template>
  <div class="flex flex-col">
    <button
      @click="toggle"
      class="flex items-center justify-between px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span>{{ title }}</span>
      <ChevronRight
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-90': isOpen }"
      />
    </button>
    <Transition name="slide-down">
      <div v-if="isOpen" class="mt-1 flex flex-col gap-0.5 pl-4">
        <a
          v-for="item in items"
          :key="item.id"
          href="#"
          class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div :class="[item.color || 'bg-gray-400', 'w-3 h-3 rounded-sm']"></div>
          <span>{{ item.name }}</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  title: string
  items: Array<{ id: number; name: string; icon?: any; color?: string }>
}>()

const isOpen = ref(true)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.slide-down-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.slide-down-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>

