import notificationService from '../services/notification.service'
import axios from 'axios'
import {url} from '../data/http'

class HttpService {
  headers = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  handleError (message) {
    console.log('handleError', message)
    return notificationService.showError(message)
  }

  setToken (token, uid, client) {
    let headers = this.headers.headers
    if (token && uid && client) {
      localStorage.setItem('token', token)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    } else {
      token = localStorage.getItem('token')
      client = localStorage.getItem('client')
      uid = localStorage.getItem('uid')
    }
    headers['auth-token'] = token
    headers['access-token'] = token
    headers['uid'] = uid
    headers['client'] = client
    headers['token-type'] = 'Bearer'
    this.headers.headers = headers
  }

  // TODO move to headers vars
  post (_url, body) {
    return axios.request({
      url: _url,
      baseURL: url,
      method: 'post',
      data: body,

      headers: this.headers.headers
    })
  }

  get (_url) {
    return axios.request({
      url: _url,
      baseURL: url,
      method: 'get',
      headers: this.headers.headers
    })
  }

  put (_url, body, headers) {
    let _headers = Object.assign({}, this.headers.headers, headers)
    return axios.request({
      url: _url,
      baseURL: url,
      method: 'put',
      data: body,
      headers: _headers
    })
  }

  delete (_url) {
    return axios.delete(url + _url, this.headers)
  }
}

export default new HttpService()
