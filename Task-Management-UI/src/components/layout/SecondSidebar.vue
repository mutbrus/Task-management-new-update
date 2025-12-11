<template>
  <div class="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto scrollbar-hide rounded-r-lg shadow-sm">
    <div v-if="panel === 'home'">
      <HomeContent />
    </div>
    <div v-else-if="panel === 'dashboard'" class="p-4">
      <DashboardSidebar />
    </div>
    <div v-else-if="panel === 'planner'" class="p-4">
      <PlannerSidebar />
    </div>
    <div v-else-if="panel === 'team'" class="p-4">
      <TeamSidebar />
    </div>
    <div v-else-if="panel === 'doc'" class="p-4">
      <DocSidebar />
    </div>
    <div v-else-if="panel === 'whiteboard'" class="p-4">
      <WhiteboardSidebar />
    </div>
    <div v-else-if="panel === 'more'" class="p-4">
      <MoreSidebar />
    </div>
    <div v-else-if="panel === 'invite'" class="p-4">
      <InviteSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeContent from '../../layouts/ContentHome.vue'
import DashboardSidebar from './sidebars/DashboardSidebar.vue'
import PlannerSidebar from './sidebars/PlannerSidebar.vue'
import TeamSidebar from './sidebars/TeamSidebar.vue'
import DocSidebar from './sidebars/DocSidebar.vue'
import WhiteboardSidebar from './sidebars/WhiteboardSidebar.vue'
import MoreSidebar from './sidebars/MoreSidebar.vue'
import InviteSidebar from './sidebars/InviteSidebar.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ panel?: string | null }>()

const emit = defineEmits(['update:panel'])
const router = useRouter()

function goInbox() {
  emit('update:panel', 'inbox')
  router.push('/inbox').catch(() => {})
}

function setPanel(name: string) {
  emit('update:panel', name)
}
</script>