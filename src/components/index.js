// 自定义组件的全局注册
import pageTopTool from './pageTopTool'
export default {
  install(Vue) {
    Vue.component('pageTopTool', pageTopTool)
  }
}
