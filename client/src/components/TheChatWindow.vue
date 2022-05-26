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
          <img
            src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
            class="w-1/12 rounded-full mr-4"
            alt=""
          />
          <h2 class="font-semibold text-xl">{{ receiver?.username }}</h2>
        </div>
        <button>
          <i class="fab fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <section class="p-2 flex-row overflow-auto flex-grow" ref="chatWindow">
        <div
          :class="{ 'flex w-full justify-end': message.received !== true }"
          v-for="message in conversation"
          :key="message.data"
        >
          <div
            class="rounded-lg bg-blue-100 w-fit p-1 px-4 my-2"
            :class="{ 'text-right': message.received !== true }"
          >
            <p class="text-left">{{ message.data }}</p>
            <p class="text-xs">{{ message.time }}</p>
          </div>
        </div>
        <p v-show="isTyping" class="text-green-500 font-semibold">Typing...</p>
      </section>
      <div class="px-4 py-2 border-t border-gray-400">
        <label for="writeSomething" class="flex items-center">
          <input
            id="writeSomething"
            type="text"
            placeholder="Write Something..."
            class="w-full focus:outline-none"
            v-model="message"
            @keypress="typing"
          />
          <button
            class="bg-blue-400 px-4 py-1 rounded-full text-white"
            @click="sendMessage"
          >
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
        time: new Date().toLocaleTimeString(),
      });
      this.conversation.push({
        received: false,
        data: this.message,
        userid: this.user._id,
        time: new Date().toLocaleTimeString(),
      });
       this.scrollToBottom()

      // save the message by dispatching
      // this.$store.dispatch("saveMessages", {
      //   conversationId:this.currentConversation._id,
      //   sender:this.user._id,
      //   text: this.message
      // }).then(res =>{
      //   this.scrollToBottom()
      //   console.log(res)
      //   this.conversation.push({
      //   received: false,
      //   data: res.data.text,
      //   userid: '',
      //   time: res.data.createdAt
      // })
      // }).catch(err => console.log(err))

      this.message = "";
    },

    loadConversation() {
      // sperad the messages in the conversation
      this.conversation = this.messages
        .filter(
          (message) => message.conversationId == this.currentConversation._id
        )[0]
        .messages.map((msg) => {
          return {
            received: msg.sender == this.user._id,
            data: msg.text,
            userid: msg.sender,
            time: msg.createdAt,
          };
        });
    },

    // scroll to the bottom of the chat window
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
      });
    },
  },

  created() {
    this.socket = io("http://localhost:3000", {
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