<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>

<template>
  <v-layout row justify-center>
    <v-flex md8 xs12>
      <v-card class="card--flex-toolbar">
        <v-toolbar card color="white" prominent>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <vue-markdown :source="niceContent" :anchor-attributes="anchorAttrs"></vue-markdown>
        </v-card-text>
        <v-card-text class="info">
          <span class="white--text">Created: {{ niceDate }}</span>
        </v-card-text>
        <v-card-text class="warning">
          <span class="white--text">Site Weight: {{ weight }}</span>
        </v-card-text>
        <v-card-text class="success" v-if="url">
            <span>
              Signed by:
              <v-avatar v-if="picture">
              <img :src="picture">
              </v-avatar>
              <a :href="`${this.url}`" target="_blank" style="color:white">{{ keyid }}</a>
              <br>
              Key Fingerprint: {{ fingerprint }}
            </span>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Please enter the password for the decryption of the post:</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Decrypt</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import moment from 'moment'
  import * as openpgp from 'openpgp'
  import VueMarkdown from 'vue-markdown'
  import * as matter from 'gray-matter'

  export default {
    name: 'post',
    data () {
      return {
        dialog: false,
        mdContent: '',
        password: '',
        post: null,
        weight: 0,
        keyid: '',
        picture: '',
        url: '',
        fingerprint: '',
        anchorAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
        }
      }
    },
    components: {
      VueMarkdown
    },
    created () {
      this.fetch()
    },
    watch: {
      dialog: function (val) {
        if (val === false) {
          let armoredMessage = openpgp.message.readArmored(this.post.content)
          var decOpt = {
            password: this.password,
            message: armoredMessage
          }
          let that = this
          openpgp.decrypt(decOpt).then(function (decrypted) {
            that.mdContent = decrypted.data
          })
        }
      }
    },
    computed: {
      niceDate () {
        if (this.post) {
          return moment.unix(this.post.date).format('LLLL')
        } else {
          return ''
        }
      },
      niceContent () {
        let m = matter(this.mdContent)
        return m.content
      },
      title () {
        let m = matter(this.mdContent)
        if (m.data.title) {
          return m.data.title
        } else {
          return 'Untitled Post'
        }
      }
    },
    methods: {
      ...mapActions(['notify']),
      fetch () {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/tangle/${this.$route.params.bubblebabble}`).then((res) => {
          if (res.body.type === 'post') {
            this.post = res.body.data
            this.weight = res.body.weight
            if (this.post.signature !== '' && this.post.pubkey !== '') {
              this.options = {
                message: openpgp.message.fromText(this.post.content),
                signature: openpgp.signature.readArmored(this.post.signature),
                publicKeys: openpgp.key.readArmored(this.post.pubkey).keys[0]
              }
              var that = this
              openpgp.verify(this.options).then(function (verified) {
                that.validity = verified.signatures[0].valid
                if (that.validity) {
                  that.$http.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${verified.signatures[0].keyid.toHex()}&fields=basics,pictures`).then((res) => {
                    if (res.body.them[0]) {
                      that.url = `https://keybase.io/${res.body.them[0].basics.username_cased}`
                      that.keyid = res.body.them[0].basics.username_cased
                      if (res.body.them[0].pictures.primary.url) {
                        that.picture = res.body.them[0].pictures.primary.url
                      }
                    } else {
                      that.keyid = that.options.publicKeys.users[0].userId.userid
                      that.fingerprint = that.options.publicKeys.primaryKey.fingerprint
                      that.url = `https://pgp.mit.edu/pks/lookup?search=0x${verified.signatures[0].keyid.toHex()}`
                    }
                  })
                }
              })
            }
            this.mdContent = this.post.content
            console.log(openpgp.message.readArmored(this.post.content))
            this.dialog = true
          }
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
