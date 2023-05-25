<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" v-if="currentUser.is_teacher" color="blue-accent-4" prepend-icon="mdi-plus" variant="flat"
                rounded="pill" size="x-large">
                <h1 class="font-black">
                    Добавить вопрос
                </h1>
            </v-btn>
        </template>
        <v-card rounded="xl" width="700">
            <div class="p-8">
                <div class="flex justify-between">
                    <v-card-title class="text-h5">
                        ✍ Создание вопроса:
                    </v-card-title>
                    <v-btn variant="tonal" prepend-icon="mdi-auto-fix" rounded="pill" color="blue-accent-4" class="mt-1"
                        @click="do_magic">Сделать
                        магию</v-btn>
                </div>
                <v-card-text>
                    <v-progress-linear class="mb-5" rounded="pill" v-model="progress" v-if="loading" color="blue-accent-4"
                        height="25">
                        <template v-slot:default="{ value }">
                            <strong v-if="value < 50">{{ Math.ceil(value) }}%</strong>
                            <strong class="text-white" v-else>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>

                    <Transition name="slide-fade">
                        <div v-if="generated_question" class="flex">
                            <h1 class="text-4xl">🧙‍♂️</h1>
                            <div class="flex items-center">
                                <div
                                    class="bg-blue-600 w-full rounded-tr-3xl rounded-br-3xl rounded-bl-3xl mt-5 ml-5 mb-10">
                                    <p class="text-xl text-white p-5 font-bold">
                                        {{ generated_question }}
                                    </p>
                                    <p class="text-blue-400 p-5 select-none">
                                        *Бот дурачок, он не понимает что говорит, на всякий случай проверяйте его ответы
                                    </p>
                                </div>
                                <v-btn v-if="copy_btn_status" class="mb-6" icon="mdi-check" variant="text"></v-btn>
                                <v-btn v-else @click="writeClipboard(generated_question)" class="mb-6"
                                    icon="mdi-content-copy" variant="text"></v-btn>

                            </div>
                        </div>
                    </Transition>

                    <v-text-field clearable v-model="question" label="Вопрос"></v-text-field>
                    <v-text-field clearable v-model="answer" label="Ответ (в виде SQL запроса)"></v-text-field>
                    <div class="text-lg">Сложность</div>
                    <v-slider :ticks="tickLabels" :min="1" :max="5" step="1" show-ticks="always" tick-size="4"
                        v-model="complexity"></v-slider>
                    <v-alert variant="outlined" class="mb-5" v-if="errorMessage" type="error">
                        {{ errorMessage }}
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded="pill" color="blue-accent-4" variant="text" @click="dialog = false; errorMessage = ''">
                        Закрыть
                    </v-btn>
                    <v-btn class="px-5" rounded="pill" color="blue-accent-4" variant="flat" @click="create_test">
                        Создать
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import pb from "../pocketbase.js";
import { mapGetters } from 'vuex'
import { emitter } from '../eventBus'
import { ai_api, user_db_api } from "../api/index"

export default {
    data() {
        return {
            dialog: false,
            question: '',
            answer: '',
            complexity: '1',
            errorMessage: '',
            tickLabels: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5'
            },
            generated_question: "",
            loading: false,
            progress: 0,
            copy_btn_status: false
        }
    },
    computed: {
        ...mapGetters(['currentUser']),
    },
    props: ['test_id'],
    methods: {
        async create_test() {
            const data = {
                "question": this.question,
                "correct_answer": this.answer,
                "test_id": this.test_id,
                "complexity": this.complexity
            };
            try {
                await pb.collection('questions').create(data);
                emitter.emit('questionsUpdated')
                this.dialog = false
                this.title = ''
                this.description = false
            } catch (error) {
                this.errorMessage = error.message
            }
        },
        async do_magic() {
            this.loading = true
            this.generated_question = ""
            let count = 0
            const interval = setInterval(() => {
                if (count >= 60) {
                    clearInterval(interval)
                    this.loading = false
                    this.progress = 100
                } else {
                    this.progress = count / 0.6
                    count++
                }
            }, 1000)

            const schema = await user_db_api.get_schema(this.test_id)
            const generated_q = await ai_api.create_question(schema.data.schema, this.complexity)
            console.log(generated_q)
            this.generated_question = generated_q.data.answer

            clearInterval(interval)
            this.loading = false
            this.progress = 100
        },
        writeClipboard(text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('Text copied to clipboard')
                    this.copy_btn_status = true
                    setTimeout(() => {
                        this.copy_btn_status = false
                    }, 1000);
                })
                .catch(err => {
                    console.error('Error copying text', err)
                })
        }

    }
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>