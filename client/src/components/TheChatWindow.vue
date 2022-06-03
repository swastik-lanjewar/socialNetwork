<template>
  <section class="w-full md:w-1/2 md:px-6">
    <!-- // chat window -->
    <div class="w-full rounded-md shadow-md h-full flex flex-col justify-evenly">
      <div class="px-4 py-2 flex justify-between border-b items-center border-gray-400">
        <div class="flex justify-between items-center w-full">
          <div class="flex grow">
            <img :src="receiver?.profilePicture || 'https://source.unsplash.com/random/50x50/?people'"
              class="w-9 rounded-full mr-4" alt="" />
            <h2 class="w-full font-semibold text-xl">{{ receiver?.username }}</h2>
          </div>

          <div class="3/4 mr-6 text-blue-700 ">
            <button class="px-2">
              <i class="fa fa-phone"></i>
            </button>
            
            <button class="px-2">
              <i class="fa fa-video"></i>
            </button>
            
          </div>
        </div>
        <button>
          <i class="fab fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>


      <section class="p-2 flex-row overflow-auto flex-grow" ref="chatWindow">
        <div :class="{ 'flex w-full justify-end': message.received !== true }" v-for="(message, index) in conversation"
          :key="index">
          <div class="rounded-lg bg-blue-100 w-fit p-1 px-4 my-2" :class="{ 'text-right': message.received !== true }">
            <TheImg :blob="message.data.image" v-if="message.data.image" />
            <p class="text-left" v-if="message.data.image">{{ message.data.caption }}</p>
            <p class="text-left" v-else>{{ message.data }}</p>
            <p class="text-xs">{{ timeAgo(message.time) }}</p>
          </div>
        </div>

        <p v-show="isTyping" class="text-green-500 font-semibold">Typing...</p>
      </section>

      <div class="p-2 border-t border-gray-400">
        <!-- selected img previewer -->
        <div class="w-full bg-gray-100">
          <div v-if="previewImage" class="w-fit relative">
            <img class="w-40 rounded-md shadow-md mb-2" :src="previewImage"  />
            <button class="absolute -top-2 left-full transform -translate-x-4 bg-red-500 px-2 rounded-full text-white" @click="image = null, previewImage = null"><i class="-mt-4 fa fa-times"></i></button>
          </div>
          <!-- <img class="w-40 rounded-md shadow-md mb-2"  src="https://source.unsplash.com/random/200x200/?girl" /> -->
        </div>
        <label class="flex items-center">
          <label class="hover:cursor-pointer bg-blue-500 text-center p-1 mr-2 rounded-lg text-white">
            <i class="ml-2 fas fa-image mr-2"></i>
            <input type="file" class="hidden" accept="image/png, image/jpeg" multiple @change="imgSelected">
          </label>
          <input type="text" placeholder="Write Something..." class="w-full focus:outline-none" v-model="message"
            @keypress="typing" />
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
import TheImg from "@/components/utils/TheImg.vue";
export default {
  name: "TheChatWindow",
  components: {
    TheImg,
  },
  data() {
    return {
      socket: {},
      greeting: null,
      message: "",
      conversation: [],
      isTyping: false,
      image: null,
      previewImage: null,
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

      if (this.image) {

        this.conversation.push({
          received: false,
          data: {
            caption: this.message,
            image: this.image,
          },
          userid: this.user._id,
          time: new Date()
        });

        this.socket.emit("message", {
          senderId: this.user._id,
          receiverId: this.receiver._id,
          message: {
            caption: this.message,
            image: this.image,
          },
          time: new Date()
        });

      } else {

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

      }
      // this.saveMessage(this.user._id, this.currentConversation._id, this.message)
      this.previewImage = null;
      this.image = null;
      this.message = "";
      this.scrollToBottom()
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
        (message) => message.conversationId === this.currentConversation._id
      )[0]
        .messages.map((msg) => {
          return {
            received: msg.sender !== this.user._id,
            data: msg.text,
            userid: msg.sender,
            time: msg.createdAt,
          };
        }).sort((a, b) => a.time - b.time)

      this.scrollToBottom();
    },
    // image selected
    imgSelected(e) {
      this.image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.image);
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
  updated(){
    this.scrollToBottom();
  },
  created() {
    // this.socket = io("https://letsbug-social-network.herokuapp.com/", {
    //   transports: ["websocket"],
    // });
    this.socket = io("http://localhost:3000/", {
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
    ...mapGetters(["user","users", "currentConversation", "connections", "messages"]),
    receiver() {
      const participants = this.currentConversation.participants;
      const receiverId = participants.filter(
        (participant) => participant != this.user._id
      );
      return this.users.find(
        (connection) => connection._id == receiverId[0]
      );
    },
  },
  watch: {
    currentConversation(newVal) {
      if (newVal) {
        this.loadConversation();
      }
    }
  },
  mounted() {
    this.loadConversation()
    this.scrollToBottom()
  }
};
</script>

<style>
</style>