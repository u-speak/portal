<style></style>

<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs4 v-for="post in posts" :key="post.hash">
        <v-card class="my-3" hover>
          <v-card-media class="white--text" height="190px" :src="'https://picsum.photos/573/190/?random&hash='+post.hash">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex align-end flexbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>{{ summarize(post) }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text" v-on:click.native="readPost(post)">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as removeMd from 'remove-markdown'

  export default {
    name: 'posts',
    data () {
      return {
        posts: []
      }
    },
    created () {
      this.fetch()
      this.$bus.$on('search', (text) => { this.search(text) })
      this.$bus.$on('refresh', this.fetch)
    },
    methods: {
      ...mapActions(['notify']),
      fetch () {
        this.$http.get('https://uspeak.io/api/v1/chains/post').then((res) => {
          this.posts = res.body.results
        }, (err) => {
          if (err.body.message === 'Chain Validation Failed') {
            this.$bus.$emit('error', 'CVF')
          } else {
            this.notify({ msg: err.body.message, show: true })
          }
        })
      },
      summarize (post) {
        return removeMd(post.content).substr(0, 80)
      },
      readPost (post) {
        if (!post.hash) {
          return
        }
        this.$router.push({ name: 'post', params: { hash: post.hash } })
      },
      search (text) {
        this.$http.get('https://uspeak.io/api/v1/search?q=' + text).then((res) => {
          this.posts = res.body.results
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
