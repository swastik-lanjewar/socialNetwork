<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex justify-center w-full"
        @click="showMenu = !showMenu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <i class="fas fa-solid fa-bell"></i>
      </button>
    </div>

    <div
      class="origin-top-right absolute right-0 mt p-2 w-60 rounded-md shadow-lg bg-white border text-black"
      :class="{ hidden: !showMenu }"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <h3 class="font-bold">Notifications</h3>
      <section>
        <h3>New</h3>
        <ul>
          <li
            class="flex border-b last:border-b-0 py-1 my-1 hover:cursor-pointer hover:bg-gray-200"
            v-for="n in newNotification"
            :key="n.text"
          >
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="n.picture" alt="" />
            </div>
            <div class="pl-2 flex items-center">
              <p>{{ n.text }}</p>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h3>Read</h3>
        <ul>
          <li
            class="flex border-b last:border-b-0 py-1 my-1 hover:cursor-pointer hover:bg-gray-200"
            v-for="n in readNotification"
            :key="n.text"
          >
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="n.picture" alt="" />
            </div>
            <div class="pl-2 flex items-center">
              <p>{{ n.text }}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNotificationPanel",
  data() {
    return {
      showMenu: false,
      readNotification: [
        {
          picture: "https://source.unsplash.com/random/200x200/?girl",
          text: "Hacker101 liked you picture.",
        },
        {
          picture: "https://source.unsplash.com/random/200x200/?girl",
          text: "Hacker101 liked you picture.",
        },
      ],
      newNotification: [
        {
          picture: "https://source.unsplash.com/random/200x200/?girl",
          text: "Dharm texted you, Hi!",
        },
        {
          picture: "https://source.unsplash.com/random/200x200/?girl",
          text: "Hacker101 liked you picture.",
        },
      ],
    };
  },
};
</script>

<style></style>
