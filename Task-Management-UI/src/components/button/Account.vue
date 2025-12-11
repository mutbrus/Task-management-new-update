<template>
    <DropdownMenu>
        <div class="h-6 w-10  flex justify-center items-center">
            <DropdownMenuTrigger
                class=" flex items-center justify-center text-sm font-medium transaction-colors cursor-pointer hover:bg-gray-200 rounded-md"
            >
                <span class="w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white">CV</span>
                <span class="">
                    <ChevronDown class="w-2.5 h-2.5 text-gray-700"/>
                </span>
            </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent side="bottom" align="end" :align-offset="12" class="w-72 max-h-none overflow-visible">
            <div class="px-4 py-3 border-b border-gray-200">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        CV
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">Chhan VannChhai</div>
                        <div class="text-sm text-green-600 flex items-center">
                            <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            Online
                        </div>
                    </div>
                </div>
            </div>

            <DropdownMenuItem>
                <Use class="w-4 h-4 mr-2" /> Set Status
            </DropdownMenuItem>

            <DropdownMenuItem @click="toggleNotifications">
                <component 
                    :is="notifications ? Bell : BellOff"
                    class="w-4 h-4 mr-2"
                />
                Mute notifications
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem @click="goToSettings">
                <Settings class="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Palette class="w-4 h-4 mr-2" /> Themes
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Keyboard class="w-4 h-4 mr-2" /> Keyboard shortcuts
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Download class="w-4 h-4 mr-2" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem>
                <HelpCircle class="w-4 h-4 mr-2" /> Help
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Plus class="w-4 h-4 mr-2" /> Create task
                <Pin class="w-3 h-3 ml-auto text-gray-400" />
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Briefcase class="w-4 h-4 mr-2" /> My Work
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Clock class="w-4 h-4 mr-2" /> Track Time
            </DropdownMenuItem>
            <DropdownMenuItem>
                <FileText class="w-4 h-4 mr-2" /> Notepad
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Video class="w-4 h-4 mr-2" /> Record a Clip
                <Pin class="w-3 h-3 ml-auto text-gray-400" />
            </DropdownMenuItem>
            <DropdownMenuItem>
                <MessageSquare class="w-4 h-4 mr-2" /> Create Chat
            </DropdownMenuItem>
            <DropdownMenuItem>
                <File class="w-4 h-4 mr-2" /> Create Doc
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Presentation class="w-4 h-4 mr-2" /> Create Whiteboard
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Users class="w-4 h-4 mr-2" /> View People
            </DropdownMenuItem>
            <DropdownMenuItem>
                <BarChart3 class="w-4 h-4 mr-2" /> Create Dashboard
                <Pin class="w-3 h-3 ml-auto text-gray-400" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Trash2 class="w-4 h-4 mr-2" /> Trash
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LogOut class="w-4 h-4 mr-2" /> Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    Bell,
    BellOff,
    Settings,
    Palette,
    Keyboard,
    Download,
    HelpCircle,
    Plus,
    Briefcase,
    Clock,
    FileText,
    Video,
    MessageSquare,
    File,
    Presentation,
    Users,
    BarChart3,
    Trash2,
    LogOut,
    Pin,
    ChevronDown
} from "lucide-vue-next";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from '../ui/dropdown-menu';

const router = useRouter()
const notifications = ref(true)

const toggleNotifications = () => {
    notifications.value = !notifications.value
}

const goToSettings = () => {
    router.push('/settings')
}
</script>