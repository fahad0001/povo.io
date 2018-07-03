import Vue from 'vue'

export const userMutations = {
  enableLoading (state) {
    state.loading = true
  },

  disableLoading (state) {
    state.loading = false
  },

  setCurrentUser (state, payload) {
    const _state = Object.assign({}, state, payload)
    Vue.delete(state, 'avatar')
    Object.keys(_state).forEach((key) => {
      Vue.set(state, key, _state[key])
    })
  },

  setToken (state, payload) {
    Vue.set(state, 'token', payload)
  },

  showAfterSignUpModal (state, payload) {
    Vue.set(state, 'showAfterSignUpModal', payload)
  },

  setUserPollsList (state, payload) {
    Vue.set(state, 'polls', payload)
  },

  setUserSavedProductsList (state, payload) {
    Vue.set(state, 'savedProducts', payload)
  },

  setNewFinishedPoll (state, payload) {
    Vue.set(state, 'finishedPoll', payload)
  },
  setUserOrdersList (state, payload) {
    Vue.set(state, 'orders', payload)
  },

  userPollsLoader (state, payload) {
    Vue.set(state, 'showUserPollsLoader', payload)
  },

  toggleVoteSubmitLoader (state, payload) {
    Vue.set(state, 'showVoteSubmitLoader', payload)
  }
}
