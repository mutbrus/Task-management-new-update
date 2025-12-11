<template>
  <div class="inbox-root h-full flex flex-col gap-4">
    <header class="inbox-header flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h1 class="text-xl font-semibold">Inbox</h1>
        <p class="text-sm text-gray-500">All incoming tasks and messages</p>
      </div>
      <div class="flex items-center gap-3">
        <input v-model="query" placeholder="Search inbox..." class="search px-3 py-2 rounded-md border" />
        <button @click="compose" class="px-3 py-2 bg-blue-600 text-white rounded-md">Compose</button>
      </div>
    </header>

    <div class="inbox-body flex gap-6 flex-1 overflow-hidden">
      <aside class="list-panel w-80 bg-white rounded-lg p-3 border overflow-auto">
        <div class="flex justify-end mb-2">
          <button class="text-sm text-gray-600" @click="markAllRead">Mark all read</button>
        </div>
        <ul class="item-list">
          <li
            v-for="item in filtered"
            :key="item.id"
            :class="['p-3 rounded-md flex items-center gap-3 cursor-pointer', { 'bg-blue-50 border border-blue-100': selected && selected.id === item.id }]"
            @click="select(item)"
          >
            <div class="avatar w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center font-semibold text-blue-700">{{ item.avatar }}</div>
            <div class="flex-1 min-w-0">
              <div class="title font-semibold text-sm truncate">{{ item.title }}</div>
              <div class="subtitle text-xs text-gray-500 truncate">{{ item.preview }}</div>
            </div>
            <div class="text-right">
              <div class="time text-xs text-gray-400">{{ item.time }}</div>
              <div v-if="!item.read" class="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            </div>
          </li>
        </ul>
      </aside>

      <section class="detail-panel flex-1 bg-white rounded-lg p-4 border overflow-auto">
        <div v-if="selected" class="flex flex-col h-full">
          <div class="detail-header flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold">{{ selected.title }}</h2>
              <div class="text-sm text-gray-500">{{ selected.from }} • {{ selected.time }}</div>
            </div>
          </div>

          <div class="detail-body mt-4 text-gray-700 flex-1 overflow-auto">
            <p>{{ selected.body }}</p>
          </div>

          <div class="detail-actions mt-4 flex gap-2">
            <button class="px-3 py-2 bg-blue-600 text-white rounded-md">Reply</button>
            <button class="px-3 py-2 border rounded-md" @click="toggleRead(selected)">{{ selected.read ? 'Mark unread' : 'Mark read' }}</button>
          </div>
        </div>

        <div v-else class="flex items-center justify-center h-full text-gray-400">
          Select an item to view details
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const query = ref('');
const items = ref([
  { id: 1, title: 'Welcome to TaskApp', preview: 'Thanks for joining...', body: 'Full welcome message content...', from: 'Team', time: '2d', avatar: 'T', read: false },
  { id: 2, title: 'Design review', preview: 'Please check the new mockups', body: 'Detailed design review content...', from: 'Alex', time: '1d', avatar: 'A', read: true },
  { id: 3, title: 'Sprint kickoff', preview: 'Agenda for the sprint...', body: 'Kickoff notes and tasks...', from: 'PM', time: '3h', avatar: 'P', read: false },
]);

const selected = ref(items.value[0]);

function select(item) {
  selected.value = item;
  item.read = true;
}

function toggleRead(item) {
  item.read = !item.read;
}

function markAllRead() {
  items.value.forEach(i => (i.read = true));
}

function compose() {
  // placeholder - replace with real compose behavior
  alert('Compose action');
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter(i => (i.title + ' ' + i.preview + ' ' + i.from).toLowerCase().includes(q));
});
</script>

<style scoped>
/* basic styles to match inbox look */
.inbox-root { min-height: 0; }
.search { border-color: #e6eef8; }
.item-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
</style>
