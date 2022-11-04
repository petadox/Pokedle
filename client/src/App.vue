<template>
  <div class="flex justify-center">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/*
div {
  background-image: url("@/assets/background.jpeg");
}
*/
</style>
