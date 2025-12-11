<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { Checkbox } from '../ui/checkbox';
import { ref, computed } from 'vue';
import { formatDate } from '../../utils';
import FromDate from './TableCell/FromDate.vue';
import Assignee from './TableCell/Assignee.vue';
import Priority from './TableCell/Priority.vue';
import AddTask from './TableCell/AddTask.vue';
import { Plus, MoreHorizontal, Edit, Trash2, Copy, Flag } from 'lucide-vue-next';
import { useTaskStore } from '../../store/tasks';
import TaskDetailModal from '../TaskDetailModal.vue';
import ContextMenu from '../ContextMenu.vue';
import EmptyState from '../EmptyState.vue';
import { showToast } from '../../composables/useToast';

const taskStore = useTaskStore()
const selectedTask = ref<string | null>(null)
const showTaskModal = ref(false)
const contextMenu = ref<InstanceType<typeof ContextMenu> | null>(null)
const contextMenuPosition = ref({ x: 0, y: 0 })

const tasks = computed(() => taskStore.filteredTasks)

const allSelected = computed({
    get: () => tasks.value.length > 0 && tasks.value.every(task => taskStore.selectedTasks.includes(task.id)),
    set: (newValue: boolean) => {
        if (newValue) {
            taskStore.selectAllTasks()
        } else {
            taskStore.deselectAllTasks()
        }
    }
})

const isIndeterminate = computed(() => {
    const selectedCount = taskStore.selectedTasks.length;
    return selectedCount > 0 && selectedCount < tasks.value.length;
})

function openTask(taskId: string) {
    selectedTask.value = taskId
    showTaskModal.value = true
}

function handleContextMenu(event: MouseEvent, taskId: string) {
    event.preventDefault()
    contextMenuPosition.value = { x: event.clientX, y: event.clientY }
    selectedTask.value = taskId
    
    const menuItems = [
        {
            id: 'edit',
            label: 'Edit',
            icon: Edit,
            action: () => openTask(taskId),
        },
        {
            id: 'duplicate',
            label: 'Duplicate',
            icon: Copy,
            action: () => duplicateTask(taskId),
        },
        {
            id: 'priority',
            label: 'Change Priority',
            icon: Flag,
            action: () => {},
        },
        {
            id: 'delete',
            label: 'Delete',
            icon: Trash2,
            danger: true,
            action: () => deleteTask(taskId),
        },
    ]
    
    if (contextMenu.value) {
        // @ts-ignore
        contextMenu.value.items = menuItems
        contextMenu.value.show(event)
    }
}

function duplicateTask(taskId: string) {
    const task = taskStore.tasks.find(t => t.id === taskId)
    if (task) {
        const newTask = { ...task }
        delete (newTask as any).id
        taskStore.addTask(newTask)
        showToast({
            type: 'success',
            title: 'Task Duplicated',
            message: `"${task.title}" has been duplicated`,
        })
    }
}

function deleteTask(taskId: string) {
    const task = taskStore.tasks.find(t => t.id === taskId)
    if (task) {
        taskStore.deleteTask(taskId)
        showToast({
            type: 'success',
            title: 'Task Deleted',
            message: `"${task.title}" has been deleted`,
        })
    }
}

function saveTask(task: any) {
    if (selectedTask.value) {
        taskStore.updateTask(selectedTask.value, task)
        showToast({
            type: 'success',
            title: 'Task Updated',
            message: 'Task has been updated successfully',
        })
    } else {
        taskStore.addTask(task)
        showToast({
            type: 'success',
            title: 'Task Created',
            message: 'Task has been created successfully',
        })
    }
    showTaskModal.value = false
    selectedTask.value = null
}
</script>

