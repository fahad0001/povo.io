<template>
  <div class="signup default-modal-container" id="sign-up">
    <LoginForm
      :loading="user.loading"
      v-on:on-footer-btn-click="footerBtnClick"
      v-on:on-forgot-password-btn-click="resetPassword"
      v-on:socmediaBtnClick="loginViaOmniauth($event)"
      @submitForm="submit($event)"
    ></LoginForm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LoginForm from '@/forms/LoginForm'

import { url } from '../data/http'
var Auth = require('j-toker')

export default {
  name: 'LoginModal',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  components: {
    LoginForm
  },
  methods: {
    submit (payload) {
      this.$store.dispatch('login', payload)
        .then(res => {
          this.$router.push('/')
        })
    },

    resetPassword () {
      this.$emit('on-forgot-password-btn-click')
    },

    footerBtnClick () {
      this.$store.commit('closeAllModals')
      setTimeout(() => { this.$store.commit('signUpModal', true) }, 200)
    },

    loginViaOmniauth (payload) {
      Auth.oAuthSignIn({provider: payload})
        .then(res => {
          this.$store.dispatch('setUserOAuth', res)
            .then(res => {
              this.$emit('on-user-logged-in', true)
            })
        })
    }
  },

  mounted () {
    Auth.configure({
      apiUrl: url,
      authProviderPaths: {
        facebook: '/auth/facebook',
        google: '/auth/google'
      }
    })
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setUser') {
        this.$emit('on-user-logged-in', true)
      }
    })
  }
}
</script>
