<template>
    <TableCell class="w-[160px] p-0 hover:border-gray-400 hover:border-2 rounded-md">
        <Select v-model="priority" @update:model-value="updatePriority">
            <SelectTrigger
                class="w-full h-full flex items-center gap-2 px-3 cursor-pointer duration-200 outline-none focus-visible:ring-0 focus-visible:border-transparent border-none shadow-none">
                <div class="flex items-center gap-2 h-full w-full">
                    <i v-if="priority === 'urgent'" class="fa-solid fa-flag text-red-800"></i>
                    <i v-else-if="priority === 'high'" class="fa-solid fa-flag text-yellow-400"></i>
                    <i v-else-if="priority === 'medium'" class="fa-solid fa-flag text-blue-800"></i>
                    <i v-else class="fa-solid fa-flag text-gray-600"></i>

                    <span class="text-gray-600 capitalize">{{ priority === "clear" ? "" : priority }}</span>
                </div>
            </SelectTrigger>

            <SelectContent class="w-[200px] text-gray-800">
                <div>
                    <span class="text-sm text-gray-600 p-2">priority</span>
                    <SelectItem value="urgent">
                        <i class="fa-solid fa-flag text-red-800"></i>
                        <span>Urgent</span>
                    </SelectItem>
                    <SelectItem value="high">
                        <i class="fa-solid fa-flag text-yellow-400"></i>
                        <span>High</span>
                    </SelectItem>
                    <SelectItem value="medium">
                        <i class="fa-solid fa-flag text-blue-800"></i>
                        <span>Medium</span>
                    </SelectItem>
                    <SelectItem value="low">
                        <i class="fa-solid fa-flag text-gray-600"></i>
                        <span>Low</span>
                    </SelectItem>
                    <SelectItem value="clear">
                        <i class="fa-solid fa-ban text-gray-400"></i>
                        <span>Clear</span>
                    </SelectItem>
                </div>
            </SelectContent>
        </Select>
    </TableCell>
</template>

<script setup lang="ts">
import TableCell from '../../ui/table/TableCell.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '../../../components/ui/select'
import { ref, watch } from 'vue';
import type { Task } from '../../../store/tasks';
import { useTaskStore } from '../../../store/tasks';

const props = defineProps<{
  task?: Task
}>()

const taskStore = useTaskStore()
const priority = ref('');

watch(() => props.task?.priority, (newPriority) => {
  if (newPriority) {
    priority.value = newPriority
  }
}, { immediate: true })

function updatePriority(value: string) {
  if (props.task && value !== 'clear') {
    taskStore.updateTask(props.task.id, { priority: value as any })
  }
}
</script>
