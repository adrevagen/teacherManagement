<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Teacher Management</h1>
      <button
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow"
      >
        + Add Teacher
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-left text-sm uppercase">
            <th class="px-4 py-3">No</th>
            <th class="px-4 py-3">Teacher Name</th>
            <th class="px-4 py-3">Subject</th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(teacher, index) in store.teachers"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3">{{ teacher.name }}</td>
            <td class="px-4 py-3">{{ teacher.subject }}</td>
            <td class="px-4 py-3 text-center">
              <button
                class="text-blue-600 hover:text-blue-800 font-medium"
                @click="editTeacher(index)"
              >
                Edit
              </button>
              <span class="mx-2">|</span>
              <button
                class="text-red-600 hover:text-red-800 font-medium"
                @click="deleteTeacher(index)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="store.teachers.length === 0">
            <td colspan="4" class="text-center text-gray-500 py-4">
              No teachers yet
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">
          {{ editIndex !== null ? "Edit Teacher" : "Add New Teacher" }}
        </h2>

        <form @submit.prevent="saveTeacher">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">Teacher Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Enter teacher name"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">Subject</label>
            <input
              v-model="form.subject"
              type="text"
              required
              class="w-full border rounded-xl px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Enter subject"
            />
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
              {{ editIndex !== null ? "Save Changes" : "Add Teacher" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { useTeacherStore, type Teacher } from "../store/teacherStore"

const store = useTeacherStore()

const isModalOpen = ref(false)
const editIndex = ref<number | null>(null)

const form = reactive<Teacher>({
  name: "",
  subject: "",
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editIndex.value = null
  form.name = ""
  form.subject = ""
}

function saveTeacher() {
  if (editIndex.value !== null) {
    store.editTeacher(editIndex.value, { ...form })
  } else {
    store.addTeacher({ ...form })
  }
  closeModal()
}

function editTeacher(index: number) {
  editIndex.value = index
  form.name = store.teachers[index].name
  form.subject = store.teachers[index].subject
  isModalOpen.value = true
}

function deleteTeacher(index: number) {
  store.deleteTeacher(index)
}
</script>
