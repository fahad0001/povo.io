<template>
  <div class="signup default-modal-container" id="sign-up">
    <SignupForm
      v-on:on-footer-btn-click="footerBtnClick"
      :loading="user.loading"
      @submitForm="submit($event)"
      v-on:socmediaBtnClick="loginViaOmniauth($event)"
    ></SignupForm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SignupForm from '@/forms/SignupForm'

import { url } from '../data/http'
var Auth = require('j-toker')

export default {
  name: 'SignupModal',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  components: {
    SignupForm
  },

  methods: {
    submit (payload) {
      this.$store.dispatch('signUp', payload)
        .then(res => {
          this.$router.push('/')
        })
    },

    footerBtnClick () {
      this.$store.commit('closeAllModals')
      setTimeout(() => { this.$store.commit('loginModal', true) }, 200)
    },

    loginViaOmniauth (payload) {
      Auth.oAuthSignIn({provider: payload})
        .then(res => {
          this.$store.dispatch('setUserOAuth', res)
            .then(res => {
              this.$emit('on-user-logged-in', true)
              this.$router.push('/')
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
      // if (mutation.type === 'setUser') {
      if (mutation.type === 'setCurrentUser') {
        this.$emit('on-user-logged-in', true)
      }
    })
  }
}
</script>
