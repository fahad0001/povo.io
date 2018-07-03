// import notificationService from '../../services/notification.service'
import httpService from '../http.service'

export const addressesActions = {
  createAddress ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      let address = {
        fullname: data.fullname,
        line_first: data.lineFirst,
        line_second: data.lineSecond,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip
      }
      httpService.post('/addresses', {address: address})
        .then(res => {
          commit('addressCreateSuccess')
          resolve(res)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },

  getAddressesList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService
        .get('/addresses/')
        .then(res => {
          commit('setAddressesList', res.data)
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

  getAddressById ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get('/address/' + payload)
        .then(res => {
          commit('setAddress', res.data)
          resolve(res.data)
        }).catch(e => {
          console.log(e)
        })
    })
  }
}
