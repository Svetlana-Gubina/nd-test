import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/HomeView.vue'),
    },
    {
      path: '/notes',
      name: 'Notes',
      component: () => import('@/components/NotesView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not found',
      component: () => import('@/components/PageNotFoundView.vue'),
    },
  ],
  history: createWebHistory('/'),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('user');
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
