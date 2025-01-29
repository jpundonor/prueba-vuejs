<!-- Muestra el detalle de la cotización y otros datos relevantes. -->

<template>
  <p class="text-3xl font-light">Detalles</p>
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th class="uk-table-expand">Cotización</th>
        <th class="uk-width-small">
          {{ summary?.data?.price?.datetimeLastPrice }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div>MERCADO</div>
          <div>APERTURA</div>
          <div>CIERRE ANTERIOR</div>
          <div>MÁXIMO DIARIO</div>
          <div>MÍNIMO DIARIO</div>
          <div>MÁXIMO 52 SEMANAS</div>
          <div>MÍNIMO 52 SEMANAS</div>
          <div>Variación**</div>
        </td>
        <td>
          <div>{{ summary?.data?.info?.marketName }}</div>
          <div>{{ summary?.data?.price?.openPrice }}</div>
          <div>{{ summary?.data?.price?.closePrice }}</div>
          <div>{{ summary?.data?.price?.maxDay }}</div>
          <div>{{ summary?.data?.price?.minDay }}</div>
          <div>{{ summary?.data?.price?.max52W }}</div>
          <div>{{ summary?.data?.price?.min52W }}</div>
          <div>%</div>
        </td>
      </tr>
      <tr>
        <td>
          <div>1 MES</div>
          <div>1 AÑO</div>
          <div>AÑO A LA FECHA</div>
        </td>
        <td>
          <div>{{ summary?.data?.price?.pct30D.toFixed(2) }}%</div>
          <div>{{ summary?.data?.price?.pctRelW52.toFixed(2) }}%</div>
          <div>{{ summary?.data?.price?.pctRelCY.toFixed(2) }}%</div>
        </td>
      </tr>
    </tbody>
  </table>
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
