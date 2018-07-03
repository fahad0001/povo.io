export const modalsGetters = {
  loginModal: state => {
    return state.showLoginModal
  },
  signUpModal: state => {
    return state.showSignUpModal
  },
  resetPasswordModal: state => {
    return state.showResetPasswordModal
  },
  afterResetModal: state => {
    return state.showAfterResetModal
  },
  afterSignUpModal: state => {
    return state.showAfterSignUpModal
  },
  contactModal: state => {
    return state.showContactModal
  }
}
