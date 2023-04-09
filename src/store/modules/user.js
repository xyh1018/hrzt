import { login, getInfo } from '@/api/user'
import { getTokenU, setTokenU, removeTokenU } from '@/utils/auth'
// import { resetRouter } from '@/router'

const state = {
  token: getTokenU(), // 初始化从cookie读取token
  userInfo: {} // 用户资料
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setTokenU(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeTokenU()
  },
  // 设置用户资料
  setUserInfo(state, info) {
    state.userInfo = info
  },
  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 获取用户token
  async login(context, data) {
    const result = await login(data) // 获取token
    context.commit('setToken', result) // 设置token
  },
  // 获取用户资料
  async getUserInfo(context) {
    const userInfo = await getInfo()
    context.commit('setUserInfo', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

