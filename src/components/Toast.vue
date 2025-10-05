<template>
  <div
    v-if="visible"
    class="fixed bottom-4 right-4 max-w-sm w-full bg-white shadow-lg rounded-lg p-4 border-l-4"
    :class="{
      'border-green-500': type === 'success',
      'border-blue-500': type === 'info',
      'border-yellow-500': type === 'warning'
    }"
  >
    <div class="flex items-center">
      <div
        class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3"
        :class="{
          'bg-green-100 text-green-600': type === 'success',
          'bg-blue-100 text-blue-600': type === 'info',
          'bg-yellow-100 text-yellow-600': type === 'warning'
        }"
      >
        <i class="fas fa-check"></i>
      </div>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  message: string
  type: 'success' | 'info' | 'warning'
}>()
</script>
