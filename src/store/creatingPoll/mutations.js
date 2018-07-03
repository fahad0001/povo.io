import Vue from 'vue'

export const creatingPollMutations = {
  setPollTitle (state, title) {
    Vue.set(state, 'title', title)
  },

  setPollDescription (state, description) {
    Vue.set(state, 'description', description)
  },

  setPollExpires (state, expires) {
    Vue.set(state, 'expires', expires)
  },

  setVotesNumber (state, votesNumber) {
    Vue.set(state, 'votes_limit', votesNumber)
  },

  addToSelectedProducts (state, selectedProduct) {
    state.selectedProducts.push(selectedProduct)
  },

  setSelectedProducts (state, payload) {
    Vue.set(state, 'selectedProducts', payload)
  },

  pollCreateSuccess (state, payload) {},

  deleteCreatingPoll (state) {
    Vue.set(state, 'title', '')
    Vue.set(state, 'description', '')
    Vue.set(state, 'selectedProducts', [])
  },

  selectedProductsLoader (state, payload) {
    Vue.set(state, 'showSelectedProductsLoader', payload)
  }
}
