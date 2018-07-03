import Vue from 'vue'

export const categoriesMutations = {
  setCategoriesList (state, payload) {
    payload.forEach(poll => {
      Vue.set(state, poll.id, poll)
    })
  },

  deleteCategoriesList (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
  }
}
