import Vue from 'vue'

export const authMutations = {
  toggleAuthLoader (state, payload) {
    Vue.set(state, 'showAuthLoader', payload)
  }
}
