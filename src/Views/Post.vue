<style></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="post">
      <h3>{{ post.public_key }}</h3>
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
        this.$http.get(`https://${this.$store.getters.node}/api/v1/chains/post/${this.$route.params.hash}`).then((res) => {
          this.post = res.body
        }, (err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      }
    }
  }
</script>
