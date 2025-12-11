<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../../components/ui/popover';
import Button from '../../ui/button/Button.vue';
import TableCell from '../../ui/table/TableCell.vue';
import { Combobox, ComboboxAnchor, ComboboxInput } from "../../../components/ui/combobox"
import type { Task } from '../../../store/tasks';
import { useTaskStore } from '../../../store/tasks';

const props = defineProps<{
  task?: Task
}>()

const taskStore = useTaskStore()

const people = [
    { id: 1, label: 'John Doe', initials: 'JD' },
    { id: 2, label: 'Jane Smith', initials: 'JS' },
    { id: 3, label: 'Bob Wilson', initials: 'BW' },
    { id: 4, label: 'Alice Brown', initials: 'AB' },
]

const selectedPerson = ref(people[0])
const query = ref('')

watch(() => props.task?.assignee, (newAssignee) => {
  if (newAssignee) {
    const person = people.find(p => p.label === newAssignee)
    if (person) {
      selectedPerson.value = person
    }
  }
}, { immediate: true })

function updateAssignee(person: any) {
  if (props.task && person) {
    taskStore.updateTask(props.task.id, { 
      assignee: person.label,
      assigneeId: person.id 
    })
  }
}
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <TableCell class="w-[160px] rounded-sm hover:border-gray-400 hover:border-2 cursor-pointer" tabindex="0">
                <div class="flex items-center">
                    <i class="fa-solid fa-user-plus text-gray-600"></i>
                    <span class="ml-2 text-gray-700">{{ selectedPerson.label }}</span>
                </div>
            </TableCell>
        </PopoverTrigger>

        <PopoverContent class="w-80 p-3 h-auto">
            <Combobox v-model="selectedPerson" by="label" @update:model-value="updateAssignee">
                <ComboboxAnchor>
                    <div class="
                        relative w-full rounded-sm border-1 border-gray-300 bg-background p-1
                        transition-colors
                        focus-within:outline-none focus-within:border focus-within:border-gray-600 focus-within:shadow
                    ">
                        <ComboboxInput 
                            :display-value="(person: any) => person?.label"
                            @change="query = $event.target.value" 
                            class="w-full bg-transparent px-2 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none" 
                            placeholder="Search..." 
                        />
                    </div>

                    <div class="p-2">
                        <div class="mt-4 w-full space-y-1 cursor-pointer">
                            <p class="text-gray-600 text-sm ">
                                People
                            </p>
                            <div class="w-full h-9 hover:bg-gray-200 flex items-center justify-between rounded-sm px-2">
                                <div class="flex items-center justify-center gap-2 ">
                                    <div class="h-7 w-7 rounded-full bg-blue-700 flex items-center justify-center">
                                        <span class="text-white text-md font-bold">
                                            VC
                                        </span>
                                    </div>
                                    <p class="text-gray-600">
                                        Me
                                    </p>
                                </div>
                                <Button class= "bg-gradient shadow-none hover:bg-gray-50 h-7 text-gray-800 px-2 cursor-pointer duration-300">Profile</Button>
                            </div>
                        </div>
    
                        <div class="mt-4 w-full space-y-1 cursor-pointer">
                            <p class="text-gray-600 text-sm">
                                Teams
                            </p>
                            <div class="w-full h-9 hover:bg-gray-200 flex items-center justify-between rounded-sm px-2">
                                <div class="flex items-center justify-center gap-2 ">
                                    <div class="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center">
                                        <span class="text-white text-md font-bold">
                                            V
                                        </span>
                                    </div>
                                    <p class="text-gray-600">
                                        VannChhai
                                    </p>
                                </div>
                                <p class="text-gray-600">1 people</p>
                            </div>
                        </div>
    
                        <div class="mt-2 pl-2 w-full cursor-pointer bg-gray-50 h-9 rounded-sm duration-200 flex items-center gap-2">
                            <div class="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <span class="material-symbols-outlined text-gray-600" style="font-size: 19px">
                                    person_add
                                </span>
                            </div>
                            <p class="font-medium">Invite people via email</p>
                        </div>
                    </div>
                </ComboboxAnchor>
            </Combobox>
        </PopoverContent>
    </Popover>
</template>