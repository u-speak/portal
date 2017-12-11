<style></style>

<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div>
        <h5>Create Post</h5>
      </div>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            name="content"
            label="Content"
            v-model="nice_content"
            multi-line
            dark
            prepend-icon="create"
          ></v-text-field>
          <v-text-field
            name="privatekey"
            label="(Optional) ASCII-armored Private Key"
            v-model="private_key"
            multi-line
            dark
            prepend-icon="assignment"
          ></v-text-field>
          <v-text-field
            name="passphrase"
            label="Passphrase"
            v-model="passphrase"
            multi-line
            dark
            prepend-icon="assignment"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <div>
            <h6>Preview</h6>
            <vue-markdown :content="nice_content" :anchor-attributes="anchorAttrs"></vue-markdown>
          </div>
        </v-flex>
      </v-layout>
      <div>
        <v-btn
          info
          v-on:click.native="create"
          small
        >
          Submit
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'
  import * as sha256 from 'crypto-js/sha256'
  import * as base64Enc from 'crypto-js/enc-base64'
  import * as openpgp from 'openpgp'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'createpost',
    data () {
      return {
        post: {
          hash: '',
          previous_hash: '',
          date: 0,
          type: 'post',
          content: '',
          public_key: '',
          signature: '',
          nonce: 0
        },
        private_key: '',
        passphrase: '',
        nice_content: '',
        anchorAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
        }
      }
    },
    components: {
      VueMarkdown
    },
    methods: {
      ...mapActions(['notify']),
      sign () {
        var that = this
        return new Promise((resolve, reject) => {
          var privKeyObj = openpgp.key.readArmored(that.private_key).keys[0]
          privKeyObj.decrypt(that.passphrase)
          that.post.public_key = privKeyObj.toPublic().armor()
          var options = {
            data: that.nice_content,
            privateKeys: privKeyObj,
            detached: true
          }
          openpgp.sign(options).then(function (signed) {
            that.post.content = signed.data
            that.post.signature = signed.signature
            resolve()
          })
        })
      },
      create () {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/status`).then((res) => {
          this.post.previous_hash = res.body.chains.post.last_hash
          this.post.date = moment().unix()
          if (this.private_key !== '') {
            return this.sign()
          }
          this.post.content = this.nice_content
        }).then(() => {
          console.log(this.post.signature)
          this.post.hash = sha256('C' + this.post.content + 'T' + this.post.type + 'S' + this.post.signature + 'P' + this.post.public_key + 'D' + this.post.date + 'N' + this.post.nonce + 'PREV' + this.post.previous_hash.toString(base64Enc)).toString(base64Enc).replace(/\+/g, '-').replace(/\//g, '_')
          this.$http.post(`https://${this.$store.getters.node}/api/v1/chains/post`, this.post).then((res) => {
            this.$router.push({path: '/'})
          }, (err) => {
            this.notify({ msg: err.body.message, show: true })
          })
        }).catch((err) => {
          console.log(err)
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
