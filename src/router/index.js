import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  //Admin Page
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import('../views/admin/DashboardView.vue'),
    meta: {
      requiresAuth: true
    }
  },

  //Client Page
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  // if (to.meta.requiresAuth && !store.getters['auth/token']) {
  //   next('/login');
  // } else if (to.meta.requiresUnauth && !!store.getters['auth/token']) {
  //   next('/');
  // } else {
  //   next();
  // }

  next();
});

export default router
