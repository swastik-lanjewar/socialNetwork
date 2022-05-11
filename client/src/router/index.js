import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/create-account',
    name: 'CreateAccountView',
    component: () => import('../views/CreateAccountView.vue')
  },
  //404 redirect
  {
    path:'/:catchall(.*)',
    name:'Error404View',
    component: () => import('../views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
