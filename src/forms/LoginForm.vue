<template>
  <div>
    <div class="logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="logo">
    </div>

    <h2 class="title">Login</h2>

    <div class="errors">
      <span class="error" v-if="checkError('formValue', 'email')">Email required</span>

      <span class="error" v-if="checkError('formValue', 'password')">Password required</span>
    </div>

    <form class="signup_validator signup-form" @submit="submit($event)">

      <div class="inputs-group">
        <input type="email"
               class="blueline-input"
               :class="{'invalid': checkError('formValue', 'email')}"
               placeholder="Email"
               v-model="formValue.email"
               @blur="markTouched('formValue', 'email')"
        >

        <input class="blueline-input"
               :class="{'invalid': checkError('formValue', 'password')}"
               placeholder="Password"
               type="password"
               v-model="formValue.password"
               @blur="markTouched('formValue', 'password')"
        >
        <a href="#" class="forgot-link " @click='resetPasswordBtnClick'>Forgot password?</a>
      </div>

      <loader v-if='loading'></loader>
      <button class="btn btn_lightblue"
              type="submit"
              v-else
              v-bind:class="{ loading: loading }"
              v-bind:disabled="$v.formValue.$invalid">
        Log in
      </button>

    </form>

    <div class="separator">
      <div class="separator__line"></div>
      <div class="separator__text">or</div>
      <div class="separator__line"></div>
    </div>

    <div class="signup-social">
      <button class="btn btn_blue btn__full-size" @click="socmediaClick('facebook')">Sign in with Facebook</button>
      <button class="btn btn_red btn__full-size" @click="socmediaClick('google')">Sign in with Google+</button>
    </div>

    <div class="sign-in">
      <span class="sign-in__span">Don't have an account?</span>
      <a href="#" class="sign-in__link hover-link" @click='footerBtnClick'>Sign up</a>
    </div>

  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { formMixin } from '../mixins/formMixin'

import Loader from '@/components/shared/Loader'

export default {
  name: 'LoginForm',

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
        email: '',
        password: ''
      }
    }
  },

  validations: {
    formValue: {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },

  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submitForm', this.formValue)
    },

    footerBtnClick () {
      this.$emit('on-footer-btn-click')
    },

    resetPasswordBtnClick () {
      this.$emit('on-forgot-password-btn-click')
    },

    socmediaClick (provider) {
      this.$emit('socmediaBtnClick', provider)
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
    margin-bottom: 8px;
    text-align: center;
    color: $gray;
  }

  .errors {
    height: 19px;
  }

  .error {
    margin-bottom: 5px;
  }

  .forgot-link {
    margin-left: 4px;
    color: $gray-light;
    font-size: 13px;
    transition: $base-animation-duration;
    cursor: pointer;

    &:hover {
      color: $gray;
    }
  }

  .sign-in {
    margin-top: 30px;
    text-align: center;
  }
</style>
