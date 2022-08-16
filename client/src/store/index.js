import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default createStore({
  state: {
    user: {},
    users: [],
    connections: [],
    conversations: {},
    currentConversation: null,
    messages: [],
    onlineUsers: [],
    timelinePosts: [],
    posts: [],
    settings: {
      saveMessages: false
    },
    currentProfile: null,
  },
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [createPersistedState()]
})