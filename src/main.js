import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import "./assets/css/bootstrap.min.css"
import moment from "moment"

console.log(moment);

Vue.use(VueRouter);

//import my components
import Maincontent from './components/Maincontent.vue'
import Navigation from './components/Navigation.vue'
import About from './components/About.vue'


//define your routes
const routes = [
	{ path: '/', component: Maincontent },
	{ path: '/about', component: About }
]

const router = new VueRouter({
  routes
})

new Vue({
  //define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the Vue instance
  router
}).$mount('#app')//mount the router on the app
