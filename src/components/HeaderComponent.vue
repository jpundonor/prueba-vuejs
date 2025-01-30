<!-- Muestra el nombre del índice (IPSA) y el valor actual con sus variaciones. -->
<template>
  <div class="font-light">
    <p class="text-3xl font-semibold">
      {{ summary?.info?.name }}, {{ summary?.info?.countryName.toUpperCase() }}
    </p>
    <label class="text-gray-300">Indice</label>
    <div
      class="flex gap-8 border-b-1 border-t-1 border-gray-500 py-2 text-gray-300"
    >
      <div>
        Valor Actual
        <span class="pl-2 text-white font-bold">
          {{ summary?.price?.tend === "up" ? "▲" : "" }}
          {{ summary?.price?.tend === "down" ? "▼" : "" }}
          {{ summary?.price?.lastPrice }}
        </span>
      </div>
      <div>
        Var.% Actual
        <span
          :class="[
            'text-right',
            summary?.price?.performanceRelative > 0 ? 'text-green-500' : '',
            summary?.price?.performanceRelative < 0 ? 'text-red-500' : '',
          ]"
        >
          {{ summary?.price?.performanceRelative > 0 ? " +" : " "
          }}{{ summary?.price?.performanceRelative.toFixed(2) }}%
        </span>
      </div>
      <div>
        Var. Puntos Actual
        <span
          :class="[
            summary?.price?.performanceAbsolute > 0 ? 'text-green-500' : '',
            summary?.price?.performanceAbsolute < 0 ? 'text-red-500' : '',
          ]"
        >
          {{ summary?.price?.performanceAbsolute > 0 ? " +" : " " }}
          {{ summary?.price?.performanceAbsolute.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useInstrumentStore } from "../stores/instrument";

export default {
  computed: {
    ...mapState(useInstrumentStore, ["summary"]),
  },
};
</script>
