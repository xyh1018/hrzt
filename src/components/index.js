// 自定义组件的全局注册
import pageTopTool from './pageTopTool'
import uploadExcel from './UploadExcel'
export default {
  install(Vue) {
    Vue.component('pageTopTool', pageTopTool)
    Vue.component('uploadExcel', uploadExcel)
  }
}
