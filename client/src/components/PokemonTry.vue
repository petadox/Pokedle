<template>
  <div v-if="Object.keys(pokemon).length !== 0">
    <div class="flex flex-row space-x-1">
      <div
        class="flex justify-center w-24 border-4 rounded-xl"
        :class="getBgColor(pokemon.sprite, unknown.sprite)"
      >
        <img :src="pokemon.sprite" />
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="getBgTypeColor()"
      >
        <q-chip :color="getTypeColor(pokemon.type1)" text-color="black">
          {{ pokemon.type1 }}
        </q-chip>
        <q-chip
          v-if="pokemon.type2"
          :color="getTypeColor(pokemon.type2)"
          text-color="black"
        >
          {{ pokemon.type2 }}
        </q-chip>
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="getBgColor(pokemon.preevolution, unknown.preevolution)"
      >
        {{ pokemon.preevolution ? "Yes!" : "No!" }}
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="getBgColor(pokemon.evolution, unknown.evolution)"
      >
        {{ pokemon.evolution ? "Yes!" : "No!" }}
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="moreOrLess(pokemon.weight, unknown.weight).color"
      >
        <div class="flex flex-col justify-center items-center">
          <div>{{ formatMeasures(pokemon.weight, "kg") }}</div>
          <div v-if="moreOrLess(pokemon.weight, unknown.weight).compare">
            {{ moreOrLess(pokemon.weight, unknown.weight).compare }}
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="moreOrLess(pokemon.height, unknown.height).color"
      >
        <div class="flex flex-col justify-center items-center">
          <div>{{ formatMeasures(pokemon.height, "m") }}</div>
          <div v-if="moreOrLess(pokemon.height, unknown.height).compare">
            {{ moreOrLess(pokemon.height, unknown.height).compare }}
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center w-24 border-4 rounded-xl"
        :class="moreOrLess(pokemon.generation, unknown.generation).color"
      >
        <div class="flex flex-col justify-center items-center">
          <div>{{ pokemon.generation }}</div>
          <div
            v-if="moreOrLess(pokemon.generation, unknown.generation).compare"
          >
            {{ moreOrLess(pokemon.generation, unknown.generation).compare }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonTry",
  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
    unknown: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    if (this.unknown.name === this.pokemon.name) {
      this.$emit("winner");
    }
  },
  methods: {
    getTypeColor(type) {
      switch (type) {
        case "normal":
          return "brown-4";
        case "fire":
          return "orange";
        case "water":
          return "blue";
        case "grass":
          return "green";
        case "electric":
          return "yellow";
        case "ice":
          return "light-blue-2";
        case "fighting":
          return "red-14";
        case "poison":
          return "purple";
        case "ground":
          return "yellow-7";
        case "flying":
          return "indigo-3";
        case "psychic":
          return "pink";
        case "bug":
          return "light-green";
        case "rock":
          return "brown-13";
        case "ghost":
          return "deep-purple";
        case "dark":
          return "brown";
        case "dragon":
          return "indigo-14";
        case "steel":
          return "grey";
        case "fairy":
          return "pink-2";
      }
    },
    moreOrLess(atr1, atr2) {
      let color = this.getBgColor(atr1, atr2);
      let compare = atr1 > atr2 ? "Less!" : "More!";
      if (color === "bg-red-400") {
        return { color, compare };
      }
      return { color };
    },
    getBgColor(atr1, atr2) {
      return atr1 === atr2 ? "bg-green-400" : "bg-red-400";
    },
    getBgTypeColor() {
      let types = [];
      types.push(this.pokemon.type1);
      types.push(this.pokemon.type2);
      if (
        types.includes(this.unknown.type1) &&
        types.includes(this.unknown.type2)
      ) {
        return "bg-green-400";
      } else if (
        (types.includes(this.unknown.type1) && this.unknown.type1) ||
        (types.includes(this.unknown.type2) && this.unknown.type2)
      ) {
        return "bg-orange-400";
      } else {
        return "bg-red-400";
      }
    },
    formatMeasures(measurement, type) {
      let fixedMeasure = (parseFloat(measurement) / 10).toFixed(1);
      return fixedMeasure.toString().concat(" ", type);
    },
  },
};
</script>

<style></style>
