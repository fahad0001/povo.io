import Vue from 'vue'

export const modalsMutations = {
  loginModal (state, payload) {
    Vue.set(state, 'showLoginModal', payload)
  },
  signUpModal (state, payload) {
    Vue.set(state, 'showSignUpModal', payload)
  },
  resetPasswordModal (state, payload) {
    Vue.set(state, 'showResetPasswordModal', payload)
  },
  afterSignUpModal (state, payload) {
    Vue.set(state, 'showAfterSignUpModal', payload)
  },
  afterResetModal (state, payload) {
    Vue.set(state, 'showAfterResetModal', payload)
  },
  closeAllModals (state) {
    Object.keys(state).forEach((key) => {
      Vue.set(state, key, false)
    })
  }
}
