<template>
  <div class="relative">
    <TheNavbar @removeUser="removeUser"></TheNavbar>

    <TheVideoCallWindow :videoCall="videoCall" :inStream="true" :outStream="true" @cancel="videoCall = !videoCall" />

    <main class="flex justify-between md:p-3">
      <TheProfileSidebar v-if="token" />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component 
            :is="Component" 
            @connect="connect" 
            @sendMessage="sendMessage"
            @typing="typing"
            :isTyping="isTyping"
            @videoCall="handleVideoCall"
          />
        </transition>
      </router-view>
    </main>

    <TheNavbarBottom @removeUser="removeUser"></TheNavbarBottom>
  </div>
</template>

<script>
import io from "socket.io-client";
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheNavbarBottom from "./components/TheNavbarBottom.vue";
import { mapGetters } from "vuex";
import TheVideoCallWindow from "./components/TheVideoCallWindow.vue";
export default {
  components: { TheNavbar, TheNavbarBottom, TheProfileSidebar, TheVideoCallWindow },
  name: "App",
  data() {
    return {
      socket: {},
      isTyping: false,
      videoCall:false,
    };
  },
  computed: {
    ...mapGetters(["user", "currentConversation", "token"]),
  },
  methods: {
    connect() {
      // this.socket = io("https://letsbug-social-network.herokuapp.com/", {
      //   transports: ["websocket"],
      // });

      this.socket = io("http://localhost:3000/", {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("connected");
      });

      this.socket.on("disconnect", () => {
        console.log("disconnected");
      });

      this.socket.emit("addUser", { userId: this.user._id });
      this.socket.on("getUsers", data => {
        this.$store.commit("SET_ONLINE_USERS", data);
      });

      this.socket.on("message", data => {
        this.$store.commit("ADD_NEW_MESSAGES", {
          ...data,
          received: true,
        });
      });

      this.socket.on("typing", ({ conversationId }) => {
        if (conversationId === this.currentConversation._id) {
          if (!this.isTyping) {
            this.isTyping = true;
            this.typingTimeout = setTimeout(() => {
              this.isTyping = false;
            }, 1000);
          } else {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
              this.isTyping = false;
            }, 1000);
          }
        }
      });
    },

    sendMessage(message) {
      this.socket.emit("message", message);
    },

    typing(data) {
      this.socket.emit("typing", data);
    },

    removeUser() {
      this.socket.emit("removeUser", { userId: this.user._id });
    }, 

    handleVideoCall() {
      this.videoCall = true
    }

  },
};
</script>
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
</style>
