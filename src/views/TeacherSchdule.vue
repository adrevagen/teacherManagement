<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Teacher Schedule</h1>
      <button
        @click="isModalOpen = true"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow"
      >
        + Add Schedule
      </button>
    </div>

    <!-- Weekly Calendar View -->
    <div class="grid grid-cols-7 gap-3">
      <div
        v-for="dayData in groupedSchedules"
        :key="dayData.day"
        class="bg-white rounded-2xl shadow p-3 flex flex-col"
      >
        <h2 class="text-center font-semibold text-blue-600 mb-2 border-b pb-1">
          {{ dayData.day }}
        </h2>

        <div v-if="dayData.schedules.length > 0" class="space-y-2">
          <div
            v-for="(schedule, index) in dayData.schedules"
            :key="index"
            class="bg-blue-50 p-2 rounded-xl border border-blue-200"
          >
            <p class="text-sm font-medium">{{ schedule.teacher }}</p>
            <p class="text-xs text-gray-600">
              {{ schedule.subject }}<br />
              {{ schedule.timeStart }} - {{ schedule.timeEnd }}
            </p>
            <div class="flex justify-end text-xs mt-1 gap-2">
              <button @click="editSchedule(store.schedules.indexOf(schedule))" class="text-blue-600 hover:underline">Edit</button>
              <button @click="deleteSchedule(store.schedules.indexOf(schedule))" class="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-400 text-center mt-3">No schedule</p>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <h2 class="text-xl font-semibold mb-4">
          {{ editIndex !== null ? "Edit Schedule" : "Add New Schedule" }}
        </h2>

        <form @submit.prevent="saveSchedule">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">Teacher</label>
            <select
              v-model="form.teacher"
              required
              class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="">Select teacher</option>
              <option
                v-for="t in teacherStore.teachers"
                :key="t.name"
                :value="t.name"
              >
                {{ t.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">Subject</label>
            <input
              v-model="form.subject"
              type="text"
              readonly
              class="w-full border rounded-xl px-3 py-2 bg-gray-100 text-gray-600"
              placeholder="Auto-filled"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">Day</label>
            <select
              v-model="form.day"
              required
              class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="">Select day</option>
              <option v-for="day in daysOfWeek" :key="day">{{ day }}</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
              <input
                v-model="form.timeStart"
                type="time"
                required
                class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">End Time</label>
              <input
                v-model="form.timeEnd"
                type="time"
                required
                class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              {{ editIndex !== null ? "Save Changes" : "Add Schedule" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { useScheduleStore, type Schedule } from "../store/scheduleStore"
import { useTeacherStore } from "../store/teacherStore"

const teacherStore = useTeacherStore()
const store = useScheduleStore()

const isModalOpen = ref(false)
const editIndex = ref<number | null>(null)

const form = reactive<Schedule>({
  teacher: "",
  subject: "",
  day: "",
  timeStart: "",
  timeEnd: "",
})


watch(
  () => form.teacher,
  (selectedTeacher:any) => {
    const t = teacherStore.teachers.find(t => t.name === selectedTeacher)
    form.subject = t ? t.subject : ""
  }
)

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function resetForm() {
  form.teacher = ""
  form.subject = ""
  form.day = ""
  form.timeStart = ""
  form.timeEnd = ""
}

function saveSchedule() {
  if (editIndex.value !== null) {
    store.editSchedule(editIndex.value, { ...form })
  } else {
    store.addSchedule({ ...form })
  }
  closeModal()
}

function editSchedule(index: number) {
  editIndex.value = index
  Object.assign(form, store.schedules[index])
  isModalOpen.value = true
}

function deleteSchedule(index: number) {
  store.deleteSchedule(index)
}

function closeModal() {
  isModalOpen.value = false
  editIndex.value = null
  resetForm()
}

const groupedSchedules = computed(() => {
  return daysOfWeek.map(day => ({
    day,
    schedules: store.schedules.filter(s => s.day === day),
  }))
})
</script>
