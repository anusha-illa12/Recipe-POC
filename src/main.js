import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vSelect from 'vue-select'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'vue-select/dist/vue-select.css';
import VueConfirmDialog from 'vue-confirm-dialog'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vuex from 'vuex';
import { store } from './store/index';

import Login from './components/public/Login.vue'
import PageNotFound from './components/public/PageNotFound.vue'
import AddEditRecipe from './components/main/AddEditRecipe.vue';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.component('v-select', vSelect)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(Toast);
Vue.use(Vuex)

// Vue.forceUpdate();

const routes = [
  // { path : '', component: Login},
  // {path: '/', redirect: '/Login'}
  { path : '/login',name:'login', component: Login, alias: "/"} ,
  { path: '/register', name:'register',component:() => import(/* webpackChunkName: "Register" */ './components/public/Register.vue') },
  { path: '/reset-password', name:'reset-password',component:() => import(/* webpackChunkName: "Reset Password" */ './components/public/ResetPassword.vue') },
  { path: '/home', 
    name:'home',
    component:() => import(/* webpackChunkName: "Home" */ './components/main/Home.vue'),
    children:[
      // {
      //   path:'',
      //   name: 'search',
      //   component:() => import(/* webpackChunkName: "Search" */ './components/main/Search.vue'),
      // },
      {
        path : '/search',
        name: 'search',
        component:() => import(/* webpackChunkName: "Search" */ './components/main/Search.vue'),
        alias : ''
      },
      {
        path : '/all-recipes',
        name: 'all-recipes',
        component:() => import(/* webpackChunkName: "List" */ './components/main/AllRecipes.vue')
      },
      {
        path : '/add-edit-recipe',
        name: 'add-edit-recipe',
        component: AddEditRecipe
        // component:() => import(/* webpackChunkName: "Add/edit" */ './components/main/AddEditRecipe.vue')
      },
      {
        path : '/add-edit-recipe/:id',
        name: 'add-edit-recipe',
        component: AddEditRecipe
        // component:() => import(/* webpackChunkName: "Add/edit" */ './components/main/AddEditRecipe.vue')
      },
      {
        path : '/fav-recipes',
        name: 'favourite',
        component:() => import(/* webpackChunkName: "Favourites" */ './components/main/FavRecipes.vue')
      },
      {
        path : '/profile',
        name: 'profile',
        component:() => import(/* webpackChunkName: "Profile" */ './components/main/Profile.vue')
      }
    ],
    alias:''
  },
  { path: '/:notFound(.*)', component: PageNotFound}
 ]
 const router = new VueRouter({
  routes
 })
 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
