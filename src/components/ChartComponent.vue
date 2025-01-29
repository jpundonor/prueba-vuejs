<!-- Gráfico que muestra la evolución del índice seleccionado en diferentes periodos (1M, 3M, 6M, 1A). -->
<template>
  <p class="text-3xl">Historical Data</p>
  <div class="w-full h-96" v-if="history.length">
    <canvas class="max-w-full max-h-full" ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useInstrumentStore } from "../stores/instrument";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
);

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(useInstrumentStore, ["history"]),
  },
  watch: {
    history: {
      handler(newData) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.$nextTick(() => {
          this.renderChart(newData);
        });
        // this.renderChart(newData);
      },
      deep: true,
    },
  },
  methods: {
    renderChart(data) {
      if (!data || !this.$refs.chartCanvas) return;
      const ctx = this.$refs.chartCanvas.getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data?.map((d) => d.datetimeLastPrice),
          datasets: [
            {
              label: "Price",
              data: data?.map((d) => d.highPrice),
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
      this.chartInstance = chart;
    },
  },
  mounted() {
    if (this.history.length) this.renderChart(this.history);
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
};
</script>
