<template>
  <div class="shadow-md rounded-md lg:min-w-fit my-4 w-full">
    <article v-if="post.image != ''" class="">
      <header class="flex justify-between px-2">
        <div class="flex items-center">
          <img
            v-if="
              users?.filter((u) => u._id == post.userId)[0].profilePicture !=
              null
            "
            class="w-10 h-10 rounded-full"
            :src="users?.filter((u) => u._id == post.userId)[0].profilePicture"
            alt=""
            loading="lazy"
          />
          <img
            v-else
            class="w-10 h-10 rounded-full"
            src="../assets/noAvatar.png"
            alt=""
            loading="lazy"
          />
          <div class="pl-4">
            <h2 class="font-semibold">
              {{ users?.filter((u) => u._id == post.userId)[0].username }}
            </h2>
            <h2 class="text-gray-700">
              {{ users?.filter((u) => u._id == post.userId)[0].name }}
            </h2>
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
            class="
              origin-top-right
              absolute
              right-0
              mt
              w-40
              rounded-md
              shadow-lg
              bg-white
              border
            "
            :class="{ hidden: !showMenu }"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <button
                v-if="myPost"
                class="
                  text-gray-700
                  block
                  px-4
                  py-2
                  text-sm
                  hover:bg-gray-100
                  w-full
                  text-left
                "
                role="menuitem"
                tabindex="-1"
                @click="deletePost(post._id)"
              >
                <i class="fab fa-solid fa-trash mr-2"></i>
                Delete Post
              </button>
              <button
                class="
                  text-gray-700
                  block
                  px-4
                  py-2
                  text-sm
                  hover:bg-gray-100
                  w-full
                  text-left
                "
                role="menuitem"
                tabindex="-1"
              >
                <i class="fab fa-regular fa-file mr-2"></i>
                Support
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="">
        <img class="w-full" :src="post.image" alt="post image" loading="lazy" />
      </main>
      <div class="flex justify-between py-2 px-4">
        <div class="flex">
          <button
            class="flex text-gray-700 text-sm mr-3"
            @click="likeHandler(post.likes.includes(user._id))"
          >
            <div class="flex items-center">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                :stroke="post.likes.includes(user._id) ? 'red' : 'currentColor'"
                :class="post.likes.includes(user._id) ? 'fill-red-500' : ''"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{{ post.likes?.length }}</span>
            </div>
          </button>
          <button class="">
            <div class="flex items-center text-gray-700 text-sm mr-8">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span>8</span>
            </div>
          </button>
        </div>
        <button class="ml-2">
          <i class="fab fa-regular fa-bookmark"></i>
        </button>
      </div>
      <div class="px-4 pb-2">
        <p class="text-gray-600 text-sm">
          <span class="font-semibold text-gray-800">{{
            users?.filter((u) => u._id == post.userId)[0].username
          }}</span>
          {{ post.content }}
        </p>
        <p class="text-xs text-gray-500">{{ timeAgo(post.createdAt) }}</p>
      </div>
    </article>

    <!-- Textual Posts are rendered here -->
    <div v-else class="flex p-2">
      <img
        v-if="
          users?.filter((u) => u._id == post.userId)[0].profilePicture != ''
        "
        class="w-10 h-10 rounded-full object-cover mr-4 shadow"
        :src="users?.filter((u) => u._id == post.userId)[0].profilePicture"
        alt="avatar"
         loading="lazy"
      />
      <img
        v-else
        class="w-12 h-12 rounded-full object-cover mr-4 shadow"
        src="../assets/noAvatar.png"
        alt="avatar"
        loading="lazy"
      />

      <div class="w-full">

        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 -mt-1">
            {{ users?.filter((u) => u._id == post.userId)[0].username }}
          </h2>
          <div class="flex">
            <div class="relative">
              <small class="text-sm text-gray-700 pr-2">{{
                timeAgo(post.createdAt)
              }}</small>
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
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt
                  w-40
                  rounded-md
                  shadow-lg
                  bg-white
                  border
                "
                :class="{ hidden: !showMenu }"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <button
                    v-if="myPost"
                    class="
                      text-gray-700
                      block
                      px-4
                      py-2
                      text-sm
                      hover:bg-gray-100
                      w-full
                      text-left
                    "
                    role="menuitem"
                    tabindex="-1"
                    @click="deletePost(post._id)"
                  >
                    <i class="fab fa-solid fa-trash mr-2"></i>
                    Delete Post
                  </button>
                  <button
                    class="
                      text-gray-700
                      block
                      px-4
                      py-2
                      text-sm
                      hover:bg-gray-100
                      w-full
                      text-left
                    "
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
        </div>

        <p class="text-gray-700">
          {{ users?.filter((u) => u._id == post.userId)[0].name }}
        </p>

        <p class="mt-3 text-gray-700 text-sm">
          {{ post.content }}
        </p>

        <div class="mt-4 flex items-center justify-around">

          <button
            class="flex text-gray-700 text-sm mr-3 text-center"
            @click="likeHandler(post.likes.includes(user._id))"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              :stroke="post.likes.includes(user._id) ? 'red' : 'currentColor'"
              :class="post.likes.includes(user._id) ? 'fill-red-500' : ''"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{{ post.likes?.length }}</span>
          </button>

          <button class="flex text-gray-700 text-sm mr-8 text-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>8</span>
          </button>

          <button class="flex text-gray-700 text-sm mr-4 text-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>share</span>
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThePost",
  props: {
    post: {
      type: Object,
    },
    myPost: {
      type: Boolean,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["user", "users"]),
  },
  methods: {
    async likeHandler(isLiked) {
      if (isLiked === true) {
        await this.$store.dispatch("unlikePost", this.post._id);
      } else {
        await this.$store.dispatch("likePost", this.post._id);
      }
    },
    async deletePost() {
      this.showMenu = false;
      await this.$store.dispatch("deletePost", this.post._id);
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
};
</script>