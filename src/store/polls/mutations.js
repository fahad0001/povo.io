import Vue from 'vue'

export const pollsMutations = {
  setPollsList (state, payload) {
    payload.forEach((poll, index) => {
      Vue.set(state, poll.id, poll)
    })
  },

  deletePollsList (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
  },

  setPoll (state, payload) {
    Vue.set(state, payload.id, payload)
  }
}
