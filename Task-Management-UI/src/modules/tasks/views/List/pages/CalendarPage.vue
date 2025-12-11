<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
    <!-- Header (moved to component) -->
    <CalendarHeader
      :viewMode="viewMode"
      :formatMonthYear="formatMonthYear"
      @navigateMonth="navigateMonth"
      @openQuickAdd="openQuickAdd"
    />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden relative">
      <div class="flex-1 flex flex-col pr-48">
        <!-- Day Headers + Calendar Grid component -->
        <CalendarGrid :daysOfWeek="daysOfWeek" :calendarDays="calendarDays" />
      </div>

      <!-- Right Sidebar -->
      <RightSidebar />
    </div>

    <!-- Quick add modal -->
    <Dialog v-model:open="showAdd">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <Input
            v-model="newTaskTitle"
            placeholder="Task title"
            class="w-full"
          />
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="closeQuickAdd">Cancel</Button>
            <Button @click="confirmAdd">Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalendarHeader from '../../../../../components/calendar/CalendarHeader.vue';
import CalendarGrid from '../../../../../components/calendar/CalendarGrid.vue';
import RightSidebar from '../../../../../components/calendar/RightSidebar.vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../../components/ui/dialog';
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { showToast } from '../../../../../composables/useToast';

/* calendar state */
const currentMonth = ref(new Date(2025, 9, 1))
const viewMode = ref('Month')
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getCalendarDays() {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)

  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()

  const days = []

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: prevLastDate - i,
      isCurrentMonth: false,
      isToday: false
    })
  }

  const today = new Date()
  for (let i = 1; i <= lastDate; i++) {
    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      i === today.getDate()

    days.push({
      date: i,
      isCurrentMonth: true,
      isToday
    })
  }

  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false
    })
  }

  return days
}

const calendarDays = computed(() => getCalendarDays())

function navigateMonth(direction) {
  const newDate = new Date(currentMonth.value)
  newDate.setMonth(currentMonth.value.getMonth() + direction)
  currentMonth.value = newDate
}

const formatMonthYear = computed(() =>
  currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
)

/* quick add modal state + helpers */
const showAdd = ref(false)
const newTaskTitle = ref("")
let addToCol = ref(null)

function openQuickAdd() {
  addToCol.value = null
  showAdd.value = true
  newTaskTitle.value = ""
}

function closeQuickAdd() {
  showAdd.value = false
  newTaskTitle.value = ""
}

function confirmAdd() {
  if (!newTaskTitle.value.trim()) return
  showToast({
    type: 'success',
    title: 'Task Added',
    message: `"${newTaskTitle.value}" has been added to the calendar`,
  })
  closeQuickAdd()
}
</script>

<style>
/* ...existing code... */
</style>
