<style></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="post">
      <h6>Created: {{ niceDate }}</h6>
      <vue-markdown :source="niceContent" :anchor-attributes="anchorAttrs"></vue-markdown>
      <v-card v-if="keyid">
        <v-card-row class="blue darken-1">
          <v-card-title>
            <span class="white--text">Signed by: {{ keyid }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import moment from 'moment'
  import * as openpgp from 'openpgp'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'post',
    data () {
      return {
        post: null,
        keyid: '',
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
        return moment.unix(this.post.date).format('LLLL')
      },
      niceContent () {
        try {
          return openpgp.cleartext.readArmored(this.post.content).text
        } catch (e) {
          return this.post.content
        }
      }
    },
    methods: {
      ...mapActions(['notify']),
      fetch () {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/chains/post/${this.$route.params.bubblebabble}`).then((res) => {
          this.post = res.body
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
                that.$http.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${verified.signatures[0].keyid.toHex()}&fields=basics`).then((res) => {
                  if (res.body.them[0]) {
                    that.keyid = res.body.them[0].basics.username
                  } else {
                    that.keyid = verified.signatures[0].keyid.toHex()
                  }
                })
              }
            })
          }
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
