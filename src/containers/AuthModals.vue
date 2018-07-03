<template>
    <div>
      <transition-group name="fade">
        <modal-wrapper v-show="signUpModal" v-on:close-click="closeAllModals" v-cloak :key="0">
          <signup-modal v-on:on-user-logged-in="handleUserSignedIn"></signup-modal>
        </modal-wrapper>

        <modal-wrapper v-show="loginModal" v-on:close-click="closeAllModals" v-cloak :key="1">
          <login-modal
            v-on:on-user-logged-in="handleUserSignedIn"
            v-on:on-forgot-password-btn-click="toggleResetPasswordModal(true)"
          ></login-modal>
        </modal-wrapper>

        <modal-wrapper v-show="showAfterSignUpModal" v-on:close-click="closeAllModals" v-cloak :key="2">
          <div class="default-modal-container">
            <h1 class="modal-message">An email with an account activation link has been sent to your email address.</h1>
          </div>
        </modal-wrapper>

        <modal-wrapper v-show="afterResetModal" v-on:close-click="closeAllModals" v-cloak :key="3">
          <div class="default-modal-container">
            <h1 class="modal-message">An email with instructions has been sent to your email address.</h1>
          </div>
        </modal-wrapper>

        <modal-wrapper v-show="resetPasswordModal" v-on:close-click="closeAllModals" v-cloak :key="4">
          <reset-password-modal
            v-on:on-reset-btn-click="toggleResetPasswordModal(false, true)"
          ></reset-password-modal>
        </modal-wrapper>
      </transition-group>
    </div>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper'

import SignupModal from '@/containers/SignupModal'
import LoginModal from '@/containers/LoginModal'
import ResetPasswordModal from '@/containers/ResetPasswordModal'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AuthModals',
  components: {
    ModalWrapper,
    SignupModal,
    LoginModal,
    ResetPasswordModal
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'signUpModal',
      'afterSignUpModal',
      'resetPasswordModal',
      'contactModal',
      'loggedIn',
      'afterSignUpModal',
      'afterResetModal'
    ]),
    ...mapState({
      showAfterSignUpModal: state => state.user.showAfterSignUpModal
    })
  },

  watch: {
  },

  methods: {
    closeAllModals () {
      this.$store.commit('showAfterSignUpModal', false)
      this.$store.commit('closeAllModals')
    },

    handleUserSignedIn () {
      this.closeAllModals()
    },

    toggleResetPasswordModal (state, isAfter) {
      this.closeAllModals()
      setTimeout(() => {
        this.$store.commit('resetPasswordModal', state)
        if (isAfter) {
          this.$store.commit('resetPasswordModal', false)
          this.$store.commit('afterResetModal', true)
        }
      }, 200)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
