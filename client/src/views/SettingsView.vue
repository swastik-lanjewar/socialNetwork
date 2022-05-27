<template>
  <main class="flex justify-between p-3">
    <TheProfileSidebar />
    <section class="w-full md:w-1/2 flex flex-col items-center px-6">
      <div class="shadow-md bg-white rounded-md w-full p-3">
        <h1 class="font-semibold text-gray-700">Settings</h1>
      </div>
      <section>
        <article class="flex flex-col">
          <h4 class="text-2xl font-light">General Settings</h4>
          <div class="flex flex-col">
            <label class="text-gray-700">
              <span class="font-semibold">Username</span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </label>
            <label class="text-gray-700">
              <span class="font-semibold">Name</span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </label>
            <label class="text-gray-700">
              <span class="font-semibold">Bio</span>
              <textarea
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </label>
          </div>
          <div>
            <button class="btn-submit">Save</button>
          </div>
        </article>
        <article class="flex flex-col">
          <h4 class="text-2xl font-light">Accounts</h4>
          <div class="flex flex-col">
            <label class="text-gray-700">
              <span class="font-semibold">Email</span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </label>
            <label class="text-gray-700">
              <span class="font-semibold">Password</span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </label>
          </div>
          <div>
            <button class="btn-submit">Save</button>
          </div>
        </article>
        <article class="flex flex-col">
          <h4 class="text-2xl font-light">Danger Zone</h4>
          
          <div>
            <button class="btn-submit bg-red-400">Delete Your Account</button>
          </div>
        </article>
      </section>
    </section>
    <aside class="w-1/4 mr-7 hidden md:block">
      <ThePeopelYouMayKnow />
      <TheDiscussions />
    </aside>
  </main>
</template>

<script>
import TheProfileSidebar from "../components/TheProfileSidebar.vue";
import ThePeopelYouMayKnow from "@/components/ThePeopelYouMayKnow.vue";
import TheDiscussions from "@/components/TheDiscussions.vue";
export default {
  name: "SettingsView",
  components: { TheProfileSidebar, ThePeopelYouMayKnow, TheDiscussions },
};
</script>

<style>
</style>