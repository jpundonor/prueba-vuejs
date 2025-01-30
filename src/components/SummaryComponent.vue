<!-- Muestra el detalle de la cotización y otros datos relevantes. -->
<template>
  <TabComponent :tabs="tabs" v-if="tabs" />
  <div class="overflow-x-auto">
    <div class="flex py-6 my-2 border-b border-gray-200">
      <div class="font-bold flex-1">Cotización</div>
      <div class="text-right flex-1">
        {{ summary?.price?.datetimeLastPrice }}
      </div>
    </div>
    <div class="flex border-b border-gray-200 pb-4 mb-2">
      <div class="flex flex-col gap-2 flex-1">
        <div>MERCADO</div>
        <div>APERTURA</div>
        <div>CIERRE ANTERIOR</div>
        <div>MÁXIMO DIARIO</div>
        <div>MÍNIMO DIARIO</div>
        <div>MÁXIMO 52 SEMANAS</div>
        <div>MÍNIMO 52 SEMANAS</div>
        <div>Variación**</div>
      </div>
        <div class="text-right flex flex-col gap-2 flex-1">
          <div>{{ summary?.info?.marketName }}</div>
          <div>{{ summary?.price?.openPrice }}</div>
          <div>{{ summary?.price?.closePrice }}</div>
          <div>{{ summary?.price?.maxDay }}</div>
          <div>{{ summary?.price?.minDay }}</div>
          <div>{{ summary?.price?.max52W }}</div>
          <div>{{ summary?.price?.min52W }}</div>
          <div>%</div>
        </div>
    </div>
    <div class="flex">
      <div class="flex-1">
        <div>1 MES</div>
        <div>1 AÑO</div>
        <div>AÑO A LA FECHA</div>
      </div>
      <div class="text-right flex-1">
        <div
          :class="{
            'text-green-500': summary?.price?.pct30D > 0,
            'text-red-500': summary?.price?.pct30D < 0,
          }"
        >
          {{ summary?.price?.pct30D.toFixed(2) }}%
        </div>
        <div
          :class="{
            'text-green-500': summary?.price?.pctRelW52 > 0,
            'text-red-500': summary?.price?.pctRelW52 < 0,
          }"
        >
          {{ summary?.price?.pctRelW52.toFixed(2) }}%
        </div>
        <div
          :class="{
            'text-green-500': summary?.price?.pctRelCY > 0,
            'text-red-500': summary?.price?.pctRelCY < 0,
          }"
        >
          {{ summary?.price?.pctRelCY.toFixed(2) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useInstrumentStore } from "../stores/instrument";
import TabComponent from "./TabComponent.vue";

export default {
  components: {
    TabComponent,
  },
  data() {
    return {
      tabs: ["Resumen", "Detalles"],
    };
  },
  computed: {
    ...mapState(useInstrumentStore, ["summary"]),
  },
};
</script>
