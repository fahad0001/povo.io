import Vue from 'vue'

export const goodsMutations = {
  setGoodsList (state, payload) {
    payload.forEach(poll => {
      Vue.set(state, poll.id, poll)
    })
  },

  deleteGoodsList (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
  },

  setNewGoodsList (state, payload) {
    for (let f in state) {
      Vue.delete(state, f)
    }
    payload.forEach(good => {
      Vue.set(state, good.id, good)
    })
  },

  setGood (state, payload) {
    Vue.set(state, payload.id, payload)
  }
}
