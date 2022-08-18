import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "LoginView" */'../views/LoginView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/create-account',
    name: 'CreateAccountView',
    component: () => import(/* webpackChunkName: "CreateAccount" */'../views/CreateAccountView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/message',
    name: 'ChatView',
    component: () => import(/* webpackChunkName: "ChatView" */'../views/ChatView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'SettingsView',
    component: () => import(/* webpackChunkName: "SettingsView" */'../views/SettingsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/people',
    name: 'PeopleView',
    component: () => import(/* webpackChunkName: "PeopleView" */'../views/PeopleView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-posts',
    name: 'MyPostsView',
    component: () => import(/* webpackChunkName: "MyPostsView" */'../views/MyPostsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'ProfileView',
    component: () => import(/* webpackChunkName: "ProfileView" */'../views/ProfileView.vue'),
    props:true,
    meta: {
      requiresAuth: true
    }
  },
  //404 redirect
  {
    path:'/:catchall(.*)',
    name:'Error404View',
    component: () => import(/* webpackChunkName: "Error404" */ '../views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !localStorage.getItem('token')) {
    next('/login')
  } else if (requiresGuest && localStorage.getItem('token')) {
    next('/')
  } else {
    next()
  }
})



export default router
