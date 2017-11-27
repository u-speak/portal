<style></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="post">
      <h6>Created: {{ niceDate }}</h6>
      <v-card>
        <v-card-row class="blue darken-1">
          <v-card-title>
            <span class="white--text" v-markdown:content="post.content"></span>
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

  export default {
    name: 'post',
    data () {
      return {
        post: null
      }
    },
    created () {
      this.fetch()
    },
    computed: {
      niceDate () {
        return moment.unix(this.post.date).format('YYYY-MM-DD HH:mm')
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
            openpgp.verify(this.options).then(function (verified) {
              this.validity = verified.signatures[0].valid
              if (this.validity) {
                console.log('signed by key id ' + verified.signatures[0].keyid.toHex())
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
