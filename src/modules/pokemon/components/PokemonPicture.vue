<template>
    <section>
        <img v-if="!showPokemon" :src="pokemonImage" alt="Pokémon" class="brightness-0 h-40 w-40 object-contain" />
        <img v-else :src="pokemonImage" class="fade-in h-40 w-40 object-contain" alt="pokemon Image"/>
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
interface Props {
    pokemonId: number;
    showPokemon?: boolean;
}

// Definimos un valor por defecto
const props = withDefaults(defineProps<Props>(),{
    showPokemon: false,
});

const pokemonImage=computed(()=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ props.pokemonId}.svg`)

</script>

<style scope>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>