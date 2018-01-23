<style>
  #btn-dial {
  }
</style>
<template>
  <v-app id="e3" toolbar>
  <div id="app">
    <page-header :extended="extendheader"></page-header>
    <v-container>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title class="headline">{{ error.title }}</v-card-title>
          <v-card-text>{{ error.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <transition appear>
      <router-view></router-view>
    </transition>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      right
      light
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="/static/img/v.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>uspeak.io</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings_ethernet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Connected to</v-list-tile-title>
            <v-list-tile-sub-title>{{ $store.getters.node }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>message</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Brought to you by</v-list-tile-title>
            <v-list-tile-sub-title>{{ $store.state.message }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-speed-dial
      color="accent"
      v-model="fab"
      bottom
      right
      fixed
      id="btn-dial"
    >
      <v-btn
        slot="activator"
        color="accent"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red darken-4"
        to="/create"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        v-on:click="drawer = !drawer"
        color="red darken-4"
      >
        <v-icon>live_help</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      v-model="show"
      v-on:input="snakerChange"
    >
      {{ msg }}
      <v-btn icon="icon" flat class="pink--text" @click.native="setShow(false)">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
  </v-app>
</template>

<script>
  import PageHeader from './PageHeader.vue'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'page-uspeak',
    data () {
      return {
        drawer: true,
        dialog: false,
        formData: null,
        data: null,
        fab: null,
        error: {
          title: '',
          text: ''
        }
      }
    },
    components: {
      PageHeader
    },
    created () {
      this.$bus.$on('error', (error) => {
        if (error === false) {
          this.dialog = false
        } else if (error === 'CVF') {
          this.error = {
            title: 'Chain validation failed',
            text: 'Looks like the node you tried to connect to has been modified! You should switch the node.'
          }
          this.dialog = true
        }
      })
    },
    computed: {
      ...mapGetters(['x', 'y', 'show', 'msg', 'timeout']),
      extendheader () {
        return this.$route.name === 'post' || this.$route.name === 'create'
      }
    },
    methods: {
      ...mapMutations(['setShow']),
      snakerChange (val) {
        // due to value doesn't when timeout
        // so we listen input event and change value
        if (val !== this.show) {
          this.setShow(val)
        }
      },
      createImage (file) {
        return new Promise((resolve) => {
          let reader = new FileReader()

          reader.onload = (e) => {
            resolve(e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length).replace(/\+/g, '-').replace(/\//g, '_'))
          }
          reader.readAsDataURL(file)
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  #e3, #e3 .container {
    overflow: hidden;
    z-index: 0;
  }

  #e3 .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  #e3 .input-group--focused .input-group__append-icon {
    color: inherit !important;
  }
</style>
