<!-- Muestra el detalle de la cotización y otros datos relevantes. -->

<template>
  <TabComponent :tabs="tabs" v-if="tabs" />
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <td class="uk-width-small">Cotización</td>
        <td class="uk-table-expand text-right">
          {{ summary?.price?.datetimeLastPrice }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="flex flex-col gap-2">
            <div>MERCADO</div>
            <div>APERTURA</div>
            <div>CIERRE ANTERIOR</div>
            <div>MÁXIMO DIARIO</div>
            <div>MÍNIMO DIARIO</div>
            <div>MÁXIMO 52 SEMANAS</div>
            <div>MÍNIMO 52 SEMANAS</div>
            <div>Variación**</div>
          </div>
        </td>
        <td>
          <div class="text-right flex flex-col gap-2">
            <div>{{ summary?.info?.marketName }}</div>
            <div>{{ summary?.price?.openPrice }}</div>
            <div>{{ summary?.price?.closePrice }}</div>
            <div>{{ summary?.price?.maxDay }}</div>
            <div>{{ summary?.price?.minDay }}</div>
            <div>{{ summary?.price?.max52W }}</div>
            <div>{{ summary?.price?.min52W }}</div>
            <div>%</div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>1 MES</div>
          <div>1 AÑO</div>
          <div>AÑO A LA FECHA</div>
        </td>
        <td class="text-right">
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
        </td>
      </tr>
    </tbody>
  </table>
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
