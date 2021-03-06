import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import PageUspeak from './PageUspeak.vue'
import openpgp from 'openpgp'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const Home = resolve => require(['./Views/Home.vue'], resolve)
const Post = resolve => require(['./Views/Post.vue'], resolve)
const CreatePost = resolve => require(['./Views/CreatePost.vue'], resolve)

Vue.use(Vuetify, {
  theme: {
    primary: '#00BCD4',
    secondary: '#0097A7',
    accent: '#FF5252',
    error: '#b71c1c',
    info: '#3F51B5',
    success: '#8BC34A'
  }})
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(mavonEditor)

Vue.config.productionTip = false
openpgp.initWorker({ path: '/static/openpgp.worker.min.js' })

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:bubblebabble',
      name: 'post',
      component: Post
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    }
  ]
})

const store = new Vuex.Store({
  state: {
    node: 'uspeak.io',
    message: 'a nice person',
    snaker: {
      x: 'left',
      y: 'top',
      timeout: 3000,
      show: false,
      msg: ''
    }
  },
  getters: {
    x ({ snaker }) {
      return snaker.x
    },
    y ({ snaker }) {
      return snaker.y
    },
    timeout ({ snaker }) {
      return snaker.timeout
    },
    show ({ snaker }) {
      return snaker.show
    },
    msg ({ snaker }) {
      return snaker.msg
    },
    node ({ node }) {
      return node
    }
  },
  mutations: {
    setX ({ snaker }, x) {
      snaker.x = x
    },
    setY ({ snaker }, y) {
      snaker.y = y
    },
    setTimeout ({ snaker }, timeout) {
      snaker.timeout = timeout
    },
    setShow ({ snaker }, show) {
      snaker.show = show
    },
    inform ({ snaker }, msg) {
      snaker.msg = msg
      snaker.show = true
    },
    setNode (state, n) {
      state.node = n
    }
  },
  actions: {
    notify ({ commit }, snaker) {
      if (snaker.x) {
        commit('setX', snaker.x)
      }
      if (snaker.y) {
        commit('setY', snaker.y)
      }
      if (snaker.timeout) {
        commit('setTimeout', snaker.timeout)
      }
      if (snaker.msg) {
        commit('inform', snaker.msg)
      }
    }
  }
})

Vue.prototype.$bus = new Vue({})

new Vue({
  router,
  store,
  template: '<PageUspeak/>',
  components: { PageUspeak }
}).$mount('#app')
