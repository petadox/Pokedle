<template>
  <div class="flex flex-col justify-center">
    <header-comp />
    <menu-comp />
  </div>
</template>

<script>
import MenuComp from "@/components/MenuComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
export default {
  name: "HomeView",
  components: {
    HeaderComp,
    MenuComp,
  },
};
</script>
