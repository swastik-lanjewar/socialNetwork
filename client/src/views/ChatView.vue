<template>
  <main class="w-3/4 flex justify-between md:p-3 min-h-90 max-h-90 relative">
    
    <TheChatWindow v-if="currentConversation" :isTyping="isTyping" @sendMessage="sendMessage" @typing="typing" />
    <div class="text-4xl font-bold text-gray-300 capitalize" v-else>
      Please select a conversation
    </div>

    <aside class="w-1/3 mr-7 hidden md:block">
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
    }
  },
  computed: {
    ...mapGetters(["user", "conversations", "currentConversation"]),
  },
  async created() {
    try {
      if(this.conversations.length <= 0) {
        await this.$store.dispatch("getConversations");
        // this.currentConversation = this.conversations[0];
      }
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
    }
  },
  components: { TheChatWindow, TheConversation },
};
</script>

<style></style>
