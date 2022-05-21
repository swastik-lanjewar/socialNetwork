import { createStore } from 'vuex'
import axios from '@/http-common'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {},
    users: [],
    connections: [],
    conversations:[],
  },
  getters: {
    user: state => state.user,
    users: state => state.users,
    connections: state => state.connections,
    conversations: state => state.conversations,
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
    }
  },
  actions: {
    //action to create a new account of the user 
    createAccount( state ,payload ) { 
      return new Promise((resolve, reject) => { 
          axios.post('http://localhost:3000/auth/create-account', payload).then(response => { 
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    // action to login the user
    login(state, payload) { 
      return new Promise((resolve, reject) => { 
        axios.post('http://localhost:3000/auth/login', payload).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // action to logout the user
    logout() {
      // remove token from local storage
      localStorage.removeItem('token')
      // remove user from state
      this.state.user = {}
    },

    // action to get all the users
    getAllUsers() { 
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => { 
        axios.get('http://localhost:3000/user/', {
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
    }
    
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
