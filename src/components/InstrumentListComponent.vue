<!-- Lista de instrumentos (acciones) con su información clave. -->
<template>
  <table class="w-1/2">
    <thead>
      <tr class="border-b-2 border-t-1 border-gray-500">
        <th
          v-for="(header, key) in headers"
          :key="key"
          @click="sortBy(key)"
          :class="[
            'cursor-pointer py-4 hover:-translate-y-1 transition-all duration-300',
            key === 'shortName' ? 'text-left w-1/4' : 'text-right',
          ]"
        >
          {{ header }}
          <span v-if="sortKey === key">
            {{ sortOrder === "asc" ? "▲" : "▼" }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody class="">
      <InstrumentItemComponent
        v-if="isFisrt"
        v-for="instrument in secondHalf"
        :key="instrument?.codeInstrument"
        :instrument="instrument"
      />
      <InstrumentItemComponent
        v-if="isFisrt === false"
        v-for="instrument in firstHalf"
        :key="instrument?.codeInstrument"
        :instrument="instrument"
      />
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "pinia";
import InstrumentItemComponent from "./InstrumentItemComponent.vue";
import { useInstrumentStore } from "../stores/instrument";

export default {
  components: {
    InstrumentItemComponent,
  },
  props: {
    isFisrt: Boolean,
  },
  data() {
    return {
      sortKey: "Nombre",
      sortOrder: "asc",
      headers: {
        shortName: "Nombre",
        lastPrice: "Último",
        accumulatedVolumeMoney: "Monto (MM)",
        pctDay: "Var día",
        pct30D: "Var 30d**",
        pctCY: "Año Actual",
        pct1Y: "12 Meses",
      },
    };
  },
  computed: {
    ...mapState(useInstrumentStore, ["instruments"]),
    firstHalf() {
      const half = Math.ceil(this.instruments.length / 2);
      const newInstrument = this.instruments.slice(0, half);
      return this.sortedInstruments(newInstrument);
    },
    secondHalf() {
      const half = Math.ceil(this.instruments.length / 2);
      const newInstrument = this.instruments.slice(half);
      return this.sortedInstruments(newInstrument);
    },
  },
  methods: {
    ...mapActions(useInstrumentStore, ["loadInstruments"]),
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortOrder = "asc";
        this.sortKey = key;
      }
    },
    sortedInstruments(instrument) {
      const modifier = this.sortOrder === "asc" ? 1 : -1;

      return [...instrument].sort((a, b) => {
        if (
          typeof a[this.sortKey] === "string" &&
          typeof b[this.sortKey] === "string"
        ) {
          return a[this.sortKey].localeCompare(b[this.sortKey]) * modifier;
        } else {
          return (a[this.sortKey] - b[this.sortKey]) * modifier;
        }
      });
    },
  },
  mounted() {
    this.loadInstruments();
  },
};
</script>
