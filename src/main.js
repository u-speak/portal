import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Marked from 'marked'
import PageUspeak from './PageUspeak.vue'
const Home = resolve => require(['./Views/Home.vue'], resolve)
const Post = resolve => require(['./Views/Post.vue'], resolve)

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

Marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

Vue.directive('markdown', {
  bind (el, binding, vnode) {
    el.innerHTML = Marked(binding.value)
  },
  update (el, binding, vnode) {
    el.innerHTML = Marked(binding.value)
  }
})

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:hash',
      name: 'post',
      component: Post
    }
  ]
})
Vue.prototype.$bus = new Vue({})
new Vue({
  router,
  template: '<PageUspeak/>',
  components: { PageUspeak }
}).$mount('#app')
