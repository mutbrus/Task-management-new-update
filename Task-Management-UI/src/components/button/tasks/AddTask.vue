<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden flex flex-col">
      <!-- Modal Header -->
      <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div class="font-medium">Create Task</div>
        <button @click="close" class="p-2 hover:bg-gray-100 rounded"><slot name="close">✕</slot></button>
      </div>

      <!-- Modal Body (simple: title + optional status) -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <input
          type="text"
          v-model="title"
          placeholder="Task Name or type '/' for commands"
          class="w-full text-xl font-medium text-gray-800 placeholder-gray-400 outline-none mb-4"
        />

        <div class="flex items-center gap-3 mb-4">
          <label class="text-sm text-gray-600">Status</label>
          <select v-model="status" class="px-3 py-1 rounded border">
            <option v-for="c in statusOptions" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <!-- simple actions -->
        <div class="flex items-center gap-2">
          <button @click="close" class="px-3 py-1 rounded bg-gray-100">Cancel</button>
          <button @click="confirm" class="px-3 py-1 rounded bg-gray-900 text-white">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  defaultStatus: { type: String, default: 'TO DO' },
  statusOptions: { type: Array, default: () => ['TO DO', 'IN PROGRESS', 'COMPLETE'] }
})
const emit = defineEmits(['close', 'create'])

const title = ref('')
const status = ref(props.defaultStatus)

watch(() => props.defaultStatus, (v) => { status.value = v })

function close() {
  title.value = ''
  emit('close')
}

function confirm() {
  if (!title.value.trim()) return
  emit('create', { title: title.value.trim(), status: status.value })
  title.value = ''
}
</script>

<style scoped>
/* minimal modal styles (kept lean) */
</style>
