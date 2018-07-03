<template>
  <div>
    <div class="logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="logo">
    </div>

    <h2 class="title">Enter your e-mail to reset password</h2>

    <form class="signup_validator signup-form" @submit="submit($event)">

      <div class="inputs-group">
        <input type="text"
               class="blueline-input"
               placeholder="Email"
               v-model="formValue.email"
               @blur="markTouched('formValue', 'email')"
        >
      </div>

      <button class="btn btn_lightblue"
              type="submit"
              v-bind:class="{ loading: loading }"
              v-bind:disabled="$v.formValue.$invalid">
        Reset
      </button>

    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
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
        email: '',
        password: ''
      }
    }
  },

  validations: {
    formValue: {
      email: { required, email }
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
