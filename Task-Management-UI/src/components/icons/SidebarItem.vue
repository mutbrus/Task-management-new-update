<script setup lang="ts">
import {
    Inbox,
    Clock,
    User,
    MoreHorizontal,
    LayoutDashboard,
    Plus
} from "lucide-vue-next";

const props = defineProps<{
    icon: string;
    label: string;
    active?: boolean;
    value?: string;
}>();

defineEmits<{
    click: []
}>()

const iconMap = {
    Inbox,
    Clock,
    User,
    MoreHorizontal,
    LayoutDashboard,
    Plus
} as const;

const DynamicIcon = (iconMap as Record<string, any>)[props.icon] || Inbox;
</script>

<template>
    <div
        class="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200"
        :class="{
            'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium': props.active,
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800': !props.active
        }"
        @click="$emit('click')"
    >
        <component :is="DynamicIcon" class="w-4 h-4 flex-shrink-0" />
        <p class="text-sm">{{ props.label }}</p>
    </div>
</template>
