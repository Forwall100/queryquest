<template>
    <div>
        <div class="mt-28">
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card rounded="xl" color="white">
                        <div class="p-5">
                            <v-card-title>
                                <div class="flex justify-between">
                                    <h1 class="text-3xl font-black">📝 Все тесты</h1>
                                    <create-test-btn />
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <transition-group name="slide">
                                    <div v-for="test in tests">
                                        <v-card v-if="!results.some(obj => obj.test_id == test.id)" elevation="0">
                                            <test-card :key="test.id" :teacher_id="currentUser.id" :id="test.id"
                                                :title="test.title" :description="test.description"
                                                :is_teacher="currentUser.is_teacher" />
                                        </v-card>
                                        <v-card v-else disabled elevation="0">
                                            <div class="flex justify-between align-middle">
                                                <test-card :key="test.id" :teacher_id="currentUser.id" :id="test.id"
                                                    :title="test.title" :description="test.description"
                                                    :is_teacher="currentUser.is_teacher" />
                                                <div class="mt-7 text-xl font-bold">Решено: {{ results[results.findIndex(el => el.test_id == test.id)].correct_answers }}/{{ results[results.findIndex(el => el.test_id == test.id)].number_of_questions }}</div>
                                            </div>
                                        </v-card>
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
import TheHeader from '../components/TheHeader.vue'
import CreateTestBtn from "../components/CreateTestBtn.vue";
import TestCard from "../components/TestCard.vue";

import { emitter } from '../eventBus'

export default {
    components: {
        TheHeader,
        CreateTestBtn,
        TestCard,
    },
    data() {
        return {
            tests: null,
            dialog: false,
            results: []
        }
    },
    computed: {
        ...mapGetters(['currentUser']),
    },
    methods: {
        async delete_test(test_id) {
            await pb.collection('tests').delete(test_id)
            await this.fetch_tests()
        },
        async fetch_tests() {
            if (this.currentUser.is_teacher) {
                this.tests = await pb.collection('tests').getFullList({
                    filter: `teacher_id = "${this.currentUser.id}"`,
                    sort: '-created',
                });
            }
            else {
                this.tests = await pb.collection('tests').getFullList({
                    sort: '-created',
                });
            }
        }
    },
    async mounted() {
        emitter.on('testsUpdated', () => {
            this.fetch_tests()
        })
        this.fetch_tests()
        this.results = await pb.collection('results').getFullList({
            filter: `user_id = "${this.currentUser.id}"`,
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