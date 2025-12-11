<script setup lang="ts">
import { ref, watch } from "vue"
import {
    ChevronDown,
    Plus,
    Settings,
    Users,
    FolderOpen,
    Search,
} from "lucide-vue-next"

import { Button } from "../ui/button"

import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "../ui/popover"

import { Input } from "../ui/input"

const isOpen = ref(false)

const workspaces = [
    { id: 1, name: "VannChhai's Workspace", members: 12, active: true },
    { id: 2, name: "Design Team", members: 8, active: false },
    { id: 3, name: "Development", members: 15, active: false },
    { id: 4, name: "Marketing", members: 6, active: false },
]

watch(isOpen, (val) => {
    if (val) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }
})
</script>

<template>
    <div class="top-4 left-4 z-50">
        <Popover v-model:open="isOpen">
            <PopoverTrigger as-child>
                <Button variant="outline"
                    class="flex items-center gap-2 px-4 py-2 h-6 shadow-sm hover:shadow-md transition-shadow">
                    <div
                        class="w-4 h-4 bg-gradient-to-br from-blue-500 to-green-600 rounded-sm flex items-center justify-center">
                        <span class="text-white font-semibold text-sm">C</span>
                    </div>
                    <span class="text-gray-700 font-medium">VannChhai's Workspace</span>
                    <ChevronDown class="w-4 h-4 text-gray-500 transition-transform duration-200"
                        :class="{ 'rotate-180': isOpen }" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" class="w-80 p-0 rounded-xl shadow-lg border border-gray-200">

                <div class="p-4 border-b border-gray-100">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-900">Workspaces</h3>
                        <button class="p-1 hover:bg-gray-100 rounded-md transition-colors">
                            <Settings class="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    <div class="mt-3 relative">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search workspaces..." class="pl-10 pr-4 py-2 text-sm" />
                    </div>
                </div>

                <!-- Workspace List -->
                <div class="max-h-none overflow-none">
                    <button v-for="workspace in workspaces" :key="workspace.id"
                        class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        :class="workspace.active ? 'bg-blue-50 border-r-2 border-blue-500' : ''">
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="workspace.active
                            ? 'bg-gradient-to-br from-blue-500 to-green-600'
                            : 'bg-gray-300'">
                            <span class="text-white font-semibold text-sm">
                                {{workspace.name.split(' ').map(word => word[0]).join('')}}
                            </span>
                        </div>
                        <div class="flex-1 text-left">
                            <div class="font-medium text-gray-900">
                                {{ workspace.name }}
                            </div>
                            <div class="text-sm text-gray-500 flex items-center gap-1">
                                <Users class="w-3 h-3" />
                                {{ workspace.members }} members
                            </div>
                        </div>
                        <div v-if="workspace.active" class="w-2 h-2 bg-green-400 rounded-full"></div>
                    </button>
                </div>

                <div class="p-4 border-t border-gray-100 space-y-2">
                    <button
                        class="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left">
                        <Plus class="w-5 h-5 text-gray-500" />
                        <span class="text-gray-700 font-medium">Create workspace</span>
                    </button>
                    <button
                        class="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left">
                        <FolderOpen class="w-5 h-5 text-gray-500" />
                        <span class="text-gray-700 font-medium">Browse all workspaces</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>
