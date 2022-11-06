<template>
  <body class="flex justify-center">
    <router-view />
  </body>
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

body {
  background-image: url("@/assets/black-background.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
