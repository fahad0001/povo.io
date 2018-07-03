export const creatingPollGetters = {
  productsNumber: (state) => {
    return state.productsNumber
  },

  pollExpires: (state) => {
    return state.expires
  },

  votesNumber: (state) => {
    return state.votes_limit
  },

  pollTitle: (state) => {
    return state.title
  },

  pollDescription: (state) => {
    return state.description
  },

  selectedProducts: (state) => {
    return state.selectedProducts
  },

  currentPoll: state => {
    return state
  },

  selectedProductsLoader: (state) => {
    return state.showSelectedProductsLoader
  }
}
