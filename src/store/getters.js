const getters = {
  sidebar: state => state.app.sidebar,
  device: state => {
    console.log(state)
    return state.app.device
  }
}
export default getters
