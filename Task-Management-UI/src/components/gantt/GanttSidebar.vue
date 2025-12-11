<template>
  <div>
    <div class="border-b border-gray-200 p-3">
      <div class="flex items-center gap-2 text-sm font-medium">
        <button class="hover:bg-gray-200 rounded p-0.5"><slot name="collapse"></slot></button>
        <span class="text-gray-400">≡</span>
        <span>Personal List</span>
      </div>
    </div>

    <div class="p-3">
      <div v-for="task in tasks" :key="task.id" class="px-3 py-2 mb-1 bg-white rounded border border-gray-200 text-sm">
        {{ task.name }}
      </div>

      <div v-if="showAdd" class="mt-2">
        <input
          type="text"
          v-model="localName"
          @keyup.enter="onAdd"
          @blur="onBlur"
          placeholder="Task name"
          class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          autofocus
        />
      </div>

      <button v-else @click="$emit('start-add')" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-2 px-2">
        <slot name="plus"></slot> Add Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  tasks: { type: Array, default: () => [] },
  showAdd: { type: Boolean, default: false },
  value: { type: String, default: '' }
})
const emit = defineEmits(['add','start-add','cancel-add'])
const localName = ref(props.value)

watch(() => props.value, (v) => localName.value = v)

function onAdd() {
  emit('add', localName.value)
  localName.value = ''
}
function onBlur() {
  if (localName.value.trim()) onAdd()
  else emit('cancel-add')
}
</script>
