import Vue from 'vue'

export const mediaModalsMutations = {
  videoModal (state, payload) {
    Vue.set(state, 'showVideoModal', payload)
  },
  closeMediaModals (state) {
    Object.keys(state).forEach((key) => {
      Vue.set(state, key, false)
    })
  }
}
