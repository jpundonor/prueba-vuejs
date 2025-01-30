<!-- Permite cambiar entre diferentes índices (IPSA, IGPA, NASDAQ, etc.). -->
<template>
  <div class="border-b-1 border-gray-500">
    <vk-tabs @click="handleTabClick">
      <vk-tabs-item
      v-if="tabs"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="activeTab === index ? 'border-b-3 border-blue-600' : ''"
        @click="setActiveTab(index)"
      >
        {{ tab }}
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
export default {
  components: {
    vkTabs: "vk-tabs",
    vkTabsItem: "vk-tabs-item",
  },
  props:{
    tabs: Array,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
  },
  methods: {
    handleTabClick(index) {
      console.log("Tab clicked", index.target.firstChild.data);
    },
    setActiveTab(index) {
      this.activeTab = index;
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
  @apply cursor-pointer p-4 text-center flex-1;
}
</style>
