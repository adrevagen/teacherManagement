<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const data = {
  labels: ['Pemesanan', 'Scan'],
  datasets: [
    {
      data: [40, 60],
      backgroundColor: ['#36A2EB', '#FF6384']
    }
  ]
}

const options: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Pemesanan vs Scan'
    }
  }
}
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
