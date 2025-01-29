<template>
  <SearchBarComponent />
  <HeaderComponent />
  <SummaryComponent />
  <ChartComponent />
  <TabComponent />
  <div class="w-full flex">
    <InstrumentListComponent :isFisrt="false" />
    <InstrumentListComponent :isFisrt="true" />
  </div>
  </template>

<script setup>
import ChartComponent from "./components/ChartComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import InstrumentListComponent from "./components/InstrumentListComponent.vue";
import SearchBarComponent from "./components/SearchBarComponent.vue";
import SummaryComponent from "./components/SummaryComponent.vue";
import TabComponent from "./components/TabComponent.vue";
</script>

<style scoped></style>
