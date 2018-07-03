import _ from 'lodash'
import httpService from '../http.service'
// import Vue from 'vue'
export const creatingOrderActions = {
  finishOrder ({commit, state}) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      let order = {
        address_id: state.address.id,
        good_ids: [...state.goods].map((good) => good.id)
      }
      httpService.post('/orders', {order: order})
        .then(res => {
          commit('orderCreateSuccess')
          resolve(res)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },

  dropCreatingOrder ({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('dropCreatingOrder')
      resolve()
    })
  },

  addAddressToOrder  ({commit, state}, address) {
    state.address = address
  },

  setOrderGoods ({commit, state}, goods) {
    state.goods = goods
  },

  addGoodToOrder ({commit, state}, good) {
    return new Promise((resolve, reject) => {
      state.goods.push(good)
      resolve()
    })
  },

  removeGoodToOrder ({commit, state}, good) {
    return new Promise((resolve, reject) => {
      _.remove(state.goods, good)
      resolve()
    })
  }
}
