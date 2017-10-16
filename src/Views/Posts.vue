<style></style>

<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs4 v-for="post in posts" :key="post.title">
        <v-card class="my-3" hover>
          <v-card-media class="white--text" height="190px" :src="post.imgUrl">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex align-end flexbox>
                  <span class="headline">{{ post.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>{{ post.content }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'posts',
    data () {
      return {
        posts: [
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' },
          { title: 'Fusce ullamcorper tellus sed maximus', content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna. Mauris aliquet elit rutrum lorem fermentum, id lobortis arcu facilisis. Mauris ut justo magna. Vivamus euismod fringilla. ', imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg' }
        ]
      }
    }
  }
</script>
