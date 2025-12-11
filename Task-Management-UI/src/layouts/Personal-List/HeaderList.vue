<template>
    <div class="flex flex-col bg-white dark:bg-gray-900">
        <div class="pb-1">
            <MyTask />
        </div>
        <ViewSwitcher />
    </div>
</template>

<script setup lang="ts">
import MyTask from '../../components/button/tasks/MyTask.vue';
import ViewSwitcher from '../../components/ViewSwitcher.vue';
</script>