<template>
  <div>
    <div class="shadow-md rounded-md w-full lg:min-w-fit">
      <div class="flex justify-between p-4">
        <div class="flex items-center">
          <img
            class="w-1/12 rounded-full"
            src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
            alt=""
          />
          <h2 class="pl-2 font-semibold">{{ "name"}}</h2>
        </div>
        <button>
          <i class="fab fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
      <div class="">
        <img
          class="w-full"
          src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
          alt=""
        />
      </div>
      <div class="flex justify-between py-2 px-4">
        <div>
          <button class="mr-4">
            <div class="flex items-center  text-gray-700 text-sm mr-3">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1 fill-red-500"
                stroke="fill-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>12</span>
            </div>
          </button>
          <button class="">
            <div class="flex items-center  text-gray-700 text-sm mr-8">
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
          <span class="font-semibold text-gray-800">hacker101</span> Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Laborum, consequuntur.
        </p>
        <p class="text-xs text-gray-500">2 hrs ago</p>
      </div>
    </div>

    <div class=" bg-white shadow-md rounded-md my-2 ">
      <!--horizantil margin is just for display-->
      <div class="flex justify-between px-4 py-6">
        <img
          class="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div class=" w-full ">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 -mt-1">{{ "name" }}</h2>
            <small class="text-sm text-gray-700">22h ago</small>
          </div>
          <p class="text-gray-700">Joined 12 SEP 2012.</p>
          <p class="mt-3 text-gray-700 text-sm">
            {{ post.content}}
            
          </p>
          <div class="mt-4 flex items-center justify-around">
            <button class="flex  text-gray-700 text-sm mr-3">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                :stroke=" post.likes.includes(user._id) ? 'red' : 'currentColor' "
                :class=" post.likes.includes(user._id) ? 'fill-red-500' : '' "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{{ post.likes.length }}</span>
            </button>
            <button class="flex  text-gray-700 text-sm mr-8">
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
            <button class="flex  text-gray-700 text-sm mr-4">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "ThePost",
  props: {
    post: {
      type: Object,
      // required: true,
    },
  },
  computed:{
    ...mapGetters(["user"]),
  },
  methods:{
   
  }
};
</script>

<style>
</style>