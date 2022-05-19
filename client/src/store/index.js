import { createStore } from 'vuex'
import axios from '@/http-common'

export default createStore({
  state: {
    user: {},
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    SET_USER(state, user) { 
      state.user = user
    },
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
    // get user profile
    getUserData(state, payload) { 
      return new Promise((resolve, reject) => { 
        axios.get(`http://localhost:3000/user/${payload.userId}`, {
          headers: {
            Authorization: `Bearer ${payload.token}`
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
  }
})
