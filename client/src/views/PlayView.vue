<template>
  <div>
    <header-comp />
    <classic-comp v-if="game === 'classic'" />
    <pokedex-comp v-if="game === 'pokedex'" />
    <shape-comp v-if="game === 'shape'" />
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import ClassicComp from "@/components/ClassicComp.vue";
import PokedexComp from "@/components/PokedexComp.vue";
import ShapeComp from "@/components/ShapeComp.vue";

export default {
  name: "PlayView",
  data() {
    return {
      game: null,
    };
  },
  mounted() {
    this.game = this.$route.params.game;
  },
  components: {
    HeaderComp,
    ClassicComp,
    PokedexComp,
    ShapeComp,
  },
};
</script>

<style></style>
