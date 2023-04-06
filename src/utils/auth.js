import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

export function getTokenU() {
  return Cookies.get(TokenKey)
}

export function setTokenU(token) {
  return Cookies.set(TokenKey, token)
}

export function removeTokenU() {
  return Cookies.remove(TokenKey)
}
