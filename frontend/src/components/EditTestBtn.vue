<template>
    <v-dialog v-model="dialog" width="1024">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="hover:text-blue-700" icon="mdi-pencil-outline" variant="flat" />
        </template>
        <v-card rounded="xl">
            <div class="p-8">
                <v-card-title class="mb-5">
                    <span class="text-h5">✍️ Редактирование</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="editTest">
                        <v-text-field v-model="title" label="Название" required></v-text-field>
                        <v-textarea v-model="description" label="Описание"></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue-darken-3" variant="text" @click.prevent="dialog = false">
                        Закрыть
                    </v-btn>
                    <v-btn color="blue-darken-3" variant="tonal" type="submit" @click="editTest">
                        Изменить
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { emitter } from '../eventBus'
import pb from "../pocketbase.js";

export default {
    data: () => ({
        dialog: false,
        title: '',
        description: '',
    }),
    props: {
        teacher_id: {
            type: String,
            required: true
        },
        test_id: {
            type: String,
            required: true
        }
    },
    methods: {
        async editTest() {
            const data = {
                "title": this.title,
                "description": this.description,
                "teacher_id": this.teacher_id
            };
            try {
                await pb.collection('tests').update(this.test_id, data);
                emitter.emit('testsUpdated')
                this.dialog = false
                this.title = ''
                this.description = false
            } catch (error) {
                this.errorMessage = error.message
            }
        }
    }
}
</script>

<style>
v-card {
    padding: 20px;
}
</style>