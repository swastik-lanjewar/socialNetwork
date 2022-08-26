<template>
  <section class="w-full md:w-3/4 md:px-6 relative">
    <div
      class="w-full rounded-md shadow-md h-full flex flex-col justify-evenly"
    >
      <div
        class="px-4 py-2 flex justify-between border-b items-center border-gray-400"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex grow">
            <img
              v-if="receiver?.profilePicture !== ''"
              class="w-9 aspect-square rounded-full mr-4"
              :src="receiver?.profilePicture"
              loading="lazy"
              alt=""
            />
            <img
              v-else
              class="rounded-full w-9 aspect-square mr-4"
              src="../assets/noAvatar.png"
              loading="lazy"
              alt=""
            />
            <h2 class="w-full font-semibold text-xl">
              {{ receiver?.username }}
            </h2>
          </div>

          <div class="3/4 mr-6 text-blue-700">
            <button class="px-2">
              <i class="fa fa-phone"></i>
            </button>
            <button class="px-2" @click="$emit('videoCall')">
              <i class="fa fa-video"></i>
            </button>
          </div>
        </div>
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              class="inline-flex justify-center w-full"
              @click="showMenu = !showMenu"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <i class="fab fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>

          <div
            class="origin-top-right absolute right-0 mt w-40 rounded-md shadow-lg bg-white border"
            :class="{ hidden: !showMenu }"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <button
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                role="menuitem"
                tabindex="-1"
                @click="deleteConversation(currentConversation._id)"
              >
                <i class="fab fa-solid fa-trash mr-2"></i>
                Delete Conversation
              </button>
              <button
                class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                role="menuitem"
                tabindex="-1"
              >
                <i class="fab fa-regular fa-file mr-2"></i>
                Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <section class="p-2 flex-row overflow-auto flex-grow" ref="chatWindow">
        <div
          :class="{ 'flex w-full justify-end': m.received !== true }"
          v-for="(m, i) in messages(currentConversation._id)"
          :key="i"
        >
          <div
            class="rounded-lg bg-blue-100 w-fit p-1 px-4 my-2"
            :class="{ 'text-right': m.received !== true }"
          >
            <TheImg :blob="m.message.image" v-if="m.message.image" />
            <p class="text-left" v-if="m.message.image">
              {{ m.message.caption }}
            </p>
            <p class="text-left" v-else>{{ m.message }}</p>
            <p class="text-xs">{{ timeAgo(m.time) }}</p>
          </div>
        </div>
        <p
          v-show="isTyping"
          class="text-green-500 font-semibold w-fit py-2 px-4 rounded-full"
        >
          Typing...
        </p>
      </section>

      <div class="p-2 border-t border-gray-400">
        <!-- selected img previewer -->
        <div class="w-full bg-gray-100">
          <div v-if="previewImage" class="w-fit relative">
            <img class="w-40 rounded-md shadow-md mb-2" :src="previewImage" />
            <button
              class="absolute -top-2 left-full transform -translate-x-4 bg-red-500 px-2 rounded-full text-white"
              @click="(image = null), (previewImage = null)"
            >
              <i class="-mt-4 fa fa-times"></i>
            </button>
          </div>
        </div>
        <label class="flex items-center">
          <label
            class="hover:cursor-pointer bg-blue-500 text-center p-1 mr-2 rounded-lg text-white"
          >
            <i class="ml-2 fas fa-image mr-2"></i>
            <input
              type="file"
              class="hidden"
              accept="image/png, image/jpeg"
              multiple
              @change="imgSelected"
            />
          </label>
          <input
            type="text"
            placeholder="Write Something..."
            class="w-full focus:outline-none"
            v-model="message"
            @keydown="typing"
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
import { mapGetters } from "vuex";
import TheImg from "@/components/utils/TheImg.vue";
export default {
  name: "TheChatWindow",
  components: {
    TheImg,
  },
  props: {
    isTyping: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      greeting: null,
      message: "",
      image: null,
      previewImage: null,
      videoCall: false,
      showMenu: false,
    };
  },
  methods: {
    typing() {
      this.$emit("typing", {
        senderId: this.user._id,
        receiverId: this.receiver._id,
        conversationId: this.currentConversation._id,
      });
    },

    sendMessage() {
      let msgObject;
      if (this.image) {
        msgObject = {
          message: {
            image: this.image,
            caption: this.message,
          },
          senderId: this.user._id,
          receiverId: this.receiver._id,
          conversationId: this.currentConversation._id,
          time: new Date(),
        };
        this.$emit("sendMessage", msgObject);
        this.$store.commit("ADD_NEW_MESSAGES", {
          ...msgObject,
          received: false,
        });
      } else {
        if (this.message.length <= 0) return;
        msgObject = {
          conversationId: this.currentConversation._id,
          receiverId: this.receiver._id,
          senderId: this.user._id,
          message: this.message,
          time: new Date(),
        };
        this.$emit("sendMessage", msgObject);
        this.$store.commit("ADD_NEW_MESSAGES", {
          ...msgObject,
          received: false,
        });
      }
      // this.saveMessage(this.user._id, this.currentConversation._id, this.message)
      this.previewImage = null;
      this.image = null;
      this.message = "";
      this.scrollToBottom();
    },

    async saveMessage(senderId, conversationId, message) {
      try {
        await this.$store.dispatch("saveMessages", {
          senderId,
          conversationId,
          message,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteConversation(conversationId) {
      try {
        await this.$store.dispatch("deleteConversation", conversationId);
        this.$store.commit("REMOVE_CURRENT_CONVERSATION");
      } catch (error) {
        console.log(error.message);
      }
    },

    loadConversation() {
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
        return "just now";
      }
      if (diff < 3600) {
        return Math.round(diff / 60) + " minutes ago";
      }
      if (diff < 86400) {
        return Math.round(diff / 3600) + " hours ago";
      }
      if (diff < 604800) {
        return Math.round(diff / 86400) + " days ago";
      }
      if (diff < 2592000) {
        return Math.round(diff / 604800) + " weeks ago";
      }
      if (diff < 31536000) {
        return Math.round(diff / 2592000) + " months ago";
      }
      if (diff < 315360000) {
        return Math.round(diff / 31536000) + " years ago";
      }
      return time.toDateString();
    },
  },
  updated() {
    this.scrollToBottom();
  },
  computed: {
    ...mapGetters([
      "user",
      "users",
      "currentConversation",
      "connections",
      "messages",
    ]),
    receiver() {
      const participants = this.currentConversation.participants;
      const receiverId = participants.filter(
        (participant) => participant != this.user._id
      );
      return this.users.find((connection) => connection._id == receiverId[0]);
    },
  },
  watch: {
    currentConversation(newVal) {
      if (newVal) {
        this.loadConversation();
      }
    },
  },
  mounted() {
    this.loadConversation();
    this.scrollToBottom();
  },
};
</script>
