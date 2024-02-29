import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import YourGamesView from "../views/YourGamesView.vue";
import TopGamesView from "../views/TopGamesView.vue";
import AboutView from "../views/AboutView.vue";
import ResultsView from "../views/ResultsView.vue";
import ErrorView from "../views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "exact-active-link",
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/your-games",
      name: "Your games",
      component: YourGamesView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: "/top-games",
      name: "Top games",
      component: TopGamesView,
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
    },
    {
      path: "/results",
      name: "Results",
      component: ResultsView,
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorView,
    },
  ],
});

export default router;
