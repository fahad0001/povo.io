export const userGetters = {

  loggedIn: state => {
    if (state.token.length) {
      return true
    }
    return false
  },
  verified: state => {
    return state.verified
  },
  currentUser: state => {
    return state
  },

  token: state => {
    return state.token
  },

  userPollsLoader: state => {
    return state.showUserPollsLoader
  }
}
