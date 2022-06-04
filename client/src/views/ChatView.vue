<template>
  <main class="flex justify-between md:p-3 min-h-90 max-h-90">
    <TheProfileSidebar />

    <TheChatWindow v-if="currentConversation" />

    <div class="text-4xl font-bold text-gray-300 capitalize" v-else>
      Please select a conversation
    </div>

    <aside class="w-1/4 mr-7 hidden md:block">
      <TheConversation :conversations="conversations" />
    </aside>
  </main>
</template>

<script>
import TheChatWindow from "@/components/TheChatWindow.vue";
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import { mapGetters } from "vuex";
import TheConversation from "@/components/TheConversation.vue";
export default {
  name: "ChatView",
  computed: {
    ...mapGetters(["user", "conversations", "currentConversation"]),
  },
  async created() {
    try {
      await this.$store.dispatch("getConversations")  
    } catch (error) {
      console.log(error)
    }
  },
  components: { TheChatWindow, TheProfileSidebar, TheConversation },
};
</script>

<style>
</style>