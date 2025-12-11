<template>
    <div class="flex flex-col h-full">
        <HeaderList />
        <FilterBar v-if="showFilters" />
        <div class="flex-1 overflow-auto relative">
            <RouterView />
        </div>
        <BulkActions />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderList from '../../../../layouts/Personal-List/HeaderList.vue';
import FilterBar from '../../../../components/FilterBar.vue';
import BulkActions from '../../../../components/BulkActions.vue';

const route = useRoute()

const showFilters = computed(() => {
  return route.path.includes('/list') || route.path.includes('/board')
})
</script>