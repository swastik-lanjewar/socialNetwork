<template>
  <section class="w-full md:w-1/2 md:px-6">
    <!-- // chat window -->
    <div
      class="w-full rounded-md shadow-md h-full flex flex-col justify-evenly"
    >
      <div
        class="p-4 flex justify-between border-b items-center border-gray-400"
      >
        <div class="flex">

          <img :src="receiver?.profilePicture || 'https://source.unsplash.com/random/50x50/?people'" class="w-1/12 rounded-full mr-4" alt="" />
          <h2 class="font-semibold text-xl">{{ receiver?.username }}</h2>

        </div>
        <button>
          <i class="fab fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>


      <section class="p-2 flex-row overflow-auto flex-grow" ref="chatWindow">
        <div :class="{ 'flex w-full justify-end': message.received !== true }" v-for="(message, index) in conversation"
          :key="index">
          <div class="rounded-lg bg-blue-100 w-fit p-1 px-4 my-2" :class="{ 'text-right': message.received !== true }">
            <p class="text-left">{{ message.data }}</p>
            <p class="text-xs">{{ timeAgo(message.time) }}</p>
          </div>
        </div>
        <p v-show="isTyping" class="text-green-500 font-semibold">Typing...</p>
      </section>
      <div class="px-4 py-2 border-t border-gray-400">
        <label for="writeSomething" class="flex items-center">
          <input id="writeSomething" type="text" placeholder="Write Something..." class="w-full focus:outline-none"
            v-model="message" @keypress="typing" />
          <button class="bg-blue-400 px-4 py-1 rounded-full text-white" @click="sendMessage">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";
import { mapGetters } from "vuex";
export default {
  name: "TheChatWindow",
  data() {
    return {
      socket: {},
      greeting: null,
      message: "",
      conversation: [],
      isTyping: false,
    };
  },
  methods: {
    typing() {
      this.socket.emit("typing", {
        userid: this.userid,
        senderId: this.user._id,
        receiverId: this.receiver._id,
      });
    },
    sendMessage() {
      if (this.message.length <= 0) return;

      this.socket.emit("message", {
        senderId: this.user._id,
        receiverId: this.receiver._id,
        message: this.message,
        time: new Date()
      });

      this.conversation.push({
        received: false,
        data: this.message,
        userid: this.user._id,
        time: new Date()
      });
      this.scrollToBottom()
      this.saveMessage(this.user._id, this.currentConversation._id, this.message)

      this.message = "";
    },

    async saveMessage(senderId, conversationId, message) {
      try {
        await this.$store.dispatch("saveMessages", {
          senderId,
          conversationId,
          message
        })
      } catch (error) {
        console.log(error)
      }
    },

    loadConversation() {
      // sperad the messages in the conversation
      this.conversation = this.messages?.filter(
        (message) => message.conversationId == this.currentConversation._id
      )[0]
        .messages.map((msg) => {
          return {
            received: msg.sender !== this.user._id,
            data: msg.text,
            userid: msg.sender,
            time: msg.createdAt,
          };
        }).sort((a, b) => a.time - b.time)
    },

    // scroll to the bottom of the chat window
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
      });
    },

    timeAgo(createAt) {
      const time = new Date(createAt);
      const now = new Date();
      const diff = (now.getTime() - time.getTime()) / 1000;
      if (diff < 60) {
        return 'just now';
      }
      if (diff < 3600) {
        return Math.round(diff / 60) + ' minutes ago';
      }
      if (diff < 86400) {
        return Math.round(diff / 3600) + ' hours ago';
      }
      if (diff < 604800) {
        return Math.round(diff / 86400) + ' days ago';
      }
      if (diff < 2592000) {
        return Math.round(diff / 604800) + ' weeks ago';
      }
      if (diff < 31536000) {
        return Math.round(diff / 2592000) + ' months ago';
      }
      if (diff < 315360000) {
        return Math.round(diff / 31536000) + ' years ago';
      }
      return time.toDateString();
    }
  },

  created() {
    this.socket = io("https://letsbug-social-network.herokuapp.com/", {
      transports: ["websocket"],
    });

    this.socket.emit("addUser", { userId: this.user._id });
    this.socket.on("getUsers", (data) => {
      this.$store.commit("SET_ONLINE_USERS", data);
    });

    this.socket.on("message", (data) => {
      this.conversation.push({
        received: true,
        data: data.message,
        time: data.time,
      });
      this.scrollToBottom();
    });

    this.socket.on("typing", () => {
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
      }, 500);
    });
  },
  computed: {
    ...mapGetters(["user", "currentConversation", "connections", "messages"]),
    receiver() {
      const participants = this.currentConversation.participants;
      const receiverId = participants.filter(
        (participant) => participant != this.user._id
      );
      return this.connections.find(
        (connection) => connection._id == receiverId[0]
      );
    },
  },
  watch: {
    currentConversation() {
      this.loadConversation();
    },
  },
};
</script>

<style>
</style>