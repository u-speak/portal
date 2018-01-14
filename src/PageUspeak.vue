<style>
  #btn-dial {
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
    <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      light
      id="btn-dial"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        onclick="document.getElementById('fileInput').click()"
      >
        <v-icon>add</v-icon>
        <input ref="fileInput" id="fileInput" style="display:none" type="file" v-on:change="test()"/>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        to="/create"
      >
        <v-icon>edit</v-icon>
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
  import * as sha256 from 'crypto-js/sha256'
  import * as base64Enc from 'crypto-js/enc-base64'
  import moment from 'moment'

  export default {
    name: 'page-uspeak',
    data () {
      return {
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
      },
      createImage (file) {
        return new Promise((resolve) => {
          let reader = new FileReader()

          reader.onload = (e) => {
            resolve(e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length).replace(/\+/g, '-').replace(/\//g, '_'))
          }
          reader.readAsDataURL(file)
        })
      },
      test () {
        let ts = moment().unix()
        this.data = new FormData()
        this.$http.get(`https://${this.$store.getters.node}/api/v1/status`).then((res) => {
          this.data.set('prevHash', res.body.chains.image.last_hash)
          this.data.set('nonce', 0)
          this.data.set('timestamp', ts)
          return this.createImage(this.$refs.fileInput.files[0])
        }).then((imb64) => {
          let hd = 'C' + imb64 + 'TimageSPD' + ts + 'N' + 0 + 'PREV' + this.data.get('prevHash')
          this.data.set('hash', sha256(hd).toString(base64Enc).replace(/\+/g, '-').replace(/\//g, '_'))
          this.data.set('image', this.$refs.fileInput.files[0])
        }).then(() => {
          this.$http.post(`https://${this.$store.getters.node}/api/v1/images`, this.data).then((res) => {
            this.$router.push({path: '/'})
          }, (err) => {
            this.notify({ msg: err.body.message, show: true })
          })
        }).catch((err) => {
          this.notify({ msg: err.body.message, show: true })
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
