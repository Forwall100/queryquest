import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterPage from './pages/RegistrationPage.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import TestPage from './pages/TestPage.vue';
import SolveTestPage from './pages/SolveTestPage.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/register', component: RegisterPage },
    { path: '/login', component: LoginPage },
    { path: '/test/:testId', component: TestPage, props: true },
    { path: '/test/solve/:testId', component: SolveTestPage, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    next('/register');
  } else {
    next();
  }
});

export default router;
