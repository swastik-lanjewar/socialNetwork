<template>
  <div class="rounded-md shadow-md p-2 overflow-y-auto">
    <h3 class="font-semibold m-2">Conversations</h3>
    <ul  v-if="conversations.length > 0" >
      <li
       
        v-for="(item, index) in conversations" :key="index" class="
          p-2
          flex
          justify-start
          items-center
          hover:bg-sky-400 hover:text-white
          cursor-pointer
          rounded-md
          border-b border-gray-100
        " :class="{ 'bg-sky-400 text-white': item._id === currentConversation?._id }"
        @click="selectConversation(item)">
        <div class="relative w-14 ">
          <img 
          v-if="receiver(item.participants)?.profilePicture !== ''"
          class="rounded-full  w-10 h-10 object-cover" 
          :src="receiver(item.participants)?.profilePicture" 
          loading="lazy"
          alt="" />
          <img 
          v-else
          class="rounded-full  w-10 h-10 object-cover" 
          src="../assets/noAvatar.png" 
          loading="lazy"
          alt="" />
          <div
            class="absolute -right-3 bottom-5 h-4 w-4 sm:top-2 rounded-full border-2 border-white bg-green-400 sm:invisible md:visible"
            :title="`${receiver(item.participants)?.username} is online`" 
            v-show="onlineConnections.includes(receiver(item.participants)?._id)"
            >
            </div>
        </div>
        <div class="w-full ml-4">
          <button>{{ receiver(item.participants)?.username }}</button>
          <div class="w-full flex justify-between items-center">
            <p class="text-sm text-gray-700">Hi!</p>
            <span class="text-xs text-gray-500">10:31 AM</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="text-center text-gray-500">
      <p>No conversations yet</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheConversations",
  props: {
    conversations: Object,
  },
  computed: {
    ...mapGetters(['user','users', 'connections', 'currentConversation', 'onlineUsers']),
    onlineConnections(){
      const online = []
       this.onlineUsers.forEach(user => {
        if(this.user.connections.includes(user.userId)) online.push(user.userId)
      })
      return online
    }
  },
  methods: {

    receiver(participants) {
      const receiverId = participants.filter(participant => participant !== this.user._id);
      return this.users.find(connection => connection._id === receiverId[0])
    },

    selectConversation(conversation) {
      this.$store.commit("SET_CURRENT_CONVERSATION", conversation);
      // // Check if the messages are already loaded in the store of this current conversation
      // this.$store.state.messages.filter(message => message.conversationId == id).length == 0 ?
      //   this.loadMessages(id) :
      //   console.log("messages already loaded");
    },

    // loadMessages(id) {
    //   this.$store.dispatch("getMessages", { id })
    // }
  }
};
</script>

<style>
</style>