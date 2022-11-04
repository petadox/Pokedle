<template>
  <div>
    <q-input
      outlined
      bottom-slots
      v-model="pokemonName"
      label="Try a pokemon..."
      counter
    >
      <!--q-select
      filled
      :model-value="pokemonName"
      label="Try a pokemon..."
      use-input
      fill-input
      :options="allPokemonsName"
      input-debounce="0"
      @input-value="setModel()"
      @filter="myFilter()"
    -->
      <template v-slot:prepend>
        <q-icon name="catching_pokemon" />
      </template>
      <template v-slot:append>
        <q-icon
          name="send"
          @click="getPokemonByName(pokemonName)"
          class="cursor-pointer"
        />
      </template>
      <!--/q-select-->
    </q-input>
    <div>
      <list-pokemon-try :pokemons="listOfPokemons" :unknown="unknownPokemon" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListPokemonTry from "@/components/ListPokemonTry.vue";

export default {
  name: "ClassicComp",
  data() {
    return {
      selectedPokemon: null,
      pokemonName: null,
      unknownPokemon: null, // Pokemon a adivinar
      listOfPokemons: [], // Objeto vacio (se manda a ListPokemonTry)
      allPokemonsName: null, // Nombres de todos los pokemon
    };
  },
  async mounted() {
    await this.getAllPokemonNames();
    await this.getRandomPokemon();
  },
  methods: {
    setModel(val) {
      this.pokemonName = val;
    },
    async getAllPokemonNames() {
      await axios
        .get("http://localhost:3000/pokemon/all-names")
        .then((response) => {
          this.allPokemonsName = response.data;
        })
        .catch((e) => {
          console.log("Error on all names pokemon: ", e);
        });
    },
    async getRandomPokemon() {
      await axios
        .get("http://localhost:3000/pokemon/random")
        .then((response) => {
          this.unknownPokemon = response.data;
        })
        .catch((e) => {
          console.log("Error on random pokemon: ", e);
        });
    },
    async getPokemonByName(name) {
      this.pokemonName = "";
      await axios
        .get(`http://localhost:3000/pokemon/${name}`)
        .then((response) => {
          this.listOfPokemons.push(response.data);
        })
        .catch((e) => {
          console.log("Error on pokemon by name: ", e);
        });
    },
    fuzzysearch(input, pokemon) {
      return pokemon.includes(input);
    },
    myFilter(/* val, update, abort */) {
      const input = this.pokemonName.toLowerCase();
      return this.allPokemonsName.filter((item) =>
        this.fuzzysearch(input, item.toLowerCase())
      );
    },
  },
  watch: {
    //pokemonName(newVal, oldVal) {},
  },
  components: {
    ListPokemonTry,
  },
};
</script>

<style></style>
