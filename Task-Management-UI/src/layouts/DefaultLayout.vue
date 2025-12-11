<template>
  <div
    class="min-h-screen grid gap-2 pt-2 contain bg-gray-50 dark:bg-gray-950"
    style="grid-template-rows: auto 1fr; grid-template-areas:
      'header header header'
      'sidebar second main';"
    :style="{ gridTemplateColumns: gridColumns }"
  >

    <Header class="col-span-3" style="grid-area: header;" />
    <Sidebar class="sidebar h-[calc(100vh-60px)] overflow-x-hidden overflow-y-auto  " style="grid-area: sidebar; scrollbar-width: none" :activePanel="activePanel" @toggle="handleToggle" />
    <Transition name="slide" mode="out-in">
      <SecondSidebar v-if="showSecondary" :panel="activePanel" style="grid-area: second;" class="second" />
    </Transition>
    <MainContent class="main" style="grid-area: main;">
    </MainContent>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import MainContent from "../components/layout/Main.vue"
import Header from "../components/layout/Header.vue"
import Sidebar from "../components/layout/Sidebar.vue"
import SecondSidebar from "../components/layout/SecondSidebar.vue"

const showSecondary = ref(false)
const activePanel = ref<string | null>(null)

function handleToggle(panel: string) {
  if (activePanel.value === panel) {
    showSecondary.value = false
    activePanel.value = null
  } else {
    showSecondary.value = true
    activePanel.value = panel
  }
}

const gridColumns = computed(() => {
  return showSecondary.value
    ? "60px 240px 1fr"
    : "60px 0px 1fr"
})
</script>

<style scoped>
.contain {
  transition: grid-template-columns 0.5s ease-in-out;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
