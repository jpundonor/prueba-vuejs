<!-- Gráfico que muestra la evolución del índice seleccionado en diferentes periodos (1M, 3M, 6M, 1A). -->
<template>
  <div class="w-full h-96 pt-10" v-if="history.length">
    <canvas class="max-w-full max-h-full" ref="chartCanvas"></canvas>
  </div>
  <div class="flex items-center mt-10 gap-10">
    <div v-vk-margin class="grid grid-cols-6 w-full md:w-5/12 rounded overflow-hidden">
      <vk-button
        v-for="period in periods"
        :key="period"
        :class="[
          selectedPeriod === period.label
            ? 'bg-blue-500 text-black'
            : 'bg-zinc-900',
        ]"
        @click="selectPeriod(period)"
      >
        {{ period.label }}
      </vk-button>
    </div>
    <div class="relative inline-block">
      <button class="calendar" @click="openCalendar">📅</button>
      <input
        type="date"
        :min="minDate"
        :max="maxDate"
        ref="calendarInput"
        @change="calendarChange"
        class="absolute inset-0 w-full h-full opacity-0 -z-10 cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
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
import { _isClickEvent } from "chart.js/helpers";

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
  components: {
    VkButton: "vk-button",
    VkMargin: "vk-margin",
  },
  data() {
    return {
      chartInstance: null,
      selectedPeriod: "5A",
      filteredHistory: [],
      minDate: "",
      maxDate: "",
      showInput: true,
      periods: [
        { label: "1D", value: 1 },
        { label: "1S", value: 7 },
        { label: "1M", value: 30 },
        { label: "3M", value: 90 },
        { label: "6M", value: 180 },
        { label: "5A", value: 249 },
      ],
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
          this.chartInstance = null;
        }
        this.$nextTick(() => {
          this.renderChart(newData);
        });
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useInstrumentStore, ["filterByDate", "filterByDateRange"]),
    openCalendar() {
      this.$refs.calendarInput.showPicker();
    },
    calendarChange() {
      const periodValue = event.target.value?.split("-").reverse().join("-");
      this.filteredHistory = this.filterByDate(periodValue);
      if (this.filteredHistory) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
          this.chartInstance = null;
        }
        this.renderChart(this.filteredHistory);
      }
    },
    selectPeriod(period) {
      this.selectedPeriod = period.label;
      const firtPeriod = this.history[0].datetimeLastPrice;
      const periodValue = this.history[period.value - 1].datetimeLastPrice;
      if (period.value === 1) {
        this.filteredHistory = this.filterByDate(periodValue);
      } else {
        this.filteredHistory = this.filterByDateRange(firtPeriod, periodValue);
      }
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      this.renderChart(this.filteredHistory);
    },
    renderChart(data) {
      if (!data || !this.$refs.chartCanvas) return;
      const dataArray = Array.isArray(data) ? data : [data];
      const ctx = this.$refs.chartCanvas.getContext("2d");
      if (!ctx) return;

      let labels, prices;

      if (dataArray.length === 1) {
        labels = [
          "Last Price",
          "Open Price",
          "Low Price",
          "High Price",
          "Close Price",
        ];
        prices = [
          dataArray[0].lastPrice,
          dataArray[0].openPrice,
          dataArray[0].lowPrice,
          dataArray[0].highPrice,
          dataArray[0].closePrice,
        ];
      } else {
        labels = dataArray.map((d) => d.datetimeLastPrice);
        prices = dataArray.map((d) => d.lastPrice);
      }

      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: prices,
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
          animation: {
            duration: 0,
          },
          scales: {
            x: {
              ticks: {
                display: dataArray.length < 2,
              },
            },
            y: {
              ticks: {
                font: {
                  size: 14,
                },
              },
              grid: {
                drawTicks: true,
                color: "rgba(255, 255, 255, 0.1)",
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

    const firstDateString = this.history[0]?.datetimeLastPrice.split(" ")[0];
    this.minDate = firstDateString?.split("-").reverse().join("-");

    const lastDateString =
      this.history[this.history.length - 1]?.datetimeLastPrice.split(" ")[0];
    this.maxDate = lastDateString?.split("-").reverse().join("-");
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  },
};
</script>

<style scoped>
@reference "tailwindcss";

.calendar {
  @apply bg-zinc-900 rounded px-4 py-2 text-center font-semibold border border-gray-400 cursor-pointer transition-all duration-300;
  @apply hover:bg-gray-600;
}

vk-button {
  @apply py-1 text-center font-semibold border border-gray-400 cursor-pointer transition-all duration-300;
  @apply hover:bg-gray-600;
}
</style>
