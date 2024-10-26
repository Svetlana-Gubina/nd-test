import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../components/HomeView.vue';
import NotesView from '../components/NotesView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/notes',
    name: 'Notes',
    component: NotesView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
