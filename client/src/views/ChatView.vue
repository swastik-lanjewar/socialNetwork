<template>
  <main class="flex justify-between p-3 min-h-90 max-h-90">
   <TheProfileSidebar
      :username="user.username"
      :name="user.name"
      :bio="user.bio"
    />

    <TheChatWindow />

    

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
  data() {
    return {
      pre_conv: [
        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: false,
        },

        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: false,
        },

        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: false,
        },

        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: true,
        },

        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: false,
        },

        {
          conv_id: "1",
          user: "Aniket Singh",
          avatar:
            "https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200",
          active: false,
        },
      ],
      curr_conv: [
        {
          conv_id: "1",
          user: "Aniket Singh",
          msg: "Hello",
          time: "12:00",
        },
        {
          conv_id: "2",
          user: "Jin Keguar",
          msg: "Hello",
          time: "12:00",
        },
        {
          conv_id: "3",
          user: "Jin Keguar",
          msg: "Hello",
          time: "12:00",
        },
      ],
      peopleYouMayKnow: [
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Aniket Singh",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Swastik Lanjewar",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Suyash bhalerao",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "pranav jaid",
          link: "",
        },
      ],
    };
  },
  computed:{
    ...mapGetters(['user', 'conversations']),
  },
  created(){
    this.$store.dispatch('getConversations').then(res => {
      this.$store.commit("SET_CONVERSATIONS", res.data.conversations);
    }).catch(err => {
      console.log(err)
    })
  },
  components: { TheChatWindow, TheProfileSidebar, TheConversation },
};
</script>

<style>
</style>