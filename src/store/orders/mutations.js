import Vue from 'vue'

export const ordersMutations = {
  setOrdersList (state, payload) {
    payload.forEach(order => {
      Vue.set(state, order.id, order)
    })
  }
}