<template>
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <Table class="border-separate border-spacing-0 w-full hover:bg-transparent">
            <TableHeader class="bg-gray-50 dark:bg-gray-800/50">
                <TableRow class="hover:bg-transparent">
                    <TableHead
                        class="w-auto pl-8 hover:bg-gray-100 dark:hover:bg-gray-800 group flex items-center gap-4 cursor-pointer transition-colors">
                        <Checkbox 
                            v-model="allSelected"
                            class="transition-opacity duration-200 cursor-pointer"
                            :class="allSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                            :indeterminate="isIndeterminate"
                        />
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</span>
                    </TableHead>
                    <TableHead class="w-[160px] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Assignee</span>
                    </TableHead>
                    <TableHead class="w-[160px] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Due date</span>
                    </TableHead>
                    <TableHead class="w-[160px] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Priority</span>
                    </TableHead>
                    <TableHead class="w-[160px] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Date Created</span>
                    </TableHead>
                    <TableHead class="w-[80px] relative">
                        <button class="absolute left-10 bottom-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Plus class="w-4 h-4 text-gray-500" />
                        </button>
                    </TableHead>
                </TableRow>
            </TableHeader>
        <TableBody v-if="tasks.length > 0">
            <TableRow 
                class="group cursor-pointer 
                relative p-4 border-b border-gray-100 dark:border-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-800/50
                transition-colors duration-150
            " 
                v-for="task in tasks" 
                :key="task.id"
                @click="openTask(task.id)"
                @contextmenu="handleContextMenu($event, task.id)"
            >
                <TableCell class="group font-medium pl-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div class="flex items-center gap-4">
                        <Checkbox
                            :checked="taskStore.selectedTasks.includes(task.id)"
                            @update:checked="taskStore.toggleTaskSelection(task.id)"
                            @click.stop
                            class="transition-opacity duration-200 cursor-pointer"
                            :class="taskStore.selectedTasks.includes(task.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                        />
                        <div class="flex items-center gap-2">
                            <div class="flex">
                                <span class="material-symbols-outlined text-gray-400" style="font-size: 18px;">
                                    {{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}
                                </span>
                            </div>
                            <div class="flex gap-1 items-center">
                                <span 
                                    class="text-gray-900 dark:text-gray-100"
                                    :class="{ 'line-through text-gray-400': task.completed }"
                                >
                                    {{ task.title }}
                                </span>
                                <div v-if="task.subtasks.length > 0" class="h-6 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm flex items-center justify-center gap-1">
                                    <span class="material-symbols-outlined text-gray-600 dark:text-gray-400" style="font-size: 14px;">
                                        checklist
                                    </span>
                                    <span class="text-gray-600 dark:text-gray-400 text-[14px]">
                                        {{ task.subtasks.filter(s => s.completed).length }}/{{ task.subtasks.length }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-1 mr-2
                                opacity-0 translate-x-2 pointer-events-none
                                transition-all duration-300 ease-in-out
                                group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto"
                                @click.stop>
                        <button
                            @click.stop="openTask(task.id)"
                            class="p-1 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <span class="material-symbols-outlined text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" style="font-size: 14px;">
                                edit
                            </span>
                        </button>
                        <button
                            @click.stop="handleContextMenu($event, task.id)"
                            class="p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <MoreHorizontal class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </TableCell>
                <Assignee :task="task" />
                <FromDate :task="task" />
                <Priority :task="task" />
                <TableCell class="w-[160px] rounded-sm">
                    <span class="text-gray-800 dark:text-gray-200 pl-2 text-sm">
                        {{ formatDate(task.createdAt) }}
                    </span>
                </TableCell>
                <TableCell class="w-[100px] relative">
                    <button
                        @click.stop="handleContextMenu($event, task.id)"
                        class="absolute left-8 bottom-3 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <MoreHorizontal class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </TableCell>
            </TableRow>
        </TableBody>
        <TableBody v-else>
            <TableRow>
                <TableCell class="p-8" :colspan="6">
                    <EmptyState
                        title="No tasks found"
                        description="Get started by creating your first task or adjusting your filters."
                        action-label="Create Task"
                        @action="showTaskModal = true; selectedTask = null"
                    />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <AddTask @save="(desc) => { taskStore.addTask({ title: desc, description: '', completed: false, priority: 'medium', status: 'To Do', tags: [], subtasks: [], comments: [] }); showToast({ type: 'success', title: 'Task Added', message: 'Task has been created' }) }" @cancel="() => {}"/>
    <TaskDetailModal
        v-model:open="showTaskModal"
        :task="selectedTask ? taskStore.tasks.find(t => t.id === selectedTask) : undefined"
        @save="saveTask"
    />
    <ContextMenu ref="contextMenu" :items="[]" />
    </div>
</template>

