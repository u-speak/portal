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
            v-model="post.content"
            multi-line
            dark
            prepend-icon="create"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <div>
            <h6>Preview</h6>
            <p v-markdown="post.content"></p>
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
  import * as sha256 from 'crypto-js/sha256'
  import * as base64Enc from 'crypto-js/enc-base64'
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
        }
      }
    },
    methods: {
      create () {
        this.$http.get('https://uspeak.io:4242/api/v1/status').then((res) => {
          this.post.previous_hash = res.body.chains.post.last_hash
          this.post.date = moment().valueOf()
          this.post.hash = sha256('C' + this.post.content + 'T' + this.post.type + 'S' + this.post.signature + 'P' + this.post.public_key + 'D' + this.post.date + 'N' + this.post.nonce + 'PREV' + this.post.previous_hash.toString(base64Enc)).toString(base64Enc).replace(/\+/g, '-').replace(/\//g, '_')
          this.$http.post('https://uspeak.io:4242/api/v1/chains/post', this.post)
        })
      }
    }
  }
</script>
