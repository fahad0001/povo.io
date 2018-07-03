<template>
  <div>
    <div class="logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="logo">
    </div>

    <h2 class="title">Login</h2>

    <form class="signup_validator signup-form" @submit="submit($event)">

      <div class="inputs-group">
        <input class="blueline-input"
               placeholder="Password"
               type="password"
               v-model="formValue.password"
               @blur="markTouched('formValue', 'password')"
        >

        <input class="blueline-input"
               placeholder="Password Confirmation"
               type="password"
               v-model="formValue.password_confirmation"
               @blur="markTouched('formValue', 'password_confirmation')"
        >
      </div>

      <button class="btn btn_lightblue"
              type="submit"
              v-bind:class="{ loading: loading }"
              v-bind:disabled="$v.formValue.$invalid">
        Submit
      </button>

    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { formMixin } from '../mixins/formMixin'

export default {
  name: 'LoginForm',

  props: {
    loading: Boolean
  },

  mixins: [
    formMixin
  ],

  data () {
    return {
      formValue: {
        password: '',
        password_confirmation: ''
      }
    }
  },

  validations: {
    formValue: {
      password: { required, minLength: minLength(8) },
      password_confirmation: { sameAsPassword: sameAs('password') }
    }
  },

  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submitForm', this.formValue)
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
</style>
