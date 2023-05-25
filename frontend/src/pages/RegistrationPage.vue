<template>
    <div class="mt-28">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card rounded="xl" color="white">
                    <div class="p-5">
                        <v-card-title>Регистрация</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="registerUser">
                                <v-text-field v-model="firstName" label="Имя" required></v-text-field>

                                <v-text-field v-model="lastName" label="Фамилия" required></v-text-field>

                                <v-text-field v-model="email" label="Email" type="email" required></v-text-field>

                                <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>

                                <v-text-field v-model="passwordConfirmation" label="Подтвердите пароль" type="password"
                                    required></v-text-field>

                                <transition name="slide-fade">
                                    <v-text-field v-if="!isTeacher" v-model="group" label="Группа" required></v-text-field>
                                </transition>

                                <v-checkbox v-model="isTeacher" label="Я преподаватель"></v-checkbox>

                                <v-alert variant="outlined" class="mb-5" v-if="errorMessage" type="error">
                                    {{ errorMessage }}
                                </v-alert>

                                <RouterLink to='/login'>Вход</RouterLink>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="py-7" rounded="pill" variant="flat" size="large" color="blue-accent-4" block
                                @click="registerUser">Зарегистрироваться</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import pb from "../pocketbase.js";

export default {
    data() {
        return {
            firstName: 'Ivan',
            lastName: 'Ivanov',
            email: 'gloktop@yandex.ru',
            password: '12345678',
            passwordConfirmation: '12345678',
            group: 'ip-112',
            isTeacher: false,
            errorMessage: null,
        }
    },
    methods: {
        async registerUser() {
            const data = {
                "email": this.email,
                "emailVisibility": true,
                "password": this.password,
                "passwordConfirm": this.passwordConfirmation,
                "name": this.firstName + " " + this.lastName,
                "group": this.isTeacher ? "teacher" : this.group,
                "is_teacher": this.isTeacher
            };

            pb.collection('users').create(data)
                .then(() => {
                    this.firstName = '';
                    this.lastName = '';
                    this.email = '';
                    this.password = '';
                    this.passwordConfirmation = '';
                    this.group = '';
                    this.isTeacher = false;
                    this.errorMessage = null;
                    this.$router.push('/login')
                })
                .catch((error) => {
                    this.errorMessage = error.message;
                });
        }
    },
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>