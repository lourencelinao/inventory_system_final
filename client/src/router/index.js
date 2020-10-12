import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue' //Home
import Dashboard from '../views/Dashboard.vue'
import Inventory from '../views/Inventory.vue'
import ItemCreate from '../views/Item/ItemCreate.vue'
import ItemMain from '../views/Item/ItemMain.vue'
import ItemEdit from '../views/Item/ItemEdit.vue'
import Order from '../views/Order.vue'
import OrderMain from '../views/Order/OrderMain.vue'
import * as firebase from "firebase/app"
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
    meta: { loginAuthenticated : true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/inventory',
    component: Inventory,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: ItemMain
      },
      {
        path: 'create',
        component: ItemCreate
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: ItemEdit
      }
    ]
  },
  {
    path: '/order',
    component: Order,
    children: [
      {
        path: '',
        component: OrderMain 
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loginAuthenticated = to.matched.some(record => record.meta.loginAuthenticated)
  const userAuthenticated = firebase.auth().currentUser

  if(requiresAuth && !userAuthenticated) { // will redirect to login if user tries to access protected routes
    next('/')
  }else if(loginAuthenticated && userAuthenticated) { // will redirect to dashboard when an authenticated user tries to access login page 
    next('/dashboard')
  }else{ //will proceed to the protected route since the user is authenticated
    next()
  }
})

export default router
