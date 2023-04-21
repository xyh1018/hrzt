import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局样式
import 'nprogress/nprogress.css' // nprogress的css样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // 图标
import '@/permission' // 路由权限控制
import { imageError } from '@/directives' // 自定义指令
import Components from '@/components'
import * as filters from '@/filters' // 导入自定义过滤器
// 注册自定义过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.use(Components)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// 注册自定义指令
Vue.directive('imageError', imageError)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
