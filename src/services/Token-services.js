import config from '../config'

const TokenService = {
  saveAuthToken(token, user_id) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
    window.localStorage.setItem(config.user_id, user_id)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
    window.localStorage.removeItem(config.user_id);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  getUserId() {
    return window.localStorage.getItem(config.user_id)
  }
}

export default TokenService