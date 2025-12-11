<template>
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-2 flex-wrap">
    <!-- Status Filter -->
    <div class="relative">
      <button
        @click="toggleStatusFilter"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        :class="statusFilter ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''"
      >
        <Filter class="w-4 h-4 text-gray-500" />
        <span class="text-gray-700 dark:text-gray-300">Status</span>
        <ChevronDown class="w-4 h-4 text-gray-400" />
      </button>
      <div
        v-if="showStatusDropdown"
        class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div class="p-2">
          <label
            v-for="status in statuses"
            :key="status"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Checkbox
              :checked="statusFilter === status"
              @update:checked="statusFilter = statusFilter === status ? null : status"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ status }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Assignee Filter -->
    <div class="relative">
      <button
        @click="toggleAssigneeFilter"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        :class="assigneeFilter ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''"
      >
        <User class="w-4 h-4 text-gray-500" />
        <span class="text-gray-700 dark:text-gray-300">Assignee</span>
        <ChevronDown class="w-4 h-4 text-gray-400" />
      </button>
      <div
        v-if="showAssigneeDropdown"
        class="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div class="p-2">
          <Input
            v-model="assigneeSearch"
            placeholder="Search assignee..."
            class="mb-2"
          />
          <div class="max-h-48 overflow-y-auto">
            <label
              v-for="person in filteredAssignees"
              :key="person.id"
              class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Checkbox
                :checked="assigneeFilter === person.id"
                @update:checked="assigneeFilter = assigneeFilter === person.id ? null : person.id"
              />
              <div class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                {{ person.initials }}
              </div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ person.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Priority Filter -->
    <div class="relative">
      <button
        @click="togglePriorityFilter"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        :class="priorityFilter ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''"
      >
        <Flag class="w-4 h-4 text-gray-500" />
        <span class="text-gray-700 dark:text-gray-300">Priority</span>
        <ChevronDown class="w-4 h-4 text-gray-400" />
      </button>
      <div
        v-if="showPriorityDropdown"
        class="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div class="p-2">
          <label
            v-for="priority in priorities"
            :key="priority"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Checkbox
              :checked="priorityFilter === priority"
              @update:checked="priorityFilter = priorityFilter === priority ? null : priority"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300 capitalize">{{ priority }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Date Filter -->
    <div class="relative">
      <button
        @click="toggleDateFilter"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        :class="dateFilter ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''"
      >
        <Calendar class="w-4 h-4 text-gray-500" />
        <span class="text-gray-700 dark:text-gray-300">Due Date</span>
        <ChevronDown class="w-4 h-4 text-gray-400" />
      </button>
      <div
        v-if="showDateDropdown"
        class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div class="p-2">
          <label
            v-for="option in dateOptions"
            :key="option.value"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Checkbox
              :checked="dateFilter === option.value"
              @update:checked="dateFilter = dateFilter === option.value ? null : option.value"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Clear Filters -->
    <button
      v-if="hasActiveFilters"
      @click="clearFilters"
      class="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <X class="w-4 h-4" />
      <span>Clear</span>
    </button>

    <!-- Sort -->
    <div class="ml-auto flex items-center gap-2">
      <button
        @click="toggleSort"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        <ArrowUpDown class="w-4 h-4 text-gray-500" />
        <span class="text-gray-700 dark:text-gray-300">Sort</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Filter, ChevronDown, User, Flag, Calendar, X, ArrowUpDown } from 'lucide-vue-next'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { useTaskStore } from '../store/tasks'

const taskStore = useTaskStore()

const statusFilter = computed({
  get: () => taskStore.filters.status,
  set: (value) => taskStore.setFilter('status', value),
})

const assigneeFilter = computed({
  get: () => taskStore.filters.assignee,
  set: (value) => taskStore.setFilter('assignee', value),
})

const priorityFilter = computed({
  get: () => taskStore.filters.priority,
  set: (value) => taskStore.setFilter('priority', value),
})

const dateFilter = computed({
  get: () => taskStore.filters.date,
  set: (value) => taskStore.setFilter('date', value),
})

const showStatusDropdown = ref(false)
const showAssigneeDropdown = ref(false)
const showPriorityDropdown = ref(false)
const showDateDropdown = ref(false)

const assigneeSearch = ref('')

const statuses = ['To Do', 'In Progress', 'Completed', 'On Hold']
const priorities = ['low', 'medium', 'high', 'urgent']
const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This Week' },
  { value: 'next-week', label: 'Next Week' },
  { value: 'overdue', label: 'Overdue' },
]

const assignees = [
  { id: 1, name: 'John Doe', initials: 'JD' },
  { id: 2, name: 'Jane Smith', initials: 'JS' },
  { id: 3, name: 'Bob Wilson', initials: 'BW' },
  { id: 4, name: 'Alice Brown', initials: 'AB' },
]

const filteredAssignees = computed(() => {
  if (!assigneeSearch.value) return assignees
  return assignees.filter(a =>
    a.name.toLowerCase().includes(assigneeSearch.value.toLowerCase())
  )
})

const hasActiveFilters = computed(() => {
  return statusFilter.value !== null ||
    assigneeFilter.value !== null ||
    priorityFilter.value !== null ||
    dateFilter.value !== null
})

function toggleStatusFilter() {
  showStatusDropdown.value = !showStatusDropdown.value
  showAssigneeDropdown.value = false
  showPriorityDropdown.value = false
  showDateDropdown.value = false
}

function toggleAssigneeFilter() {
  showAssigneeDropdown.value = !showAssigneeDropdown.value
  showStatusDropdown.value = false
  showPriorityDropdown.value = false
  showDateDropdown.value = false
}

function togglePriorityFilter() {
  showPriorityDropdown.value = !showPriorityDropdown.value
  showStatusDropdown.value = false
  showAssigneeDropdown.value = false
  showDateDropdown.value = false
}

function toggleDateFilter() {
  showDateDropdown.value = !showDateDropdown.value
  showStatusDropdown.value = false
  showAssigneeDropdown.value = false
  showPriorityDropdown.value = false
}

function toggleSort() {
  // Sort logic
}

function clearFilters() {
  taskStore.clearFilters()
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showStatusDropdown.value = false
    showAssigneeDropdown.value = false
    showPriorityDropdown.value = false
    showDateDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

