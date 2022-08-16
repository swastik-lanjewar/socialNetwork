export default {
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
        state.conversations.forEach(conv => {
            conv['messages'] = []
        })
    },

    SET_CURRENT_CONVERSATION(state, conversation) {
        state.currentConversation = conversation
    },
        
    ADD_NEW_MESSAGES(state, message) {
        state.conversations.forEach(conversation => {
            if (conversation._id !== message.conversationId) return 
            conversation.messages.push(message)
        })
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
        const index2 = state.posts.findIndex(p => p._id === post._id)
        state.posts.splice(index2, 1, post)
    },

    TOGGLE_SAVE_MESSAGES(state, value) {
        state.settings.saveMessages = value
    },

    SET_CURRENT_PROFILE(state, userId) {
        state.currentProfile = userId
    },

    DELETE_POST(state, postId) {
        const index = state.posts.findIndex(p => p._id === postId)
        state.posts.splice(index, 1)
    },

    DELETE_TIMELINE_POST(state, postId) {
        const index = state.timelinePosts.findIndex(p => p._id === postId)
        state.timelinePosts.splice(index, 1)
    }
}