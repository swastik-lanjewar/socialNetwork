import axios from '@/utils/http-common'
export default {
    //action to create a new account of the user 
    async createAccount({
        commit
    }, payload) {
        try {
            const response = await axios.post('/auth/create-account/', payload)
            localStorage.setItem('token', response.data.token)
            commit('SET_TOKEN', response.data.token)
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
                    commit('SET_TOKEN', response.data.token)
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
    async createPost({ state, commit }, payload) {
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

    // action to delete a post
    async deletePost({ commit }, payload) {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`/post/${payload}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit("DELETE_POST", payload)
            commit("DELETE_TIMELINE_POST", payload)
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
}