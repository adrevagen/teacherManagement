<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">📅 My Scheduler</h1>

    <form @submit.prevent="addNew" class="bg-gray-800 p-4 rounded-lg mb-6 flex gap-4">
      <input v-model="title" type="text" placeholder="Judul" class="p-2 rounded bg-gray-700 flex-1" required />
      <input v-model="date" type="date" class="p-2 rounded bg-gray-700" required />
      <input v-model="time" type="time" class="p-2 rounded bg-gray-700" required />
      <button class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Tambah</button>
    </form>

    <div v-if="store.schedules.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in store.schedules" :key="s.id" class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">{{ s.title }}</h2>
        <p class="text-sm text-gray-400">{{ s.date }} - {{ s.time }}</p>
        <button @click="store.deleteSchedule(s.id)" class="mt-3 text-red-400 hover:text-red-500">Hapus</button>
      </div>
    </div>

    <p v-else class="text-gray-400 text-center">Belum ada jadwal</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScheduleStore } from './store/scheduleStore'

const store = useScheduleStore()
const title = ref('')
const date = ref('')
const time = ref('')

function addNew() {
  store.addSchedule({ title: title.value, date: date.value, time: time.value })
  title.value = ''
  date.value = ''
  time.value = ''
}
</script>
