import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import PageUspeak from './PageUspeak.vue'
const Home = resolve => require(['./Views/Home.vue'], resolve)

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
new Vue({
  router,
  template: '<PageUspeak/>',
  components: { PageUspeak }
}).$mount('#app')
