export default {
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
}