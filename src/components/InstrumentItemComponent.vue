<!-- Cada fila de la lista de instrumentos, la cual debe ser interactiva. -->

<template>
  <tr class="cursor-pointer hover:bg-zinc-900" @click="selectInstrument(instrument?.shortName)">
    <td class="text-left font-semibold">{{ instrument?.shortName }}</td>
    <td class="text-right">{{ instrument?.lastPrice.toFixed(2) }}</td>
    <td class="text-right">{{ (montoMM / 1000000).toFixed(2) }}</td>
    <td
      :class="[
        'text-right',
        instrument?.pctDay > 0 ? 'text-green-500' : '',
        instrument?.pctDay < 0 ? 'text-red-500' : '',
      ]"
    >
      {{
        instrument?.pctDay > 0
          ? "+" + instrument?.pctDay.toFixed(2)
          : instrument?.pctDay.toFixed(2)
      }}%
    </td>
    <td
      :class="[
        'text-right',
        instrument?.pct30D > 0 ? 'text-green-500' : '',
        instrument?.pct30D < 0 ? 'text-red-500' : '',
      ]"
    >
      {{
        instrument?.pct30D > 0
          ? "+" + instrument?.pct30D.toFixed(2)
          : instrument?.pct30D.toFixed(2)
      }}%
    </td>
    <td
      :class="[
        'text-right',
        instrument?.pctCY > 0 ? 'text-green-500' : '',
        instrument?.pctCY < 0 ? 'text-red-500' : '',
      ]"
    >
      {{
        instrument?.pctCY > 0
          ? "+" + instrument?.pctCY.toFixed(2)
          : instrument?.pctCY.toFixed(2)
      }}%
    </td>
    <td
      :class="[
        'text-right',
        instrument?.pct1Y > 0 ? 'text-green-500' : '',
        instrument?.pct1Y < 0 ? 'text-red-500' : '',
      ]"
    >
      {{
        instrument?.pct1Y > 0
          ? "+" + instrument?.pct1Y.toFixed(2)
          : instrument?.pct1Y.toFixed(2)
      }}%
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'pinia';
import { useInstrumentStore } from '../stores/instrument';

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
  methods: {
    ...mapActions(useInstrumentStore, ['selectInstrument']),
  }
};
</script>
