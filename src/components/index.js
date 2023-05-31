// 自定义组件的全局注册
import pageTopTool from './pageTopTool'
import uploadExcel from './UploadExcel'
import imageUpload from './ImageUpload'
import tagsView from './TagsView'
export default {
  install(Vue) {
    Vue.component('pageTopTool', pageTopTool)
    Vue.component('uploadExcel', uploadExcel)
    Vue.component('imageUpload', imageUpload)
    Vue.component('tagsView', tagsView)
  }
}
