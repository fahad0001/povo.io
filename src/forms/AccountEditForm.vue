<template>
  <div class="account-edit">

    <form class="signup_validator signup-form account-edit__form">

      <div class="inputs-group">
        <div class="avatar-upload-wrapper">
          <vue-dropzone ref="avatarDropzone" id="avatarDropzone" :options="dropzoneOptions" v-on:vdropzone-sending="sendingEvent">
          </vue-dropzone>
          <!-- <div class='avatar' :style="`background-image: url(${ avatar })`"> </div> -->
        </div>

        <input class="blueline-input"
               placeholder="Full Name"
               type="text"
               v-model="formValue.name"
               @blur="markTouched('formValue', 'name')"
        >

      </div>

      <button class="btn btn_lightblue"
              type="submit"
              @click="submitForm($event)"
              v-bind:class="{ loading: loading }"
              v-bind:disabled="$v.formValue.$invalid"
      >
        Submit
      </button>

    </form>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import { required, minLength } from 'vuelidate/lib/validators'
import { formMixin } from '../mixins/formMixin'

export default {
  name: 'AccountEditForm',

  components: {
    vueDropzone: vue2Dropzone
  },

  props: {
    loading: Boolean,
    currentUser: Object
  },

  mixins: [
    formMixin
  ],

  data () {
    return {
      avatar: this.currentUser.avatar || require('../assets/img/no-avatar.jpg'),
      formValue: {
        id: this.currentUser.id,
        name: this.currentUser.name
      },

      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 8,
        headers: {}
      }
    }
  },

  validations: {
    formValue: {
      name: { required, minLength: minLength(3) }
    }
  },

  watch: {
    currentUser (oldVal, newVal) {
      this.formValue.id = newVal.id
      this.formValue.name = newVal.name
    }
  },

  methods: {
    getHeaders () {
      let headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
      }

      headers['auth-token'] = localStorage.getItem('token')
      headers['access-token'] = localStorage.getItem('token')
      headers['uid'] = localStorage.getItem('uid')
      headers['client'] = localStorage.getItem('client')
      headers['token-type'] = 'Bearer'

      return headers
    },

    sendingEvent (file, xhr, formData) {
      this.formValue['image'] = file
    },

    submitForm (event) {
      event.preventDefault()
      this.$emit('submit-form', this.formValue)
    }
  },

  created () {
    this.dropzoneOptions.headers = this.getHeaders()
  }
}
</script>
<style lang="scss" scoped>
  .account-edit {
    &__form {
      // max-width: 500px;
    }
  }

  .avatar-upload-wrapper {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    margin-bottom: 10px;

    .avatar {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-size: cover;
      background-position: center;
    }
  }
</style>
<style lang='scss'>
  #avatarDropzone {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    z-index: 1;
    background: transparent;
    .dz-message {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
    }
    .dz-details, .dz-success-mark {
      display: none;
    }
    .dz-preview {
      position: absolute;
      pointer-events: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      min-height: 0;
      margin: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
</style>
