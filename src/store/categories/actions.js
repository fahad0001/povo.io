// import notificationService from '../../services/notification.service'
import httpService from '../http.service'

export const categoriesActions = {
  getCategoriesList ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      httpService
        .get('/categories/')
        .then(res => {
          commit('setCategoriesList', res.data)
          resolve(res.data)
        })
        .catch(e => {
          if (e.response) {
            e.response.data.errors.map(message => httpService.handleError(message))
            reject()
          }
        })
    })
  }
}
