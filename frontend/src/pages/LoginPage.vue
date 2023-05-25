<template>
    <div class="mt-32">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card rounded="xl">
                    <div class="p-5">
                        <v-card-title>Вход</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="auth">
                                <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                                <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
                                <v-alert variant="outlined" class="mb-5" v-if="errorMessage" type="error">
                                    {{ errorMessage }}
                                </v-alert>
                                <RouterLink to='/register'>Регистрация</RouterLink>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="py-7" rounded="pill" variant="flat" size="large" color="blue-accent-4" block @click="auth">Войти</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import pb from "../pocketbase.js";
import { mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            email: "gloktop@yandex.ru",
            password: "12345678",
            errorMessage: null,
        };
    },
    methods: {
        ...mapActions(["updateCurrentUser"]),
        ...mapMutations(['setToken']),
        async auth() {
            try {
                await pb.collection("users").authWithPassword(this.email, this.password);
                this.email = "";
                this.password = "";
                this.$router.push("/");
            } catch (error) {
                this.errorMessage = error.message;
            }

            this.setToken(pb.authStore.token)
            // localStorage.setItem("id", pb.authStore.model.id);
            this.updateCurrentUser(pb.authStore.model);
        },
    },
};
</script>
<!-- <script>
import PocketBase from 'pocketbase'

export default {
    data() {
        return {
            email: 'gloktop@yandex.ru',
            password: '12345678',
            errorMessage: null,
        }
    },
    methods: {
        async auth() {
            const pb = new PocketBase('http://127.0.0.1:8090');

            await pb.collection('users').authWithPassword(
                this.email,
                this.password,
            )
                .then(() => {
                    this.email = ''
                    this.password = ''
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.errorMessage = error.message;
                });

            localStorage.setItem('token', pb.authStore.token)
            localStorage.setItem('id', pb.authStore.model.id)
        },
    },
}
</script> -->
  