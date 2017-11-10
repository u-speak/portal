<style>
  #btn-add {
    margin-bottom: 3em;
  }
</style>
<template>
  <v-app dark id="e3" toolbar>
  <div id="app">
    <page-header></page-header>
    <main>
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
          <transition appear>
            <router-view></router-view>
          </transition>
        </v-container>
    </main>
    <v-btn
      id="btn-add"
      color="pink"
      fab
      bottom
      right
      fixed
      light
      to="/create"
    >
      <v-icon>add</v-icon>
    </v-btn>
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
  <v-footer app fixed>
    <div>Brought to you by: {{ $store.state.message }}</div>
    <v-spacer></v-spacer>
    <div>Connected to: {{ $store.getters.node }}</div>
  </v-footer>
  </v-app>
</template>

<script>
  import PageHeader from './PageHeader.vue'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'page-uspeak',
    data () {
      return {
        dialog: false,
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
            text: 'Looks like the node you tried to connect to has been modified! You should switch node'
          }
          this.dialog = true
        }
      })
    },
    computed: {
      ...mapGetters(['x', 'y', 'show', 'msg', 'timeout'])
    },
    methods: {
      ...mapMutations(['setShow']),
      snakerChange (val) {
        // due to value doesn't when timeout
        // so we listen input event and change value
        if (val !== this.show) {
          this.setShow(val)
        }
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
