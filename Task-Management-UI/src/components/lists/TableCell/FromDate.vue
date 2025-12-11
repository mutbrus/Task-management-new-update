<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { type DateValue, getDayOfWeek, getLocalTimeZone, today } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '../../../components/ui/calendar'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { cn } from '../../../lib/utils'
import { TableCell } from '../../../components/ui/table'
import type { Task } from '../../../store/tasks'

const props = defineProps<{
  task?: Task
}>()

const date = ref<DateValue>()
const isPopoverOpen = ref(false)

watch(() => props.task?.dueDate, (newDate) => {
  if (newDate) {
    // Convert Date to DateValue if needed
    const d = new Date(newDate)
    date.value = today(getLocalTimeZone()).add({ 
      days: Math.floor((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    })
  }
}, { immediate: true })

const formattedDate = computed(() => {
    if (date.value) {
        return date.value.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }
    return ''
})

function setDate(preset: 'today' | 'tomorrow' | 'this-weekend' | 'next-week' | 'next-weekend' | '2-weeks' | '4-weeks' | DateValue) {
    const now = today(getLocalTimeZone())
    const locale = getLocalTimeZone()
    switch (preset) {
        case 'today':
            date.value = now
            break
        case 'tomorrow':
            date.value = now.add({ days: 1 })
            break
        case 'this-weekend':
            date.value = now.add({ days: 6 - getDayOfWeek(now, locale) - 1 })
            break
        case 'next-week':
            date.value = now.add({ weeks: 1 }).subtract({ days: getDayOfWeek(now, locale) - 1 }) // Assuming Monday
            break
        case 'next-weekend':
            date.value = now.add({ weeks: 1 }).add({ days: 6 - getDayOfWeek(now, locale) })
            break
        case '2-weeks':
            date.value = now.add({ weeks: 2 })
            break
        case '4-weeks':
            date.value = now.add({ weeks: 4 })
            break
        default:
            date.value = preset
            break
    }
    isPopoverOpen.value = false
}

function handleCalendarUpdate(value: DateValue | undefined) {
    if (value) {
        setDate(value)
    }
}
</script>

<template>
    <TableCell class="w-[160px] p-0 hover:border-gray-400 hover:border-2 hover:rounded-md">
        <Popover v-model:open="isPopoverOpen">
            <PopoverTrigger as-child variant="outline"  class="w-full">
            <div :class="cn(
                'justify-start text-left font-normal',
                !date && 'text-muted-foreground',
            )" class="flex items-center p-2">
                <CalendarIcon class="mr-2 h-4 w-4 text-gray-600" />
                <span>{{ formattedDate }}</span>
            </div>
            </PopoverTrigger>
            <PopoverContent class="flex w-auto p-0">
                <div class="flex">
                    <div class="w-[180px] border-r p-2">
                        <div class="grid grid-cols-1 gap-1">
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('today')">Today</Button>
                            <Button variant="ghost" class="justify-start pl-2"
                                @click="setDate('tomorrow')">Tomorrow</Button>
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('this-weekend')">This
                                weekend</Button>
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('next-week')">Next
                                week</Button>
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('next-weekend')">Next
                                weekend</Button>
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('2-weeks')">2
                                weeks</Button>
                            <Button variant="ghost" class="justify-start pl-2" @click="setDate('4-weeks')">4
                                weeks</Button>
                        </div>
                    </div>
                    <div class="p-2">
                        <div class="flex items-center justify-between pb-2">
                            <Button variant="outline">Start date</Button>
                            <Button>Due date</Button>
                        </div>
                        <Calendar @update:model-value="handleCalendarUpdate" :model-value="date" />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </TableCell>
</template>