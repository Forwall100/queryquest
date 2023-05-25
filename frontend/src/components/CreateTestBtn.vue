<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" v-if="currentUser.is_teacher" color="blue-accent-4" prepend-icon="mdi-plus" variant="flat"
                rounded="pill" size="x-large">
                <h1 class="font-black">
                    Создать тест
                </h1>
            </v-btn>
        </template>
        <v-card rounded="xl" width="700">
            <div class="p-8">
                <v-card-title class="text-h5 mb-5">
                    ✍ Создание теста:
                </v-card-title>
                <v-card-text>
                    <v-text-field clearable v-model="title" label="Название"></v-text-field>
                    <v-text-field clearable v-model="description" label="Описание"></v-text-field>
                    <v-file-input show-size ref="fileInput" label="База данных sqlite3"></v-file-input>
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

export default {
    data() {
        return {
            dialog: false,
            title: '',
            description: '',
            formData: new FormData(),
            errorMessage: '',
        }
    },
    computed: {
        ...mapGetters(['currentUser']),
    },
    methods: {
        async create_test() {
            const fileInput = this.$refs.fileInput;

            for (let file of fileInput.files) {
                this.formData.append('db_file', file);
            }

            this.formData.set("title", this.title)
            this.formData.set("description", this.description)
            this.formData.set("teacher_id", this.currentUser.id)

            try {
                await pb.collection('tests').create(this.formData)
                emitter.emit('testsUpdated')
                this.dialog = false
                this.title = ''
                this.description = false
            } catch (error) {
                this.errorMessage = error.message
            }
        }
    },
}
</script>