<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>

<template>
  <v-layout row>
    <v-flex md8 offset-md2 xs12>
      <v-card class="card--flex-toolbar">
        <v-toolbar card color="white" prominent>
          <v-toolbar-title>Create a post</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            name="post_title"
            v-model="postTitle"
            label="Post Title"
            :rules="[(v) => v.length <= 100 || 'Max 100 characters']"
            :counter="100"
          ></v-text-field>
          <v-text-field
            name="post_image"
            v-model="postImage"
            label="Post Image Link"
          ></v-text-field>
          <mavon-editor
            v-model="mdContent"
            language="en"
            ref="md"
            @imgAdd="$imgAdd"
          ></mavon-editor>
          <v-text-field
            name="privatekey"
            label="(Optional) ASCII-armored Private Key"
            v-model="private_key"
            multi-line
            prepend-icon="fingerprint"
          ></v-text-field>
          <v-text-field
            name="passphrase"
            label="Passphrase"
            v-model="passphrase"
            :append-icon="password_visible ? 'visibility_off' : 'visibility'"
            :append-icon-cb="() => (password_visible = !password_visible)"
            :type="password_visible ? 'text' : 'password'"
            prepend-icon="vpn_key"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="accent" v-on:click.native="create">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'
  import base64js from 'base64-js'
  import blake from 'blakejs'
  import * as openpgp from 'openpgp'
  import * as matter from 'gray-matter'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'createpost',
    data () {
      return {
        password_visible: true,
        post: {
          nonce: 0,
          validates: [],
          hash: '',
          content: '',
          type: 'post',
          data: {
            content: '',
            pubkey: '',
            signature: '',
            date: 0
          }
        },
        private_key: '',
        passphrase: '',
        mdContent: '',
        postTitle: '',
        postImage: '',
        anchorAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
        }
      }
    },
    components: {
      VueMarkdown
    },
    computed: {
      nice_content () {
        return matter.stringify(this.mdContent, {title: this.postTitle, image: this.postImage})
      }
    },
    methods: {
      ...mapActions(['notify']),
      sign () {
        openpgp.config.show_version = false
        let that = this
        return new Promise((resolve, reject) => {
          var privKeyObj = openpgp.key.readArmored(that.private_key).keys[0]
          privKeyObj.decrypt(that.passphrase)
          that.post.data.pubkey = privKeyObj.toPublic().armor().replace(/\r/g, '')
          var publicKey = openpgp.key.readArmored(that.post.data.pubkey).keys[0]
          publicKey.getKeyIds().forEach((k) => { console.log(k.toHex()) })
          var signOpt = {
            data: that.nice_content,
            privateKeys: privKeyObj,
            detached: true
          }
          var verifyOpt = {
            publicKeys: publicKey
          }
          openpgp.sign(signOpt).then(function (signed) {
            verifyOpt.message = new openpgp.cleartext.CleartextMessage(that.nice_content)
            verifyOpt.signature = openpgp.signature.readArmored(signed.signature)
            that.post.data.signature = signed.signature.replace(/\r/g, '')
            openpgp.verify(verifyOpt).then(function (verified) {
              that.post.data.content = verified.data
              let sig = verified.signatures[0].signature.packets[0]
              let sigdata = openpgp.util.concatUint8Array([sig.signatureData, sig.unhashedSubpackets, sig.signedHashValue, sig.signature])
              console.log(sigdata)
              let sighash = base64js.fromByteArray(blake.blake2b(sigdata, null, 32)).replace(/\+/g, '-').replace(/\//g, '_')
              resolve({keyid: publicKey.getKeyIds()[0], sighash: sighash})
            })
          })
        })
      },
      create () {
        this.$http.get(`https://${this.$store.getters.node}/api/v1/status`).then((res) => {
          this.post.validates = res.body.recomendations
          this.post.data.date = moment().unix()
          if (this.private_key !== '') {
            return this.sign()
          }
        }).then((ret) => {
          let cstr = `C${this.post.data.content}D${this.post.data.date}P${ret.keyid.toHex().toUpperCase()}S${ret.sighash}`
          console.log(cstr)
          this.post.content = base64js.fromByteArray(blake.blake2b(cstr, null, 32)).replace(/\+/g, '-').replace(/\//g, '_')
          let h
          while (true) {
            let hstr = `C${this.post.content}N${this.post.nonce}T${this.post.type}`
            this.post.validates.forEach(function (v) { hstr += `V${v}` })
            h = blake.blake2b(hstr, null, 32)
            console.log(h)
            if (h[0] === 0) {
              break
            }
            this.post.nonce++
          }
          this.post.hash = base64js.fromByteArray(h).replace(/\+/g, '-').replace(/\//g, '_')

          this.$http.post(`https://${this.$store.getters.node}/api/v1/tangle/${this.post.type}`, this.post).then((res) => {
            this.$router.push({path: '/'})
          }, (err) => {
            this.notify({ msg: err.body.message, show: true })
          })
        }).catch((err) => {
          this.notify({ msg: err.body.message, show: true })
        })
      },
      createImage (file) {
        return new Promise((resolve) => {
          let reader = new FileReader()

          reader.onload = (e) => {
            resolve(e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length).replace(/\+/g, '-').replace(/\//g, '_'))
          }
          reader.readAsDataURL(file)
        })
      },
      $imgAdd (pos, $file) {
        // TODO Tangle
      }
    }
  }
</script>
