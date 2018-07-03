// import notificationService from '../../services/notification.service'
import httpService from '../http.service'

export const pollsActions = {
  createPoll ({commit, state}, data) {
    data.item_ids = data.selectedProducts.map((product) => product.id)
    httpService.setToken()
    httpService.post('/polls', {poll: data})
      .then(res => {
        commit('pollCreateSuccess')
      })
      .catch(e => {
        if (e.response) {
          e.response.data.errors.map(message => httpService.handleError(message))
        }
      })
  },

  markPollAsShowed ({commit, state}, poll) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      httpService.put('/polls/' + poll.id, {poll: { is_showed: true }})
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },

  getPollsList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService
        .get('/polls/')
        .then(res => {
          commit('setPollsList', res.data)
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

  getUnexpiredPollsList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService
        .get('/polls/unexpired')
        .then(res => {
          commit('setPollsList', res.data)
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

  getPollsListByOrder ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService.get(`/polls/order_by/${data.type}?page=${data.page}`)
        .then(res => {
          commit('setPollsList', res.data)
          resolve(res.data)
        })
    })
  },

  getPollsUnvoted ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService.get(`/polls/unvoted`)
        .then(res => {
          commit('setPollsList', res.data)
          resolve(res.data)
        })
    })
  },

  getPollById ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.get('/polls/' + payload)
        .then(res => {
          commit('setPoll', res.data)
          resolve(res.data)
        }).catch(e => {
          console.log(e)
        })
    })
  },

  voteForPollItem ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      httpService.post('/polls/vote_for/' + payload.item.id, {
        poll: payload.poll,
        comment: payload.comment
      })
        .then(res => {
          Object.keys(res.data.errors).length ? Object.values(res.data.errors).map((messages) => messages.map(message => httpService.handleError(message))) : null
          resolve(res)
        }).catch(e => {
          if (e.data.errors) {
            Object.values(e.data.errors).map((messages) => messages.map((message) => httpService.handleError(message)))
          }
          reject()
        })
    })
  }
}
