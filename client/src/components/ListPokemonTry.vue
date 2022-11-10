<template>
  <div>
    <div class="flex flex-row pt-6 space-x-1 font-bold text-white">
      <div class="flex justify-center w-24">Pokemon</div>
      <div class="flex justify-center w-24">Types</div>
      <div class="flex justify-center w-24">Preevolution</div>
      <div class="flex justify-center w-24">Evolution</div>
      <div class="flex justify-center w-24">Weight</div>
      <div class="flex justify-center w-24">Height</div>
      <div class="flex justify-center w-24">Generation</div>
    </div>
    <div v-for="pokemon in reversedPokemons" :key="pokemon.id">
      <pokemon-try
        class="py-2"
        :pokemon="pokemon"
        :unknown="unknown"
        @winner="this.$emit('winner')"
      />
    </div>
  </div>
</template>

<script>
import PokemonTry from "@/components/PokemonTry.vue";
export default {
  name: "ListPokemonTry",
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
    unknown: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    PokemonTry,
  },
  computed: {
    reversedPokemons() {
      return this.pokemons.slice().reverse();
    },
  },
};
</script>

<style></style>
