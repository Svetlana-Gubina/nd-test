import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../components/HomeView.vue';
import NotesView from '../components/NotesView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/notes', component: NotesView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
