import { createStore } from 'vuex'
import axios from '@/http-common'
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
    posts:[],
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
  },
  mutations: {
    SET_USER(state, user) { 
      state.user = user
    },
    SET_CONNECTION(state, connection) {
      state.connections = connection
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
    SET_MESSAGES(state, { conversationId, messages }) { 
      state.messages.push({ conversationId, messages })
    }, 
    SET_ONLINE_USERS(state, users) {
      state.onlineUsers = users
    }, 
    SET_TIMELINE_POSTS(state, posts) {
      state.timelinePosts = posts
    },
    SET_POSTS(state, posts) { 
      state.posts = posts
    }, 
    MERGE_TIMELINE_POSTS(state, posts) {
      state.timelinePosts = [...state.timelinePosts, ...posts]
    }

  },
  actions: {
    //action to create a new account of the user 
    createAccount( state ,payload ) { 
      return new Promise((resolve, reject) => { 
          axios.post('http://localhost:3000/auth/create-account/', payload).then(response => { 
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    // action to login the user
    login(state, payload) { 
      return new Promise((resolve, reject) => { 
        axios.post('http://localhost:3000/auth/login/', payload).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // action to get all the users
    async getAllUsers({ commit}) { 
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get('http://localhost:3000/user/', {
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
    connectUser(state, payload) { 
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.post(`http://localhost:3000/user/${payload.userId}/connect`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // action to get all the conversation of the user 
    getConversations() {
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.get('http://localhost:3000/conversation/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // action to create a new conversation
    createConversation(state, payload) { 
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.post('http://localhost:3000/conversation/', {participants:[payload.receiverId]}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //action to get all the messages of a conversation
    getMessages(state, payload) { 
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.get(`http://localhost:3000/message/${payload.id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }, 
  
    saveMessages(state, payload) {
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.post(`http://localhost:3000/message/`, {
          conversationId: payload.conversationId,
          sender: payload.sender,
          text:payload.text
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // action to create a new post
    async createPost({state,commit}, payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`http://localhost:3000/post/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        commit("SET_POSTS", [ ...state.posts, response.data.post])
        commit("SET_TIMELINE_POSTS", [...state.timelinePosts, response.data.post])
      } catch (error) {
        console.error(error.messages)
      }
    }, 

    // action to get a users timeline 
    async getTimeline({ commit}) {
      const token = localStorage.getItem('token')
      try { 
        const response = await axios.get('http://localhost:3000/post/timeline/', {
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
    async getPosts({commit}) {
      
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get("http://localhost:3000/post/", {
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
    
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
