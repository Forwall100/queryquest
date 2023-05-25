<template>
    <div class="w-52">
        <h1 class="text-gray-500 inline-block">Сложность <p class="font-semibold inline-block text-gray-600">{{ complexity }}/5</p></h1>
        <div class="flex items-center w-full mt-1">
            <div v-for="i in 5" :key="i" :class="{ 'bg-gray-400': i > complexity, 'bg-blue-500': i <= complexity }"
                class="h-2 flex-1 mr-1-2 w-1/5 mr-1 rounded-full"></div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        complexity: {
            type: String,
            required: true,
        },
    },
};
</script>
  