import Vue from 'vue'

export const addressesMutations = {
  setAddressesList (state, payload) {
    payload.forEach(poll => {
      Vue.set(state, poll.id, poll)
    })
  },

  deleteAddressesList (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
  },

  setAddress (state, payload) {
    Vue.set(state, payload.id, payload)
  }
}
