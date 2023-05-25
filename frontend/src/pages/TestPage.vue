vgt<template>
    <div>
        <div class="mt-28">
            <v-row justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card rounded="xl" color="white">
                        <div class="p-5">
                            <v-card-title>
                                <div class="flex justify-between align-middle text-center">
                                    <h1 class="text-3xl font-black">❓ Вопросы для теста: <p class="inline-block"
                                            v-if="number_of_questions != 0">{{ number_of_questions }}</p>
                                    </h1>
                                    <create-question-btn :test_id="test_id" />
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <transition-group name="slide">
                                    <div class="mt-5" v-for="question, i in questions" :key="question.id">
                                        <div class="flex flex-col">
                                            <question-card :question="question.question" :answer="question.correct_answer"
                                                :id="question.id" :complexity="question.complexity" :counter="i + 1" />
                                        </div>
                                    </div>
                                </transition-group>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import pb from "../pocketbase.js";
import { mapGetters } from 'vuex'
import { emitter } from '../eventBus'
import QuestionCard from "../components/QuestionCard.vue";
import CreateQuestionBtn from "../components/CreateQuestionBtn.vue";

export default {
    components: {
        QuestionCard,
        CreateQuestionBtn
    },
    data() {
        return {
            test_id: this.$route.params.testId,
            questions: null,
            dialog: false,
            number_of_questions: 0,
            results: []
        }
    },
    computed: {
        ...mapGetters(['currentUser']),
    },
    methods: {
        async delete_question(test_id) {
            await pb.collection('tests').delete(test_id)
            await this.fetch_questions()
        },
        async fetch_questions() {
            this.questions = await pb.collection('questions').getFullList({
                filter: `test_id = "${this.test_id}"`,
                sort: '-created',
            });
            this.number_of_questions = this.questions.length
        },
    },
    async mounted() {
        emitter.on('questionsUpdated', () => {
            this.fetch_questions()
        })
        this.fetch_questions()
        

        this.results = await pb.collection('results').getFullList({
            filter: `user_id = "${this.teacher_id}"`,
        });
    }
}
</script>


<style>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s cubic-bezier(0.5, 0, 0.5, 1);
}

.slide-enter {
    transform: translateX(-100%) scale(0.8);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
}
</style>