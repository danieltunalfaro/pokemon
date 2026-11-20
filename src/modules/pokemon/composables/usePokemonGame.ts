import { computed, onMounted, reactive, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
    
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const gameStats = reactive({ played: 0, won: 0, lost: 0 });
    const isLoading = computed(() => pokemons.value.length === 0);

    // Creamos un pokemon de listado de options
    // Obtengo un valor partiendo de alguno de los elementos que conforman parte del arreglo
    // const randomPokemon = computed(() => pokemonOptions.value[ Math.floor(Math.random() * pokemonOptions.value.length)],);
    const randomPokemon = computed(
        () => {
            const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
            return pokemonOptions.value[randomIndex];
        },
    );

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=500');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextRound = (howMany: number = 4 ) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
    };

    const checkAnswer=(id: number)=>{
        const answer = randomPokemon.value;
        if (gameStatus.value !== GameStatus.Playing || !answer) return;

        const hasWon = answer.id === id;
        if(hasWon){
            gameStatus.value=GameStatus.Won;
            gameStats.played++;
            gameStats.won++;
            confetti({
                particleCount: 300,
                spread: 150,
                origin: {
                    y: 0.6
                },
            });
            return;
        }

        gameStatus.value = GameStatus.Lost;
        gameStats.played++;
        gameStats.lost++;
    }


    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async ()=>{
        await new Promise((r) => setTimeout(r, 1000));
        pokemons.value=await getPokemons();
        getNextRound();
        console.log({ pokemons });
        console.log(pokemonOptions.value);
    });
    
    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        gameStats,
        // Methods
        getNextRound,
        checkAnswer,
    };
}