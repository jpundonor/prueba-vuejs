<!-- Permite cambiar entre diferentes índices (IPSA, IGPA, NASDAQ, etc.). -->

<template>
  <div class="shadow-md">
    <p class="text-2xl">TabComponent</p>
    <vk-tabs @click="handleTabClick">
      <vk-tabs-item title>IPSA</vk-tabs-item>
      <vk-tabs-item title>IGPA</vk-tabs-item>
      <vk-tabs-item title>NASDAQ</vk-tabs-item>
      <vk-tabs-item title>DOW JONES</vk-tabs-item>
      <vk-tabs-item title>SP/BVL</vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
export default {
  components: {
    vkTabs: "vk-tabs",
    vkTabsItem: "vk-tabs-item",
  },
  methods: {
    handleTabClick(index) {
      console.log("Tab clicked", index.target.firstChild.data);
    },
  },
};
</script>

<style scoped>
@reference "tailwindcss";
vk-tabs {
  @apply flex;
}
vk-tabs-item {
  @apply cursor-pointer p-4 text-center;
  @apply hover:bg-gray-300;
}
</style>
