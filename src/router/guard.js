import httpService from '../store/http.service'
import {store} from '../store'

// todo use service
const validateToken = function () {
  httpService.setToken()
  return httpService.get('/auth/validate_token')
}

export default {
  checkAuth (to, from, next) {
    store.dispatch('toggleAuthLoader', true)
    validateToken()
      .then(res => {
        store.dispatch('toggleAuthLoader', false)
        next(true)
      }).catch(e => {
        localStorage.removeItem('token')
        localStorage.removeItem('uid')
        localStorage.removeItem('client')
        store.commit('setToken', '')
        store.dispatch('toggleAuthLoader', false)
        httpService.handleError('You need to sign in or sign up before continuing.')
        next({ path: '/' })
      })
  }
}
