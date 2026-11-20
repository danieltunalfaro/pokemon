<template>
    <section class="mt-3 grid w-full max-w-md grid-cols-2 gap-3 px-2">
        <button v-for="{ name, id } in options" 
        :key="id" 
        @click="$emit('selectedOption', id)"
        :class="['capitalize disabled:shadow-none disabled:bg-gray-100',{
            correct:id === correctAnswer && blockSelection,
            incorrect :id != correctAnswer && blockSelection 
        }]"
        :disabled="blockSelection">
            {{  name  }}
        </button>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces';
interface Props {
    options: Pokemon[];
    blockSelection: boolean;
    correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
    selectedOption: [id: number];
}>();

</script>

<style scoped>
@reference "tailwindcss";

button{
    @apply bg-white text-slate-900 shadow-md rounded-lg p-3 m-0 cursor-pointer w-full text-center transition-all hover:bg-gray-100;
}

.correct {
    @apply bg-green-500 text-white;
}

.incorrect {
    @apply bg-red-100 text-red-900 opacity-70;
}


</style>