<template>
  <div class="h-screen flex bg-gray-50">

    <Sidebar :isOpen="isSidebarOpen" />

    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-0'
      ]"
    >

      <Topbar 
        @toggleSidebar="toggleSidebar"
        :notifications="['Notifikasi 1', 'Notifikasi 2']"
        @logout="handleLogout"
      />

      <main class="p-6 overflow-y-auto flex-1">
        <RouterView />
      </main>
    </div>

    <Toast :visible="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "./components/layouts/SideBar.vue";
import Topbar from "./components/layouts/TopBar.vue";
import Toast from "./components/Toast.vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function handleLogout() {
  console.log("User logout");
}

const toast = ref<{
  show: boolean;
  message: string;
  type: "success" | "info" | "warning";
}>({
  show: false,
  message: "",
  type: "success",
});
</script>
