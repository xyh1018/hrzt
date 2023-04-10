const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 用户token
  name: state => state.user.userInfo.username, // 用户名的快捷访问
  userId: state => state.user.userInfo.userId, // 用户ID
  userPicture: state => state.user.userInfo.staffPhoto // 用户头像
}
export default getters
