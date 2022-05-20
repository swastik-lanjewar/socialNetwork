<template>
  <main class="flex justify-between p-3 min-h-90 max-h-90">
   <TheProfileSidebar
      :username="user.username"
      :name="user.name"
      :bio="user.bio"
    />

    <TheChatWindow />

    

    <aside class="w-1/4 mr-7 hidden md:block">
      <div class="rounded-md shadow-md p-2 overflow-y-auto">
        <h3 class="font-semibold m-2">Conversations</h3>
        <ul>
          <li
            v-for="(item, index) in pre_conv"
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
          >
            <img class="w-1/6 rounded-full mr-4" :src="item.avatar" alt="" />
            <div class="w-full">
              <button>{{ item.user }}</button>
              <div class="w-full flex justify-between items-center">
                <p class="text-sm text-gray-700">Hi!</p>
                <span class="text-xs text-gray-500">10:31 AM</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </main>
</template>

<script>
import TheChatWindow from "@/components/TheChatWindow.vue";
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import { mapGetters } from "vuex";
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
    ...mapGetters(['user']),
  },
  components: { TheChatWindow, TheProfileSidebar },
};
</script>

<style>
</style>