<template>
  <div>
    <q-select
      outlined
      v-model="pokemonName"
      label="Try a pokemon..."
      label-color="white"
      bg-color="grey"
      use-input
      input-debounce="500"
      :options="filteredPokemons"
      @filter="myFilter"
      options-selected-class="text-deep-orange"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-img :src="scope.opt.sprite" style="height: 64px; width: 64px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:prepend>
        <q-icon color="white" name="catching_pokemon" />
      </template>
      <template v-slot:append>
        <q-icon
          name="send"
          color="white"
          @click="getPokemonByName(pokemonName.label)"
          class="cursor-pointer"
        />
      </template>
    </q-select>
    <div>
      <list-pokemon-try
        :pokemons="listOfGuesses"
        :unknown="unknownPokemon"
        @winner="gameFinished = true"
      />
    </div>
    <div v-if="gameFinished">
      <win-comp />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListPokemonTry from "@/components/ListPokemonTry.vue";
import WinComp from "@/components/WinComp.vue";

export default {
  name: "ClassicComp",
  data() {
    return {
      gameFinished: false,
      pokemonName: null,
      unknownPokemon: null, // Pokemon a adivinar
      listOfGuesses: [], // Objeto vacio (se manda a ListPokemonTry)
      allPokemons: null, // Nombres de todos los pokemon
      filteredPokemons: null, // List to filter
    };
  },
  async mounted() {
    await this.getAllPokemons();
    await this.getRandomPokemon();
  },
  methods: {
    async getAllPokemons() {
      await axios
        .get("http://localhost:3000/pokemon/all")
        .then((response) => {
          this.allPokemons = response.data;
          this.filteredPokemons = this.allPokemons;
        })
        .catch((e) => {
          console.log("Error on all pokemons: ", e);
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
          this.listOfGuesses.push(response.data);
          delete this.allPokemons[response.data.id];
        })
        .catch((e) => {
          console.log("Error on pokemon by name: ", e);
        });
    },
    myFilter(val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }

      update(() => {
        const input = val.toLowerCase();
        const arrayOfPokemons = Object.values(this.allPokemons);
        this.filteredPokemons = arrayOfPokemons.filter((pokemon) =>
          pokemon.label.toLowerCase().startsWith(input)
        );
      });
    },
  },
  components: {
    ListPokemonTry,
    WinComp,
  },
};
</script>

<style></style>
