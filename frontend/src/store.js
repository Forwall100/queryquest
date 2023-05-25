import { createStore } from 'vuex';
import pb from './pocketbase';

const store = createStore({
  state: {
    currentUser: pb.authStore.model,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    removeToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    updateCurrentUser({ commit }, user) {
      commit('setCurrentUser', user);
    },
  },
  getters: {
    currentUser: state => state.currentUser,
    isLoggedIn: (state) => {
      return state.token !== '';
    },
  },
});

pb.authStore.onChange((auth) => {
  store.dispatch('updateCurrentUser', pb.authStore.model);
});

export default store;
