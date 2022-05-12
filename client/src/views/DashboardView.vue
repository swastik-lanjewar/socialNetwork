<template>
  <div>
    <TheNavbarVue />
    <main class="flex justify-between p-3">
      <!-- profile section -->
      <aside class="ml-7 w-1/4">
        <div class="rounded-md shadow-md p-2 flex justify-start my-2">
          <div class="w-1/6 h-1/6 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
            />
          </div>
          <div class="ml-5">
            <h2 class="font-bold">Jin Keguar</h2>
            <p>Manager</p>
          </div>
        </div>
        <div class="rounded-md shadow-md p-2 my-4">
          <ul>
            <li>Reddit</li>
            <li>Google Search</li>
            <li>TikTok Inc.</li>
            <li>Add new page</li>
          </ul>
        </div>
        <div class="rounded-md shadow-md p-2 my-2">
          <ul>
            <li>Learning</li>
            <li>Statistics</li>
            <li>Bookmarks</li>
            <li>Gaming</li>
            <li>Share</li>
          </ul>
        </div>
      </aside>
      <!-- post section -->
      <section class="w-1/2 flex flex-col items-center p-6">
        <!-- new post section -->
        <div class="shadow-md rounded-md w-full mb-2">
          <div class="border-b border-gray-400 p-4">
            <label for="writeSomething">
              <input
                id="writeSomething"
                type="text"
                placeholder="Write Something..."
                class="w-full focus:outline-none"
              />
            </label>
          </div>
          <div class="p-4 flex justify-between">
            <button>
              <i class="fab fa-regular fa-image"></i>
              Photo
            </button>
            <button>
              <i class="fab fa-solid fa-video"></i>
              Video
            </button>
            <button>
              <i class="fab fa-regular fa-calendar"></i>
              Event
            </button>
            <button>
              <i class="fab fa-solid fa-location"></i>
              Location
            </button>
          </div>
        </div>

        <!-- // post section -->
        <div class="shadow-md rounded-md w-fit">
          <div class="flex justify-between p-4">
            <div class="flex items-center">
              <img
                class="w-1/12 rounded-full"
                src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
                alt=""
              />
              <h2 class="pl-2 font-semibold">Prelly Kilman</h2>
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
                <i class="fab fa-regular fa-heart"></i>
              </button>
              <button class="">
                <i class="fab fa-regular fa-comment"></i>
              </button>
            </div>
            <button class="ml-2">
              <i class="fab fa-regular fa-bookmark"></i>
            </button>
          </div>
        </div>
      </section>

      <aside class="w-1/4 mr-7">
        <section class="rounded-md shadow-md p-3 w-fit my-2">
          <h2 class="font-bold mb-4 text-gray-700">People You May know</h2>
          <ul>
            <li
              class="flex w-full justify-start my-2 items-center px-2"
              v-for="suggestion in peopleYouMayKnow"
              :key="suggestion.name"
            >
              <img class="w-1/12 rounded-full" :src="suggestion.img" alt="" />
              <h2 class="font-semibold mx-4 w-full">{{ suggestion.name }}</h2>
              <button
                class="bg-blue-200 rounded p-1 text-blue-600 font-semibold"
              >
                Connect
              </button>
            </li>
          </ul>
        </section>

        <section class="rounded-md shadow-md p-3 w-fit my-2">
          <h2 class="font-bold mb-4 text-gray-700">Join discussion</h2>

          <ul>
            <li
              class="flex w-full justify-between my-2 items-center px-2"
              v-for="discussion in discussions"
              :key="discussion.title"
            >
              <div>
                <h2 class="font-semibold">{{ discussion.title }}</h2>
                <p class="text-gray-500">{{ discussion.posts }}</p>
              </div>
              <img class="w-1/12 rounded-full" :src="discussion.link" alt="" />
            </li>
          </ul>
        </section>
      </aside>
    </main>
  </div>
</template>

<script>
import TheNavbarVue from "@/components/TheNavbar.vue";
export default {
  name: "DashboardView",
  components:{
    TheNavbarVue
  },
  data() {
    return {
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
      discussions: [
        {
          title: "#javacript",
          posts: 500,
          link: "https:source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#globawarming",
          posts: 20,
          link: "https:source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#tech_bubble_bursting",
          posts: 530,
          link: "https:source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#puppu_pagal_hai",
          posts: 675,
          link: "https:source.unsplash.com/random/200x200/?profile",
        },
      ],
    };
  },
};
</script>

<style>
</style>