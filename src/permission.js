/**
 * 权限控制文件
 */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'

// nprogress配置项
NProgress.configure({
  showSpinner: false
})
// 路由白名单
const whiteList = ['/login', '/404']

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    // 有token
    // 判断要前往的页面是不是登陆页
    if (to.path === '/login') {
      next('/') // 如果是登陆页，定向到主页
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // 添加动态路由到路由表
        console.log(routes, router)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        // for (const route of routes) {
        //   router.addRoute(route)
        // }
        next(to.path)
      } else {
        next() // 不是登陆页，直接放行
      }
    }
  } else {
    // 没有token
    // 判断要前往的页面在不在白名单里
    if (whiteList.indexOf(to.path) > -1) {
      next() // 如果在，直接放行
    } else {
      next('/login') // 不在，定向到登陆页
    }
  }
  NProgress.done()
})

// 路由后置钩子
router.afterEach((to, from) => {
  NProgress.done() // 关闭进度条
})
