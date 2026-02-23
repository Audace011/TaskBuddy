import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../modules/auth/AuthStore'

import DashboardView from '../modules/dashboard/DashboardView.vue'
import TodoView from '../modules/dashboard/TodoView.vue'
import InProgressView from '../modules/dashboard/InProgressView.vue'
import CompletedView from '../modules/dashboard/CompletedView.vue'
import LoginView from '../modules/auth/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/todo',
    name: 'Todo',
    component: TodoView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/inprogress',
    name: 'InProgress',
    component: InProgressView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/done',
    name: 'Completed',
    component: CompletedView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' }
  }
})

export default router
