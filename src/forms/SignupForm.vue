<template>
  <div>
    <div class="logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="logo">
    </div>

    <h2 class="title">Sign up and start earning points</h2>

    <form class="signup_validator signup-form" @submit="submit($event)">

      <div class="inputs-group">

        <input type="text"
               class="blueline-input"
               placeholder="Name"
               v-model="formValue.name"
               @blur="markTouched('formValue', 'name')"
        >

        <input type="email"
               class="blueline-input"
               placeholder="Email"
               v-model="formValue.email"
               @blur="markTouched('formValue', 'email')"
        >

        <input class="blueline-input"
               placeholder="Password"
               type="password"
               v-model="formValue.password"
               @blur="markTouched('formValue', 'password')"
        >
      </div>


      <loader v-if='loading'></loader>
      <button class="btn btn_lightblue"
              type="submit"
              v-bind:class="{ loading: loading }"
              v-else
              v-bind:disabled="$v.formValue.$invalid">
        Continue
      </button>

    </form>

    <div class="separator">
      <div class="separator__line"></div>
      <div class="separator__text">or</div>
      <div class="separator__line"></div>
    </div>

    <div class="signup-social">
      <button class="btn btn_blue btn__full-size" @click="socmediaClick('facebook')">Sign up with Facebook</button>
      <button class="btn btn_red btn__full-size" @click="socmediaClick('google')">Sign up with Google+</button>
    </div>

    <div class="sign-in">
      <span class="sign-in__span">Already registered?</span>
      <a href="#" class="sign-in__link hover-link" @click='footerBtnClick'>Sign in</a>
    </div>

  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { formMixin } from '../mixins/formMixin'

import Loader from '@/components/shared/Loader'

export default {
  name: 'SignupForm',

  props: {
    loading: Boolean
  },

  mixins: [
    formMixin
  ],

  components: {
    Loader
  },

  data () {
    return {
      formValue: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  validations: {
    formValue: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },

  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submitForm', this.formValue)
    },

    socmediaClick (provider) {
      this.$emit('socmediaBtnClick', provider)
    },

    footerBtnClick () {
      this.$emit('on-footer-btn-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo-container {
    margin-bottom: 12px;
    text-align: center;
  }

  .logo {
    width: 77px;
    height: auto;
  }

  .title {
    margin-bottom: 13px;
    text-align: center;
    color: $gray;
  }

  .sign-in {
    text-align: center;
  }
</style>
