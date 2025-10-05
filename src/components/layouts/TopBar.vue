<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <button @click="$emit('toggleSidebar')" class="lg:hidden cursor-pointer">
      <i class="fas fa-bars"></i>
    </button>

    <h1 class="text-xl font-bold">Teacher Schedule Management Application</h1>

    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggleNotifications')"
        class="relative cursor-pointer"
      >
        <BellIcon class="w-6 h-6 text-gray-700 cursor-pointer" />
        <span
          v-if="notifications.length"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
        >
          {{ notifications.length }}
        </span>
      </button>

      <div class="relative">
        <button
          @click="toggleUserMenu"
          class="flex items-center cursor-pointer"
        >
          <UserCircleIcon class="w-8 h-8 text-gray-700 cursor-pointer" />
        </button>

        <div
          v-if="isUserMenuOpen"
          class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10"
        >
          <ul>
            <li>
              <button
                @click="$emit('profile')"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                @click="$emit('logout')"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BellIcon, UserCircleIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  notifications?: string[];
}>(), {
  notifications: () => []   // default kosong
})

defineEmits<{
  (e: "toggleSidebar"): void;
  (e: "toggleNotifications"): void;
  (e: "profile"): void;
  (e: "logout"): void;
}>();

const isUserMenuOpen = ref(false);

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}
</script>
