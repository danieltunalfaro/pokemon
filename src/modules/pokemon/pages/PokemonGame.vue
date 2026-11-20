<template>
    <section v-if="isLoading || !randomPokemon" class="flex min-h-dvh w-full flex-col items-center justify-center">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>

    <section v-else class="flex min-h-dvh w-full flex-col items-center justify-start gap-3 px-4 py-3">
        <section aria-label="Estadísticas del juego" aria-live="polite" class="grid w-full max-w-xl grid-cols-3 gap-3 text-center">
            <div class="rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
                <p class="text-sm text-slate-600">Juegos</p>
                <p class="text-2xl font-bold text-slate-900">{{ gameStats.played }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
                <p class="text-sm text-slate-600">Ganados</p>
                <p class="text-2xl font-bold text-green-700">{{ gameStats.won }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
                <p class="text-sm text-slate-600">Perdidos</p>
                <p class="text-2xl font-bold text-red-700">{{ gameStats.lost }}</p>
            </div>
        </section>
        <header class="flex flex-col items-center gap-1 text-center">
            <h1 class="text-2xl font-bold text-slate-900">¿Quién es este Pokémon?</h1>
            <div class="flex flex-wrap items-center justify-center gap-3">
                <p
                    role="status"
                    aria-live="polite"
                    :class="['rounded-full border px-4 py-1 font-semibold shadow-sm', {
                        'border-sky-200 bg-sky-100 text-sky-800': gameStatus === GameStatus.Playing,
                        'border-green-200 bg-green-100 text-green-800': gameStatus === GameStatus.Won,
                        'border-amber-200 bg-amber-100 text-amber-900': gameStatus === GameStatus.Lost,
                    }]"
                >
                    {{ gameStatus === GameStatus.Playing ? 'Elige una respuesta' : gameStatus === GameStatus.Won ? 'Correcto' : 'Intenta de nuevo' }}
                </p>
            </div>
        </header>
        <!-- Pokémon Picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus != GameStatus.Playing"/>
        <!-- Pokémon Options-->
         <PokemonOptions 
         :options="options" 
         :block-selection="gameStatus != GameStatus.Playing"
         :correct-answer="randomPokemon.id"
         @selected-option="checkAnswer"/>
        <footer class="flex justify-center">
            <button v-if="gameStatus != GameStatus.Playing"
                @click="getNextRound(4)"
                class="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
                ¿Jugar de nuevo?
            </button>
        </footer>
    </section>


</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus } from '../interfaces/game-status-enum.ts';
const { randomPokemon, isLoading, gameStatus, gameStats, pokemonOptions:options, checkAnswer, getNextRound } = usePokemonGame();
const onSelectedOption = (value: number)=>{
    console.log({ value });
};
</script>

<style scope>
</style>