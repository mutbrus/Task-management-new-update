<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
      <!-- Profile Section -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
              CV
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">First Name</label>
              <Input v-model="profile.firstName" placeholder="First name" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Last Name</label>
              <Input v-model="profile.lastName" placeholder="Last name" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
            <Input v-model="profile.email" type="email" placeholder="Email" />
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Preferences</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</label>
              <p class="text-xs text-gray-500 dark:text-gray-400">Toggle dark mode theme</p>
            </div>
            <button
              @click="themeStore.toggleTheme()"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              :class="themeStore.isDark ? 'bg-blue-600' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="themeStore.isDark ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
              <p class="text-xs text-gray-500 dark:text-gray-400">Receive email notifications for updates</p>
            </div>
            <button
              @click="preferences.emailNotifications = !preferences.emailNotifications"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              :class="preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Notifications</label>
              <p class="text-xs text-gray-500 dark:text-gray-400">Show desktop notifications</p>
            </div>
            <button
              @click="preferences.desktopNotifications = !preferences.desktopNotifications"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              :class="preferences.desktopNotifications ? 'bg-blue-600' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="preferences.desktopNotifications ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Workspace Section -->
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Workspace</h2>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Workspace Name</label>
            <Input v-model="workspace.name" placeholder="Workspace name" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Timezone</label>
            <select
              v-model="workspace.timezone"
              class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
        <Button variant="outline" @click="reset">Reset</Button>
        <Button @click="save">Save Changes</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useThemeStore } from '../../store/theme'

const themeStore = useThemeStore()

const profile = ref({
  firstName: 'Mut',
  lastName: 'Brus',
  email: 'Mutbrus@gmail.com',
})

const preferences = ref({
  emailNotifications: true,
  desktopNotifications: false,
})

const workspace = ref({
  name: "MutBrus's Workspace",
  timezone: 'UTC',
})

function save() {
  // Save settings logic
  console.log('Saving settings...', { profile, preferences, workspace })
}

function reset() {
  // Reset to defaults
  profile.value = {
    firstName: 'Mut ',
    lastName: 'Brus',
    email: 'Mutbrus@gmail.com',
  }
  preferences.value = {
    emailNotifications: true,
    desktopNotifications: false,
  }
  workspace.value = {
    name: "Mutbrus's Workspace",
    timezone: 'UTC',
  }
}
</script>

