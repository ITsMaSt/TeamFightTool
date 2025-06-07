<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default {
  name: 'placement-chart',
  props: ['placementCounts'],
  mounted() {
    const labels = Object.keys(this.placementCounts).map(p => `Place ${p}`)
    const data = Object.values(this.placementCounts)

    const backgroundColors = Object.keys(this.placementCounts).map(p =>
        p <= 4 ? 'rgba(102, 255, 204, 0.6)' : 'rgba(255, 153, 204, 0.6)'
    )

    new Chart(this.$refs.chartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Anzahl Spiele',
          data,
          backgroundColor: backgroundColors,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#25607c',
              font: {
                weight: 'bold'
              }
            }
          },
          tooltip: {
            titleColor: '#25607c',
            bodyColor: '#25607c',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { weight: 'bold' },
            bodyFont: { weight: 'bold' }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#25607c',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255,255,255,0.8)'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#25607c',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255,255,255,0.8)'
            }
          }
        }
      }



    })
  }
}
</script>

<style scoped>
canvas {
  max-width: 100%;
}
h4, h5 {
  color: #00bfff; /* oder deine gewählte Akzentfarbe */
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

</style>
