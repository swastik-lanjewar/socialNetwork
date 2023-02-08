<template>
  <main class="w-3/4 flex justify-between md:p-3 min-h-90 max-h-90 relative">
    <TheChatWindow
      v-if="currentConversation"
      :isTyping="isTyping"
      @sendMessage="sendMessage"
      @typing="typing"
      @videoCall="videoCall"
    />
    <div class="text-4xl font-bold text-gray-300 capitalize" v-else>
      Please select a conversation
    </div>

    <aside class="w-1/3 mr-7 hidden md:block">
      <div class="flex justify-between">
        <button class="bg-blue-700 text-white p-2 rounded-md shadow-lg font-semibold">New Discussion</button>
      </div>
      <div class="rounded-md shadow-md p-2 overflow-y-auto">
        <h3 class="font-semibold m-2">Discussions</h3>
        <ul>
          <li
            class="p-2 flex justify-start items-center hover:bg-sky-400 hover:text-white cursor-pointer rounded-md border-b border-gray-100"
            @click="selectConversation(item)"
          >
            <div class="relative w-14">
              <img
                class="rounded-full w-10 h-10 object-cover"
                src="../assets/noAvatar.png"
                loading="lazy"
                alt=""
              />
              <div
                class="absolute -right-3 bottom-5 h-4 w-4 sm:top-2 rounded-full border-2 border-white bg-green-400 sm:invisible md:visible"
              ></div>
            </div>
            <div class="w-full ml-4">
              <button>#Javascript</button>
              <div class="w-full flex justify-between items-center">
                <p class="text-sm text-gray-700">Hi!</p>
                <span class="text-xs text-gray-500">10:31 AM</span>
              </div>
            </div>
          </li>
          <li
            class="p-2 flex justify-start items-center hover:bg-sky-400 hover:text-white cursor-pointer rounded-md border-b border-gray-100"
            @click="selectConversation(item)"
          >
            <div class="relative w-14">
              <img
                class="rounded-full w-10 h-10 object-cover"
                src="../assets/noAvatar.png"
                loading="lazy"
                alt=""
              />
              <div
                class="absolute -right-3 bottom-5 h-4 w-4 sm:top-2 rounded-full border-2 border-white bg-green-400 sm:invisible md:visible"
              ></div>
            </div>
            <div class="w-full ml-4">
              <button>#GlobalWarming</button>
              <div class="w-full flex justify-between items-center">
                <p class="text-sm text-gray-700">Hi!</p>
                <span class="text-xs text-gray-500">10:31 AM</span>
              </div>
            </div>
          </li>
        </ul>
        <!-- <div  class="text-center text-gray-500">
          <p>No Discussions yet</p>
        </div> -->
      </div>

      <TheConversation :conversations="conversations" />
    </aside>
  </main>
</template>

<script>
import TheChatWindow from "@/components/TheChatWindow.vue";
import { mapGetters } from "vuex";
import TheConversation from "@/components/TheConversation.vue";
export default {
  name: "ChatView",
  props: {
    isTyping: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["user", "conversations", "currentConversation"]),
  },
  async created() {
    try {
      await this.$store.dispatch("getConversations");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    sendMessage(message) {
      this.$emit("sendMessage", message);
    },
    typing(data) {
      this.$emit("typing", data);
    },
    videoCall() {
      this.$emit("videoCall");
    },
  },
  components: { TheChatWindow, TheConversation },
};
</script>

<style></style>
