import { createStore } from 'vuex'
import axios from '@/http-common'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    //action to create a new account of the user 
    createAccount( state ,payload ) { 
      return new Promise((resolve, reject) => { 
          axios.post('http://localhost:3000/create-account', payload).then(response => { 
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    // action to login the user
    login(state, payload) { 
      return new Promise((resolve, reject) => { 
        axios.post('http://localhost:3000/login', payload).then(response => { 
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // get user profile
    getUserProfile(state, payload) { 
      return new Promise((resolve, reject) => { 
        axios.get('http://localhost:3000/user/profile', payload).then(response => { 
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
