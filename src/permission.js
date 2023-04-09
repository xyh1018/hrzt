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
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    // 有token
    // 判断要前往的页面是不是登陆页
    if (to.path === '/login') {
      next('/') // 如果是登陆页，定向到主页
    } else {
      next() // 不是登陆页，直接放行
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
