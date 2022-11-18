import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Upload from '../views/Upload.vue'
import Register from '../views/Register.vue'
import Recap from '../views/Recap.vue'

const routes = [
    {
      path: '/',
      component: Login,
      name: 'Login'
    },  
    {
      path: '/register',
      component: Register,
      name: 'Register'
    },  
    {
      path: '/upload',
      component: Upload,
      name: 'Upload'
    },  
    {
      path: '/recap',
      component: Recap,
      name: 'Recap'
    }   
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
