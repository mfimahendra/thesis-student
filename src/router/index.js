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
  {
    path: '/admin/map',
    name: 'Admin Map',
    component: () => import('../views/admin/MapView.vue'),    
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/city',
    name: 'City',
    component: () => import('../views/admin/CityView.vue'),
    meta: {
      requiresAuth: true
    } 
  },
  {
    path: '/admin/university',
    name: 'University',
    component: () => import('../views/admin/UniversityView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/student',
    name: 'Student',
    component: () => import('../views/admin/StudentView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/student/:studentId',
    name: 'Student Details',
    component: () => import('../views/admin/StudentDetails.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/sandbox',
    name: 'Sandbox',
    component: () => import('../views/admin/SandboxView.vue'),
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
    path: '/map',
    name: 'Map',
    component: () => import('../views/MapsView.vue')
  },
  {
    path: '/form',
    name: 'Student Form',
    component: () => import('../views/FormView.vue')
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token')
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
});


export default router
