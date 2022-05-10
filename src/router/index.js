import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    hidden: true
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    mode: "history", 
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
