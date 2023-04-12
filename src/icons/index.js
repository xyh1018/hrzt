import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg 组件

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 以上两行代码的含义是，将所有的svg目录下的.svg后缀的文件全部引入到项目中
