<style></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="post">
      <h3>{{ post.public_key }}</h3>
      <h6>Created: {{ post.date }}</h6>
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
    methods: {
      fetch () {
        this.$http.get('https://127.0.0.1:3000/api/v1/chains/post/' + this.$route.params.hash).then((res) => {
          this.post = res.body
        })
      }
    }
  }
</script>
