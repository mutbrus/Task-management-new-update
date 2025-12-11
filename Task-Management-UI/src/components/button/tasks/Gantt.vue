<template>
    <Button class="bg-gray px-2 text-xs gap-1 h-6 text-gray-700 shadow-none rounded-none hover:bg-gray-200 cursor-pointer duration-100"
    @click="$emit('gantt')"
    :class="active ? 'border-b-2 border-blue-500 font-medium' : ''"
>
        <span class="material-symbols-outlined " style="font-size: 16px; color: red">
            article
        </span>
        Gantt
    </Button>
</template>

<script setup lang="ts">
import { Button } from '../../ui/button'


defineProps<{
    active: boolean
}>()

defineEmits<
    (e: "gantt") => void
>()
</script>