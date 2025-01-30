<!-- Barra de búsqueda de instrumentos. -->

<template>
  <!-- <div class="uk-margin"> -->
  <div class="flex justify-center py-4 mx-8">
    <span class="uk-form-icon" uk-icon="icon: search"></span>
    <input
      class="bg-zinc-900 p-4 w-full rounded border border-gray-400 focus:outline-none focus:border-gray-100"
      type="text"
      v-model="searchTerm"
      @input="updateSearch"
      placeholder="Busca un instrumento"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useInstrumentStore } from "../stores/instrument";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    ...mapState(useInstrumentStore, ["instruments"]),
  },
  methods: {
    ...mapActions(useInstrumentStore, ["loadInstruments", "selectInstrument"]),
    updateSearch() {
      this.selectInstrument(this.searchTerm.toUpperCase());
    },
  },
  mounted() {
    this.selectInstrument("IPSA");
  },
};
</script>
