import { login, getInfo, getUserDetailById } from '@/api/user'
import { getTokenU, setTokenU, removeTokenU, setTimeStampU } from '@/utils/auth'
import { resetRouter } from '@/router'

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
    // 设置时间戳
    setTimeStampU()
  },
  // 获取用户资料
  async getUserInfo(context) {
    // 用户基本资料
    const baseInfo = await getInfo()
    // 用户详细资料
    const detailInfo = await getUserDetailById(baseInfo.userId)
    // 合并用户资料
    const result = { ...baseInfo, ...detailInfo }
    context.commit('setUserInfo', result)
    return result
  },
  // 登出
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

