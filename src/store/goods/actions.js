// import notificationService from '../../services/notification.service'
import httpService from '../http.service'

export const goodsActions = {
  createGood ({commit, state}, data) {
    data.item_ids = data.selectedProducts.map((product) => product.id)
    httpService.setToken()
    httpService.post('/goods', {good: data})
      .then(res => {
        commit('goodCreateSuccess')
      })
      .catch(e => {
        if (e.response) {
          e.response.data.errors.map(message => httpService.handleError(message))
        }
      })
  },

  getGoodsList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService
        .get('/goods/')
        .then(res => {
          commit('setGoodsList', res.data)
          resolve(res.data)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
            reject()
          }
        })
    })
  },

  searchGoods ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get(`/goods?search=${payload}`)
        .then(res => {
          commit('setNewGoodsList', res.data)
          resolve(res.data)
        })
    })
  },

  getGoodsByCategoryId ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get(`/goods?category_id=${payload}`)
        .then(res => {
          commit('setNewGoodsList', res.data)
          resolve(res.data)
        })
    })
  },

  getGoodById ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get('/goods/' + payload)
        .then(res => {
          commit('setGood', res.data)
          resolve(res.data)
        }).catch(e => {
          console.log(e)
        })
    })
  }
}
