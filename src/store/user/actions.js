import httpService from '../http.service'
import Vue from 'vue'

export const userActions = {
  login ({commit, state}, data) {
    commit('enableLoading')
    httpService.post('/auth/sign_in', data)
    .then(res => {
      commit('disableLoading')
      const user = Object.assign({}, res.data.data, {token: res.headers['access-token'], uid: res.headers['uid'], client: res.headers['client']})
      httpService.setToken(user.token, user.uid, user.client)
      commit('setToken', user.token)
      commit('setCurrentUser', user)
    }).catch(e => {
      commit('disableLoading')
      e.response.data.errors.map(message => {
        httpService.handleError(message)
      })
    })
  },

  signUp ({commit, state}, data) {
    commit('enableLoading')
    const body = Object.assign({}, data, {redirect_url: window.location.origin + '/confirmation_finish'})
    httpService.post('/auth', body)
      .then(res => {
        commit('closeAllModals')
        Vue.analytics.fbq.event('Lead')
        commit('disableLoading')
        setTimeout(() => { commit('showAfterSignUpModal', true) }, 200)
      })
      .catch(e => {
        commit('disableLoading')
        if (e.response) {
          e.response.data.errors.full_messages.map((message) => {
            httpService.handleError(message)
          })
        }
      })
  },

  // /password params email and redirect_url
  resetPassword ({store, state}, data) {
    // TODO set redirect url
    const body = Object.assign({}, data, {redirect_url: window.location.origin + '/set_new_password'})
    httpService.post('/auth/password', body)
  },

  setNewPassword ({store, state}, data) {
    // TODO use object assign in serviсe to add additional headers params
    httpService.put('/auth/password', data, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      'access-token': localStorage.getItem('token'),
      'uid': localStorage.getItem('uid'),
      'client': localStorage.getItem('client')
    })
  },

  setUserOAuth ({commit, state}, user) {
    user = Object.assign({}, user, {token: user['access-token'], uid: user['uid'], client: user['client']})
    httpService.setToken(user.token, user.uid, user.client)
    commit('setToken', user.token)
    // commit('setUser', user)
    commit('setCurrentUser', user)
  },

  setUser ({commit, state}, user) {
    user = Object.assign({}, user, {client: user.client_id})
    httpService.setToken(user.token, user.uid, user.client)
    commit('setToken', user.token)
    commit('setCurrentUser', user)
  },

  getCurrentUser ({commit, state}) {
    commit('enableLoading')
    return new Promise((resolve, reject) => {
      httpService.get('/users/get_current')
        .then(res => {
          commit('disableLoading')
          const user = Object.assign({}, res.data, {token: res.headers['access-token'], uid: res.headers['uid'], client: res.headers['client']})
          commit('setToken', user.token)
          commit('setCurrentUser', user)
          resolve()
        }).catch(e => {
          commit('disableLoading')
        })
    })
  },

  updateUser ({commit, state}, user) {
    const baseImage = user.image ? user.image.dataURL : ''
    commit('enableLoading')
    return new Promise((resolve, reject) => {
      httpService.put('/users/' + user.id, {user: user, base_image: baseImage})
        .then(res => {
          commit('disableLoading')
          const user = Object.assign({}, res.data, {token: res.headers['access-token'], uid: res.headers['uid'], client: res.headers['client']})
          commit('setToken', user.token)
          commit('setCurrentUser', user)
          resolve()
        }).catch(e => {
          commit('disableLoading')
          reject()
        })
    })
  },

  setToken ({commit, state}, token) {
    httpService.setToken(token)
    commit('setToken', token)
  },

  // TODO /sign_put DELETE
  logout ({commit, state}) {
    // commit('setUser', {})
    return new Promise((resolve, reject) => {
      httpService.delete('/auth/sign_out')
        .then(res => {
          commit('setCurrentUser', {})
          commit('setToken', '')
          localStorage.removeItem('token')
          localStorage.removeItem('uid')
          localStorage.removeItem('client')
          resolve(res)
        })
    })
  },

  saveProduct ({commit, state}, product) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      httpService.post(`/users/save_product`, {item: product})
        .then(res => {
          commit('setUserSavedProductsList', res.data)
          resolve(res)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },

  removeSavedProduct ({commit, state}, product) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      httpService.post(`/users/remove_saved_product`, {item: product})
        .then(res => {
          commit('setUserSavedProductsList', res.data)
          resolve(res)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },

  getUserSavedProductsList ({commit}) {
    return new Promise((resolve) => {
      httpService.get(`/users/get_saved_products`)
        .then(res => {
          commit('setUserSavedProductsList', res.data)
          resolve(res.data)
        })
    })
  },

  getUserPollsList ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      let url = payload ? `/users/get_polls?search=${payload}` : `/users/get_polls`
      httpService.get(url)
        .then(res => {
          commit('setUserPollsList', res.data)
          commit('userPollsLoader', false)
          resolve(res.data)
        })
    })
  },

  getUserNewFinishedPoll ({commit, state}, user) {
    return new Promise((resolve, reject) => {
      httpService.get('/users/get_new_finished_polls')
      .then(res => {
        const newPoll = res.data[0]
        commit('setNewFinishedPoll', newPoll)
        resolve(newPoll)
      })
    })
  },

  getUserOrders ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService.get('/users/get_orders')
        .then(res => {
          commit('setUserOrdersList', res.data)
          resolve(res.data)
        })
    })
  }
}
