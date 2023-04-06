import { login } from '@/api/user'
import { getTokenU, setTokenU, removeTokenU } from '@/utils/auth'
// import { resetRouter } from '@/router'

const state = {
  token: getTokenU() // 初始化从cookie读取token
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
  }
}

const actions = {
  async login(context, data) {
    const result = await login(data) // 获取token
    context.commit('setToken', result) // 设置token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

