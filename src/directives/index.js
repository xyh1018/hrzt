/**
 * 自定义指令
 */
// 用户头像地址失效时替换头像
export const imageError = {
  inserted: function(el, binding) {
    el.src = el.src || binding.value
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

