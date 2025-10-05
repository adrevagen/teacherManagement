<template>
  <aside
    :class="[
      'bg-white shadow-lg w-64 p-4 fixed inset-y-0 transform transition-transform duration-300',
      { '-translate-x-full': !isOpen }
    ]"
  >
    <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>

    <nav class="space-y-2">
      <div v-for="item in menuItems" :key="item.id">
        <button
          class="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
          @click="item.children ? toggleMenu(item.id) : navigate(item)"
        >
          <div class="flex items-center gap-2">
            <component :is="item.icon" class="w-5 h-5 text-gray-600" />
            <span>{{ item.label }}</span>
          </div>
        </button>

        <div
          v-if="item.children && openMenu === item.id"
          class="ml-8 mt-1 space-y-1"
        >
          <button
            v-for="child in item.children"
            :key="child.id"
            class="block w-full text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
            @click="navigate(child)"
          >
            {{ child.label }}
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { menuItems } from "../../constant/menu"
import { useRouter } from "vue-router"

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: "navigate", id: string): void
}>()

const openMenu = ref<string | null>(null)
const router = useRouter()

function toggleMenu(id: string) {
  openMenu.value = openMenu.value === id ? null : id
}

function navigate(item: any) {
  if (item.path) {
    router.push(item.path)
  }
}

</script>
