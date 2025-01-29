<!-- Cada fila de la lista de instrumentos, la cual debe ser interactiva. -->

<template>
  <tr>
    <td>{{ instrument?.shortName }}</td>
    <td>{{ instrument?.lastPrice.toFixed(2) }}</td>
    <td>{{ (montoMM / 1000000).toFixed(2) }}</td>
    <td>{{ instrument?.pctDay.toFixed(2) }}%</td>
    <td>{{ instrument?.pct30D.toFixed(2) }}%</td>
    <td>{{ instrument?.pctCY.toFixed(2) }}%</td>
    <td>{{ instrument?.pct1Y.toFixed(2) }}%</td>
  </tr>
</template>

<script>
export default {
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      montoMM: this.instrument?.accumulatedVolumeMoney,
    };
  },
};
</script>

