<template>
  <div class="flex flex-col space-y-6">
    <q-btn
      class="flex-1"
      color="primary"
      label="Classic!"
      @click="goToPlayView('classic')"
    />
    <q-btn
      class="flex-1"
      color="primary"
      label="Pokedex!"
      @click="goToPlayView('pokedex')"
    />
    <q-btn
      class="flex-1"
      color="primary"
      label="Shape!"
      @click="goToPlayView('shape')"
    />
    <q-btn class="flex-1" color="red" label="FetchData!" @click="fetchData()" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuComp",
  data() {
    return {
      gameSelected: null,
    };
  },
  methods: {
    goToPlayView(game) {
      this.$router.push({ name: "play", params: { game } });
    },
    async fetchData() {
      await axios.post("http://localhost:3000/pokemon/fetch").catch((e) => {
        console.log("Error: ", e);
      });
    },
  },
};
</script>

<style></style>
