<template>
    <div @click="navigateToQuestion(id)"
        class="flex justify-between text-xl mt-5 border-b-4 border-slate-100 pb-5 hover:cursor-pointer hover:text-blue-700 hover:border-blue-700 transition ease-in-out">
        <div class="bg-gray-200 rounded-full w-10 h-7 flex justify-center mr-5 mt-3">{{ counter }}</div>
        <div class="w-full">
            <h1 class="font-bold"> Вопрос: {{ question }}</h1>
            <h2 class="text-emerald-800">Ответ: {{ answer }}</h2>
        </div>
        <complexity-line :complexity="complexity" />
        <div>
            <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="ml-5 hover:text-red-600 transition ease-in-out" icon="mdi-delete-outline"
                        variant="flat" />
                </template>
                <v-card rounded="xl">
                    <div class="p-8">
                        <v-card-title class="text-h5 mb-5">
                            🗑️ Вы хотите удалить вопрос?
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn rounded="pill" color="blue-accent-4" variant="text" @click="dialog = false">
                                Закрыть
                            </v-btn>
                            <v-btn class="px-5" rounded="pill" color="blue-accent-4" variant="flat"
                                @click="delete_question(id)">
                                Удалить
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>


<script>
import pb from "../pocketbase.js";
import { emitter } from '../eventBus'
import ComplexityLine from "./ComplexityLine.vue";
import CreateQuestionBtn from "./CreateQuestionBtn.vue";

export default {
    components: {
        ComplexityLine,
        CreateQuestionBtn
    },
    data() {
        return {
            dialog: false
        }
    },
    props: [
        'id',
        'question',
        'answer',
        'complexity',
        'test_id',
        'counter'
    ],
    methods: {
        async delete_question(question_id) {
            await pb.collection('questions').delete(question_id)
            emitter.emit('questionsUpdated')
        },
    },

}
</script>