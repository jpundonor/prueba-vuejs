<template>
  <SearchBarComponent />
  <div class="mx-8 md:grid md:grid-flow-col gap-10">
    <div>
      <HeaderComponent />
      <ChartComponent />
    </div>
    <div class="pt-8">
      <SummaryComponent />
    </div>
  </div>
  <div class="mx-8 w-1/2">
    <TabComponent :tabs="tabs" />
  </div>
  <div class="flex flex-col md:flex-row mx-8 gap-6 pb-10">
    <InstrumentListComponent :isFisrt="false" />
    <InstrumentListComponent :isFisrt="true" />
  </div>
  <footer class=" text-gray-500 text-sm mx-8 py-4 flex flex-col">
    <span>

      * Último precio, Monto Transado y Variación diaria con desfase de 15 minutos. Haz click en cada instrumento para ver más información actualizada en el gráfico.
    </span>
    <span>
      ** Variaciones a 30d, Año Actual y 12 meses calculadas con el precio de cierre al último día hábil.
    </span>
    
  </footer>
</template>

<script>
import ChartComponent from "./components/ChartComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import InstrumentListComponent from "./components/InstrumentListComponent.vue";
import SearchBarComponent from "./components/SearchBarComponent.vue";
import SummaryComponent from "./components/SummaryComponent.vue";
import TabComponent from "./components/TabComponent.vue";

export default {
  components: {
    ChartComponent,
    HeaderComponent,
    InstrumentListComponent,
    SearchBarComponent,
    SummaryComponent,
    TabComponent,
  },
  data() {
    return {
      tabs: ["IPSA", "IGPA", "NASDAQ", "DOW JONES", "SP/BVL"],
    };
  },
};
</script>

<style scoped></style>
