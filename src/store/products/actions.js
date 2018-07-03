import httpService from '../http.service'

export const productsActions = {
  getProductsList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService.get('/items/')
        .then(res => {
          commit('setProductsList', res.data)
          resolve(res.data)
        })
    })
  },

  loadMoreProducts ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get(`/items?page=${payload}`)
        .then(res => {
          commit('setProductsList', res.data)
          resolve(res.data)
        })
    })
  },

  searchProducts ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get(`/items?search=${payload}`)
        .then(res => {
          commit('setNewProductsList', res.data)
          resolve(res.data)
        })
    })
  },

  getProductsByCategoryId ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get(`/items?category_id=${payload}`)
        .then(res => {
          commit('setNewProductsList', res.data)
          resolve(res.data)
        })
    })
  },

  getProductById ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get('/items/' + payload)
        .then(res => {
          console.log('here')
          commit('setProduct', res.data)
          resolve(res.data)
        })
    })
  }
}
