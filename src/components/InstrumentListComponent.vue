<!-- Lista de instrumentos (acciones) con su información clave. -->
<template>
  <table class="w-1/2">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Último</th>
        <th>Monto (MM)</th>
        <th>Var día</th>
        <th>Var 30d**</th>
        <th>Año Actual</th>
        <th>12 Meses</th>
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
  computed: {
    ...mapState(useInstrumentStore, ["instruments"]),
    firstHalf() {
      const half = Math.ceil(this.instruments.length / 2);
      return this.instruments.slice(0, half);
    },
    secondHalf() {
      const half = Math.ceil(this.instruments.length / 2);
      return this.instruments.slice(half);
    },
  },
  methods: {
    ...mapActions(useInstrumentStore, ["loadInstruments"]),
  },
  mounted() {
    this.loadInstruments();
  },
};
</script>
