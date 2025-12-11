<template>
    <div class="w-full pt-4">
        <div class="flex items-center px-4 pb-2">
            <Button
                @click="isOpen = !isOpen"
                class="bg-gray h-6 w-6 shadow-none hover:bg-gray-200"
            >
                <span class="material-symbols-outlined text-gray-600">
                {{ isOpen ? "arrow_drop_down" : "arrow_right" }}
                </span>
            </Button>
            <span class="pl-2"><p>{{ title }}</p></span>
            <span class="text-sm text-gray-600 mx-2">{{ tasks.length }}</span>
            <div class="text-gray-600 h-6 w-8 hover:bg-gray-200 rounded-md flex items-center justify-center cursor-pointer">
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
            <Button class="bg-gray shadow-none mr-2 text-gray-600 hover:bg-gray-200 h-6 px-2 duration-200 cursor-pointer">
                <span class="material-symbols-outlined " style="font-size: 16px;">
                    add
                </span>
                Add task
            </Button>
        </div>
        <div v-if="isOpen" class="mt-2 h-auto">
            <TaskList :tasks="tasks"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../../../components/ui/button/Button.vue';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TaskList from '../../../components/lists/TaskList.vue';
const isOpen = ref(true);
const route = useRoute();
const title = ref('');

const tasks = ref([
    { id: 1, name: "Do homework" },
    { id: 2, name: "Buy milk" },
]);

function updateTitle(type: string | string[]) {
    if (type === 'inbox') {
        title.value = 'Inbox';
    } else if (type === 'followups') {
        title.value = 'Follow-ups';
    } else if (type === 'mytasks') {
        title.value = 'My Tasks';
    }
}

watch(
    () => route.params.type,
    (newType) => {
        updateTitle(newType);
    },
    { immediate: true }
);
</script>