import { createWebHistory, createRouter } from "vue-router";
import { AUTH_KEY } from "@/api/auth";

const router = createRouter({
  routes: [
    {
      path: "/nd-test",
      name: "Home",
      component: () => import("@/components/HomeView.vue"),
    },
    {
      path: "/notes",
      name: "Notes",
      component: () => import("@/components/NotesView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not found",
      component: () => import("@/components/PageNotFoundView.vue"),
    },
  ],
  history: createWebHistory("/"),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem(AUTH_KEY);
    if (token) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
