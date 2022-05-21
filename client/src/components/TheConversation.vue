<template>
  <div class="rounded-md shadow-md p-2 overflow-y-auto">
    <h3 class="font-semibold m-2">Conversations</h3>
    <ul>
      <li
        v-for="(item, index) in conversations"
        :key="index"
        class="
          p-2
          flex
          justify-start
          items-center
          hover:bg-sky-400 hover:text-white
          cursor-pointer
          rounded-md
          border-b border-gray-100
        "
        @click="selectConversation(item._id)"
      >
        <img
          class="w-1/6 rounded-full mr-4"
          src="https://source.unsplash.com/random/200x200/?profile"
          alt=""
        />
        <div class="w-full">
          <button>{{ receiver(item.participants) }}</button>
          <div class="w-full flex justify-between items-center">
            <p class="text-sm text-gray-700">Hi!</p>
            <span class="text-xs text-gray-500">10:31 AM</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheConversations",
  props: {
    conversations: Object,
  },
  computed:{
      ...mapGetters(['user', 'connections']),
  },
  methods:{
      receiver(participants){
        const receiverId = participants.filter(participant => participant !== this.user._id);
        return this.connections.find(connection => connection._id === receiverId[0]).username;
      },
      selectConversation(id){
        this.$store.commit("SET_CURRENT_CONVERSATION", id);
      },
  }
};
</script>

<style>
</style>