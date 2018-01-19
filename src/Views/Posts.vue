<style>
.my-3 {
  min-height: 31em;
  max-height: 31em;
}
</style>

<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center>
      <v-flex v-bind="{ [`xs${scaling}`]: true}" v-for="post in posts" :key="post.hash">
        <v-card title class="my-3" hover v-on:click.native="readPost(post)">
          <v-card-media class="white--text" height="190px" :src="'https://picsum.photos/573/190/?random&hash='+post.hash">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex align-end flexbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <h3 class="headline mb-0">{{ title(post) }}</h3>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="accent" v-on:click.native="readPost(post)">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as openpgp from 'openpgp'
  import * as matter from 'gray-matter'

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
    computed: {
      scaling () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 12
          case 'sm': return 6
          case 'md': return 4
          case 'lg': return 3
          case 'xl': return 2
        }
      }
    },
    methods: {
      ...mapActions(['notify']),
      fetch () {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/chains/post`).then((res) => {
          this.posts = res.body.results
        }, (err) => {
          if (err.body.message === 'Chain Validation Failed') {
            this.$bus.$emit('error', 'CVF')
          } else {
            this.notify({ msg: err.body.message, show: true })
          }
        })
      },
      title (post) {
        let m = matter(this.content(post))
        if (m.data.title) {
          return m.data.title
        }
        return 'Untitled Post'
      },
      content (post) {
        let t = ''
        try {
          t = openpgp.cleartext.readArmored(post.content).text
        } catch (e) {
          t = post.content
        }
        return t
      },
      readPost (post) {
        if (!post.hash) {
          return
        }
        this.$router.push({ name: 'post', params: { bubblebabble: post.bubblebabble } })
      },
      search (text) {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/search?q=${text}`).then((res) => {
          this.posts = res.body.results
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
