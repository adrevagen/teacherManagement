<template>
  <Bar :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  datasets: [
    {
      label: "Penjualan (Juta Rupiah)",
      data: [12, 19, 15, 20, 25, 22],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      borderRadius: 6
    }
  ]
}

const options = {
  responsive: true,
  plugins: { legend: { display: false } }
}
</script>
