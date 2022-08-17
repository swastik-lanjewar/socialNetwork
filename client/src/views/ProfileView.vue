<template>
  <main class="flex justify-between md:p-3">

    <section
      class="
        w-full
        md:w-1/2
        flex flex-col
        items-center
        md:px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      "
    >
      <article class="bg-white shadow-md rounded-md w-full px-4">
        <div class="w-full flex flex-col items-center">
          <img
            v-if="profileUser.profilePicture != ''"
            class="rounded-md max-h-40"
            :src="profileUser.profilePicture"
            alt=""
            loading="lazy"
          />
          
          <img
            v-else
            class="rounded-md max-h-40"
            src="../assets/noAvatar.png"
            alt=""
            loading="lazy"
          />

          <h2 class="text-2xl text-gray-800 font-semibold my-2">
            {{ profileUser.username }} @ {{ profileUser.name }} 
          </h2>
          <div class="w-full flex justify-evenly mt-4">
            <div class="text-center hover:cursor-pointer">
              <h1 class="font-semibold text-gray-800">{{profileUser.posts.length}}</h1>
              <h1 class="font-semibold text-gray-600">Posts</h1>
            </div>
            <div class="text-center">
              <h1 class="font-semibold text-gray-800">{{profileUser.connections.length }}</h1>
              <h1 class="font-semibold text-gray-600">Connections</h1>
            </div>
            <button
              class="bg-blue-700 px-4 text-white font-semibold rounded-md"
            >
              connect
            </button>
          </div>
        </div>
        <div class="my-6">
          <p class="text-gray-600">
            {{ profileUser.bio }}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-600">Mutual Connections</h4>
          <div class="w-full flex justify-between">
            <div class="w-1/2 flex justify-evenly items-center my-2">
              <img
                class="w-20 h-20 rounded-lg"
                src="https://source.unsplash.com/random/200x200/?girl"
                alt=""
                loading="lazy"
              />
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Hacker101</h3>
              <button
                class="
                  bg-blue-700
                  text-white
                  py-2
                  px-4
                  rounded-md
                  font-semibold
                "
              >
                Connect
              </button>
                </div>
            </div>
            <div class="w-1/2 flex justify-evenly items-center my-2">
              <img
                class="w-20 h-20 rounded-lg"
                src="https://source.unsplash.com/random/200x200/?girl"
                alt=""
                loading="lazy"

              />
                <div>

                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Hacker101</h3>
              <button
                class="
                  bg-blue-700
                  text-white
                  py-2
                  px-4
                  rounded-md
                  font-semibold
                "
              >
                Connect
              </button>
                </div>
            </div>
            
          </div>
        </div>
        <div class="my-4">
            <h4 class="text-sm font-semibold text-gray-600">Posts</h4>
          <ThePost :post="posts[0]" />
        </div>
      </article>
    </section>

    <aside class="w-1/4 mr-7 hidden md:block">
      <ThePeopelYouMayKnow />
      <TheDiscussions />
    </aside>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import TheDiscussions from "@/components/TheDiscussions.vue";
import ThePeopelYouMayKnow from "../components/ThePeopleYouMayKnow.vue";
import ThePost from "@/components/ThePost.vue";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(["user", "posts",'users' ]),
    profileUser(){
      return this.users.find(user => user.username === this.$route.params.id)
    }
  },
  props:['id'],
  components: {
    TheDiscussions,
    ThePeopelYouMayKnow,
    ThePost,
  },
};
</script>

<style>
</style>