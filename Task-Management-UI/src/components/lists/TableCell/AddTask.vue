<template>
  <div class="w-[95%] h-[40px] ml-10">
    <div
      class="group flex border-t h-[100%]  border-gray-200 hover:bg-muted/40"
    >
      <div class="flex-1 hover:bg-gradient-to-l hover:from-gray-200 hover:to-[var(--background)]">
        <div v-if="!addingTask" class="flex items-center pl-8 h-full cursor-pointer text-sm relative hover:bg-gray-100"
          variant="ghost"
            size="sm"
            @click="addingTask = true"
        >
            <span class="material-symbols-outlined text-base text-gray-600 pr-2" style="font-size: 18px;"> add </span>
            Add Task
        </div>

        <div v-else class="flex items-center h-full pr-8 pl-16 justify-center ">
          <Input
            v-model="newTask"
            placeholder="Task description..."
            class="h-6 placeholder:text-base text-base border-transparent shadow-none focus-visible:ring-0 focus-visible:border-ring-0"
          />
          <div class="flex gap-2">
            <Button variant="ghost" size="sm" @click="$emit('cancel')" class=" h-6 cursor-pointer duration-200">Cancel</Button>
            <Button size="sm" @click="handleSave" class="h-6 text-gray-100 cursor-pointer duration-200">Save</Button>
          </div>
        </div>
      </div>

      <!-- Assignee Column -->
      <div class="w-[160px] px-4 py-2 text-sm text-muted-foreground hover:border flex justify-between cursor-pointer">
        <span>Calculate</span>
        <span class="material-symbols-outlined text-gray-400" style="font-size: 18px">
          stat_minus_1
        </span>
      </div>
      <div class="w-[160px] px-4 py-2 text-sm text-muted-foreground hover:border flex justify-between cursor-pointer">
        <span>Calculate</span>
        <span class="material-symbols-outlined text-gray-400" style="font-size: 18px">
          stat_minus_1
        </span>
      </div>
      <div class="w-[160px] px-4 py-2 text-sm text-muted-foreground hover:border flex justify-between cursor-pointer">
        <span>Calculate</span>
        <span class="material-symbols-outlined text-gray-400" style="font-size: 18px">
          stat_minus_1
        </span>
      </div>
      <div class="w-[160px] px-4 py-2 text-sm text-muted-foreground hover:border flex justify-between cursor-pointer">
        <span>Calculate</span>
        <span class="material-symbols-outlined text-gray-400" style="font-size: 18px">
          stat_minus_1
        </span>
      </div>
      
      <div class="w-[100px] px-4 py-2 text-sm text-muted-foreground"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

const addingTask = ref(false)
const newTask = ref("")

const emit = defineEmits(["save", "cancel"]);

function handleSave() {
  emit("save", newTask.value);
  newTask.value = "";
}
</script>
