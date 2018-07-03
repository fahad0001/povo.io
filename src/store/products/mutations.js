import Vue from 'vue'

export const productsMutations = {
  setProductsList (state, payload) {
    payload.forEach(product => {
      Vue.set(state, product.id, product)
    })
  },

  deleteProductsList (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
  },

  setNewProductsList (state, payload) {
    for (let f in state) {
      Vue.delete(state, f)
    }
    payload.forEach(product => {
      Vue.set(state, product.id, product)
    })
  },

  setProduct (state, payload) {
    Vue.set(state, payload.id, payload)
  }
}
