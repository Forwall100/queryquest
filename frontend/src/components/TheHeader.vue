<template>
    <div class="backdrop-blur-md bg-blue-700/40 text-white py-2 fixed z-50 w-full top-0 left-0 right-0">
        <div class="flex items-center justify-between px-4 py-2 mx-28">
            <router-link to="/" class="text-2xl font-black">Query Quest</router-link>
            <div v-if="!isLoggedIn" class="flex justify-center">
                <router-link to="/register" class="mr-3">
                    <v-btn rounded="pill" color="white" variant="flat">Регистрация</v-btn>
                </router-link>
                <router-link to="/login">
                    <v-btn rounded="pill" color="white" variant="tonal">Войти</v-btn>
                </router-link>
            </div>
            <div v-else class="relative">
                <v-menu v-model="isDropdownOpen" :close-on-content-click="false" location="bottom center">
                    <template v-slot:activator="{ props }">
                        <v-btn rounded="pill" variant="text" size="x-large"
                            class="flex items-center hover:cursor-pointer text-none text-body-1 ml-5" v-bind="props">
                            <v-icon class="mr-5" icon="mdi-account" size="x-large"></v-icon>
                            <span v-if="isLoggedIn" class="mr-4 text-lg font-black">
                                {{ currentUser.name }} {{ currentUser.surname }}
                            </span>
                        </v-btn>
                    </template>

                    <v-card rounded="xl" min-width="300" class="mt-5">
                        <div class="p-3">
                            <v-list>
                                <v-list-item :title="currentUser.email"
                                    :subtitle="currentUser.is_teacher ? 'Преподаватель' : 'Студент'" />
                            </v-list>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn variant="text" @click="isDropdownOpen = false">
                                    Закрыть
                                </v-btn>
                                <v-btn color="blue-accent-4" variant="flat" rounded="pill" class="px-5" @click="logout">
                                    Выйти
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            isDropdownOpen: false,
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'isLoggedIn']),
    },
    methods: {
        ...mapMutations(['removeToken']),
        logout() {
            this.removeToken();
            this.$router.push('/login')
        }

    }
}
</script>