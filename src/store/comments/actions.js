import httpService from '../http.service'
// import Vue from 'vue'
export const commentsActions = {
  addLikeToComment ({commit, state}, comment) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      httpService.post(`/comments/like`, {id: comment.id})
        .then(res => {
          commit('commentLikedSuccess')
          resolve(res)
        })
        .catch(e => {
          commit('commentLikedFail')
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  },
  removeLikeFromComment ({commit, state}, comment) {
    return new Promise((resolve, reject) => {
      httpService.setToken()
      httpService.post(`/comments/unlike`, {id: comment.id})
        .then(res => {
          commit('commentUnlikedSuccess')
          resolve(res)
        })
        .catch(e => {
          commit('commentUnlikedFail')
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
          }
        })
    })
  }
}
