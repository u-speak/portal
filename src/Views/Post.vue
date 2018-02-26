<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>

<template>
  <v-layout row>
    <v-flex md8 offset-md2 xs12>
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
        <v-card-text class="success" v-if="keyid">
            <span>Signed by: <v-avatar v-if="picture"><img :src="picture"></v-avatar> <a :href="`https://keybase.io/${this.keyid}`" target="_blank" style="color:white">{{ keyid }}</a></span>
        </v-card-text>
      </v-card>
    </v-flex>
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
        post: null,
        keyid: '',
        picture: '',
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
    computed: {
      niceDate () {
        if (this.post) {
          return moment.unix(this.post.date).format('LLLL')
        } else {
          return ''
        }
      },
      mdContent () {
        let md = ''
        if (this.post) {
          try {
            md = openpgp.cleartext.readArmored(this.post.content).text
          } catch (e) {
            md = this.post.content
          }
        }
        return md
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
            if (this.post.signature !== '' && this.post.public_key !== '') {
              this.options = {
                message: openpgp.cleartext.readArmored(this.post.content),
                signature: openpgp.signature.readArmored(this.post.signature),
                publicKeys: openpgp.key.readArmored(this.post.public_key).keys
              }
              var that = this
              openpgp.verify(this.options).then(function (verified) {
                that.validity = verified.signatures[0].valid
                if (that.validity) {
                  that.$http.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${verified.signatures[0].keyid.toHex()}&fields=basics,pictures`).then((res) => {
                    if (res.body.them[0]) {
                      that.keyid = res.body.them[0].basics.username_cased
                      if (res.body.them[0].pictures.primary.url) {
                        that.picture = res.body.them[0].pictures.primary.url
                      }
                    } else {
                      that.keyid = verified.signatures[0].keyid.toHex()
                    }
                  })
                }
              })
            }
          }
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
