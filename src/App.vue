<template>
  <v-app
    dark
    id="e3"
    toolbar
  >
    <v-toolbar fixed>
      <v-toolbar-title>
        uspeak
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        label="Search..."
        single-line
        append-icon="search"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <main>
      <v-container>
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
    </main>
    <v-footer class="secondary">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="http://about.uspeak.io" target="_blank">uspeak</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      title: 'uspeak',
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
    })
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  #e3, #e3 .container {
    min-height: 700px;
    overflow: hidden;
    z-index: 0;
  }

  #e3 .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  #e3 .input-group--focused .input-group__append-icon {
    color: inherit !important;
  }
</style>
