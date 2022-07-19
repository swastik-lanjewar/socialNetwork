import {
  createStore
} from 'vuex'
import axios from '@/utils/http-common'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {},
    users: [],
    connections: [],
    conversations: [],
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
  getters: {
    user: state => state.user,
    users: state => state.users,
    connections: state => state.connections,
    conversations: state => state.conversations,
    currentConversation: state => state.currentConversation,
    messages: state => state.messages,
    onlineUsers: state => state.onlineUsers,
    timelinePosts: (state) => {
      return state.timelinePosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    posts: state => state.posts,
    currentProfile: state => {
      return state.users.filter(user => user.id === state.currentProfile)[0]
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_CONNECTION(state, connections) {
      state.connections = connections
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_CONVERSATIONS(state, conversations) {
      state.conversations = conversations
    },
    SET_CURRENT_CONVERSATION(state, conversation) {
      state.currentConversation = conversation
    },
    SET_MESSAGES(state, {
      conversationId,
      messages
    }) {
      state.messages.push({
        conversationId,
        messages
      })
    },
    SET_ONLINE_USERS(state, users) {
      state.onlineUsers = users
    },
    SET_TIMELINE_POSTS(state, posts) {
      state.timelinePosts = posts
    },
    SET_POSTS(state, posts) {
      // add the posts in by createdAt date 
      state.posts = posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    MERGE_TIMELINE_POSTS(state, posts) {
      state.timelinePosts = [...state.timelinePosts, ...posts]
    },
    UPDATE_LIKED_POST(state, post) {
      const index = state.timelinePosts.findIndex(p => p._id === post._id)
      state.timelinePosts.splice(index, 1, post)
    },

    ADD_NEW_MESSAGES(state, {
      conversationId,
      message
    }) {
      const index = state.messages.findIndex(m => m.conversationId === conversationId)
      state.messages.splice(index, 1, {
        conversationId,
        messages: [...state.messages[index].messages, message]
      })
    },
    TOGGLE_SAVE_MESSAGES(state, value) {
      state.settings.saveMessages = value
    },
    SET_CURRENT_PROFILE(state, userId) {
      state.currentProfile = userId
    }

  },
  actions: {
    //action to create a new account of the user 
    async createAccount({
      commit
    }, payload) {
      try {
        const response = await axios.post('/auth/create-account/', payload)
        localStorage.setItem('token', response.data.token)
        commit('SET_USER', response.data.user)
        return response
      } catch (error) {
        return error
      }
    },

    // action to login the user
    login({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login/', payload)
          .then(response => {
            localStorage.setItem('token', response.data.token)
            commit('SET_USER', response.data.user)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // action to get all the users
    async getAllUsers({
      commit
    }) {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get('/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_USERS", response.data.users)
      } catch (error) {
        console.error(error.message)
      }
    },

    // action to connect to a user
    async connectUser({
      commit,
      state
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`/user/${payload.userId}/connect`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit('SET_USER', response.data.user)

        const connections = state.users.filter(user => response.data.user.connections.includes(user._id))
        commit('SET_CONNECTION', connections)

        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },

    // action to connect to a user
    async disconnectUser({
      commit,
      state
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`/user/${payload.userId}/disconnect`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit('SET_USER', response.data.user)

        const connections = state.users.filter(user => response.data.user.connections.includes(user._id))
        commit('SET_CONNECTION', connections)

        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },

    // action to get all the conversation of the user 
    async getConversations({
      commit
    }) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('/conversation/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_CONVERSATIONS", response.data.conversations)
        return response
      } catch (error) {
        return error
      }
    },

    // action to create a new conversation
    async createConversation(state, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post('/conversation/', {
          participants: [payload.receiverId]
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response
      } catch (error) {
        return error
      }
    },

    //action to get all the messages of a conversation
    async getMessages({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`/message/${payload.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_MESSAGES", {
          conversationId: payload.id,
          messages: response.data.messages
        })
      } catch (error) {
        console.error(error)
      }
    },

    // action to save the message to the database
    async saveMessages({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        console.log(payload)
        const response = await axios.post(`/message/`, {
          conversationId: payload.conversationId,
          sender: payload.senderId,
          text: payload.message
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("ADD_NEW_MESSAGES", {
          conversationId: payload.conversationId,
          message: response.data.message
        })
        return response
      } catch (error) {
        return error
      }
    },

    // action to create a new post
    async createPost({state, commit}, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`/post/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        commit("SET_POSTS", [...state.posts, response.data.post])
        commit("SET_TIMELINE_POSTS", [...state.timelinePosts, response.data.post])
      } catch (error) {
        console.error(error.messages)
      }
    },

    // action to get a users timeline 
    async getTimeline({
      commit
    }) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('/post/timeline/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_TIMELINE_POSTS", response.data.timeline)
      } catch (error) {
        console.error(error.messages)
      }
    },

    // action to get a users all post 
    async getPosts({
      commit
    }) {

      const token = localStorage.getItem('token')
      try {
        const response = await axios.get("/post/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        commit("SET_POSTS", response.data.posts)
        commit("MERGE_TIMELINE_POSTS", response.data.posts)

      } catch (error) {
        console.error(error.message)
      }
    },

    // action to like the post
    async likePost({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.put(`/post/like/${payload}/`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("UPDATE_LIKED_POST", response.data.post)
      } catch (error) {
        console.log(error)
      }
    },

    // action to like the post
    async unlikePost({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.put(`/post/unlike/${payload}/`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("UPDATE_LIKED_POST", response.data.post)
      } catch (error) {
        console.log(error)
      }
    },

    // action to delete a user 
    async deleteUser({
      commit
    }) {
      const token = localStorage.getItem('token')
      try {
        await axios.delete('/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        localStorage.removeItem('token')
        commit('SET_USER', null)
      } catch (error) {
        console.error(error.message)
      }
    },

    // action to update the user
    async updateUser({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        console.log(payload)
        const response = await axios.put(`/user/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_USER", response.data.user)

      } catch (error) {
        console.error(error)
      }
    },

    //action to upload a profile picture 
    async uploadProfilePicture({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`/profile-picture/upload`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        commit("SET_USER", response.data.user)
      } catch (error) {
        console.error(error)
      }
    },

    //action to delete a profile picture
    async deleteProfilePicture({
      commit
    }, payload) {
      const token = localStorage.getItem('token')
      const pictureName = payload.split("/")[4]
      try {
        const response = await axios.delete(`/profile-picture/${pictureName}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_USER", response.data.user)
      } catch (error) {
        console.error(error)
      }
    },

  },
  modules: {},
  plugins: [createPersistedState()]
})