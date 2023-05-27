/**
 * 处理权限路由的模块
 */
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 筛选权限路由
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach((item) => {
      routes.push(
        ...asyncRoutes.filter((obj) => {
          return obj.name === item
        })
      )
    })
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
