import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
        },
        {
          path: 'security',
          name: 'security',
          component: () => import('../views/SecurityView.vue'),
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('../views/NotificationsView.vue'),
        },
        {
          path: 'activity',
          name: 'activity',
          component: () => import('../views/ActivityView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
