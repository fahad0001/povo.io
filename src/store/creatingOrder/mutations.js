import Vue from 'vue'

export const creatingOrderMutations = {
  setOrder (state, payload) {
    Vue.set(state, 'address_id', payload.address.id)
  },

  dropCreatingOrder (state) {
    for (let f in state) {
      Vue.delete(state, f)
    }
    Vue.set(state, 'good_ids', [])
    Vue.set(state, 'goods', new Set())
    Vue.set(state, 'address_id', null)
  }
}
