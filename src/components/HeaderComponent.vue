<!-- Muestra el nombre del índice (IPSA) y el valor actual con sus variaciones. -->
<template>
  <div class="font-light">
    <p class="text-4xl">
      {{ summary?.data?.info?.name }}, {{ summary?.data?.info?.countryName }}
    </p>
    <p class="text-2xl ">
      Valor Actual {{ summary?.data?.price?.tend }},
      {{ summary?.data?.price?.lastPrice }}
    </p>
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
