<template>
  <div class="space-y-2">
    <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      Tags
    </label>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
        :class="getTagColor(tag)"
      >
        {{ tag }}
        <button
          @click="removeTag(tag)"
          class="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
        >
          <X class="w-3 h-3" />
        </button>
      </span>
      <div class="relative">
        <input
          v-model="newTag"
          @keydown.enter.prevent="addTag"
          @keydown.escape="newTag = ''"
          placeholder="Add tag..."
          class="px-2 py-1 rounded-md text-xs border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
        <div
          v-if="suggestedTags.length > 0 && newTag"
          class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-40 overflow-y-auto"
        >
          <button
            v-for="suggestion in suggestedTags"
            :key="suggestion"
            @click="addTagFromSuggestion(suggestion)"
            class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  tags: string[]
}>()

const emit = defineEmits<{
  'update:tags': [tags: string[]]
}>()

const newTag = ref('')

const commonTags = [
  'bug', 'feature', 'enhancement', 'documentation', 'design',
  'frontend', 'backend', 'api', 'database', 'testing',
  'urgent', 'review', 'meeting', 'research', 'planning',
]

const suggestedTags = computed(() => {
  if (!newTag.value) return []
  const lower = newTag.value.toLowerCase()
  return commonTags
    .filter(tag => 
      tag.toLowerCase().includes(lower) && 
      !props.tags.includes(tag)
    )
    .slice(0, 5)
})

function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    bug: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    feature: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    enhancement: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    urgent: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    review: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  }
  return colors[tag.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
}

function addTag() {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !props.tags.includes(tag)) {
    emit('update:tags', [...props.tags, tag])
    newTag.value = ''
  }
}

function addTagFromSuggestion(tag: string) {
  if (!props.tags.includes(tag)) {
    emit('update:tags', [...props.tags, tag])
    newTag.value = ''
  }
}

function removeTag(tag: string) {
  emit('update:tags', props.tags.filter(t => t !== tag))
}
</script>

