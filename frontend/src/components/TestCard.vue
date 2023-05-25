<template>
        <div @click="navigateToTest(id)"
            class="flex justify-between text-xl mb-5 mt-5 border-b-4 border-slate-100 pb-5 hover:cursor-pointer hover:text-blue-700 hover:border-blue-700 transition ease-in-out">
            <div>
                <h1 class="font-bold">{{ title }}</h1>
                <h2>{{ description }}</h2>
            </div>
            <div v-if="is_teacher">
                <edit-test-btn :teacher_id="teacher_id" :test_id="id" />

                <v-dialog v-model="dialog" width="auto">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="ml-5 hover:text-red-600 transition ease-in-out"
                            icon="mdi-delete-outline" variant="flat" />
                    </template>
                    <v-card rounded="xl">
                        <div class="p-8">
                            <v-card-title class="text-h5 mb-5">
                                🗑️ Вы хотите удалить тест?
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn rounded="pill" color="blue-accent-4" variant="text" @click="dialog = false">
                                    Закрыть
                                </v-btn>
                                <v-btn class="px-5" rounded="pill" color="blue-accent-4" variant="flat"
                                    @click="delete_test(id)">
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
import EditTestBtn from "../components/EditTestBtn.vue";


export default {
    components: {
        EditTestBtn,
    },
    data() {
        return {
            dialog: false,
            results: []
        }
    },
    props: [
        'id',
        'title',
        'description',
        'teacher_id',
        'is_teacher'
    ],
    methods: {
        async delete_test(test_id) {
            await pb.collection('tests').delete(test_id)
            emitter.emit('testsUpdated')
        },
        navigateToTest(testId) {
            if (this.is_teacher) {
                this.$router.push(`/test/${testId}`);
            }
            else {
                this.$router.push(`/test/solve/${testId}`)
            }
        }
    },

    async mounted() {
    }
}
</script>