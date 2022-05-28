<template>
  <main class="flex justify-between p-3">
    <TheProfileSidebar />
    <section class=" w-full
        md:w-1/2
        flex flex-col
        items-center
        px-1
        md:px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll">

      <section class="pb-10">
        <form @submit.prevent="updateGeneral" class="flex flex-col mb-2">
          <h4 class="text-2xl font-light">General Settings</h4>
          <div class="flex flex-col">
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Username</span>
              <input type="text" class="w-full border border-gray-300 
                rounded-md px-3 py-2
                " :placeholder="user.username" v-model="username" />
            </label>
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Name</span>
              <input type="text" class="w-full border border-gray-300 rounded-md px-3 py-2" v-model="name"
                :placeholder="user.name" />
            </label>
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Bio</span>
              <textarea class="w-full border border-gray-300 rounded-md px-3 py-2" v-model="bio"
                :placeholder="user?.bio" />
            </label>
          </div>
          <div>
            <button type="submit" class="btn-submit" :disabled="generalUpdating">
              <span v-if="!generalUpdating"> Save </span>
              <TheSpinner text="Saving..." v-if="generalUpdating" />
            </button>
          </div>
        </form>

        <div class="py-2 pb-4">
          <label class="text-gray-700 my-2">
            <span class="font-semibold">Profile Picture</span>
            <input type="file" class="w-full border border-gray-300 rounded-md px-3 py-2" accept="image/png, image/jpeg"
              @change="uploadProfilePciture" />
          </label>
        </div>

        <form @submit.prevent="updateAccount" class="flex flex-col mb-2">
          <h4 class="text-2xl font-light mt-3">Accounts</h4>
          <div class="flex flex-col">
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Email</span>
              <input type="email" class="w-full border border-gray-300 rounded-md px-3 py-2" v-model="email"
                :placeholder="user.email" />
            </label>
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Password</span>
              <input type="password" class="w-full border border-gray-300 rounded-md px-3 py-2 my-2" v-model="password"
                placeholder="Enter new password" />
            </label>
            <label class="text-gray-700 my-2">
              <span class="font-semibold">Confirm Password</span>
              <input type="password" class="w-full border border-gray-300 rounded-md px-3 py-2 my-2" v-model="Cpassword"
                placeholder="Confirm new password" />
            </label>
          </div>
          <div>

            <button type="sumbit" class="btn-submit" :disabled="accountUpdating">
              <span v-if="!accountUpdating"> Save </span>
              <TheSpinner text="Saving..." v-if="accountUpdating" />
            </button>
          </div>
        </form>
        <article class="flex flex-col">
          <h4 class="text-2xl font-thin my-2">Danger Zone</h4>
          <div>
            <button @click="deleteMe" :disabled="deletingAccount"
              class="my-1 w-full bg-red-700 text-white font-semibold px-2 py-2 rounded-md shadow-md">
              <span v-if="!deletingAccount"> Delete My Account </span>
              <TheSpinner text="Deleting..." v-if="deletingAccount" />
            </button>
          </div>
        </article>
      </section>
    </section>
    <aside class="w-1/4 mr-7 hidden md:block">
      <ThePeopelYouMayKnow />
      <TheDiscussions />
    </aside>
    <TheAlertSnackbar ref="alertSnackbar" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import TheProfileSidebar from "../components/TheProfileSidebar.vue";
import ThePeopelYouMayKnow from "@/components/ThePeopelYouMayKnow.vue";
import TheAlertSnackbar from "@/components/utils/TheAlertSnackbar.vue";
import TheDiscussions from "@/components/TheDiscussions.vue";
import TheSpinner from "@/components/utils/TheSpinner.vue";
export default {
  name: "SettingsView",
  components: { TheProfileSidebar, ThePeopelYouMayKnow, TheDiscussions, TheAlertSnackbar, TheSpinner },
  data() {
    return {

      username: "",
      name: "",
      bio: "",
      generalUpdating: false,

      uploadingProfilePicture: false,

      email: "",
      password: "",
      Cpassword: "",
      accountUpdating: false,

      deletingAccount: false,
    }
  },
  methods: {
    async updateGeneral() {
      try {
        this.generalUpdating = true
        await this.$store.dispatch("updateUser", {
          username: this.username || this.user.username,
          name: this.name || this.user.name,
          bio: this.bio || this.user.bio
        })

        this.$refs.alertSnackbar.show(
          "Successfully updated your profile",
          "success"
        );

        this.generalUpdating = false
        // clear the form
        this.username = ""
        this.name = ""
        this.bio = ""

      } catch (error) {
        console.log(error)
        console.error(error)
        this.generalUpdating = false;
        this.$refs.alertSnackbar.show(
          "Failed to update your profile",
          "error"
        );
      }
    },
    async uploadProfilePciture(event) {
      try {
        this.uploadingProfilePicture = true;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        // await this.$store.dispatch("uploadProfilePicture", formData);
        this.uploadingProfilePicture = false;
      } catch (error) {
        this.uploadingProfilePicture = false;
        this.$refs.alertSnackbar.show(
          error.message,
          "error"
        );
      }
    },
    async updateAccount() {
      try {

        this.accountUpdating = true;
        await this.$store.dispatch("updateUser", {
          email: this.email || this.user.email,
          password: this.password || this.user.password,
        })

        this.$refs.alertSnackbar.show(
          "Successfully updated your account",
          "success"
        );

        this.accountUpdating = false;
        // clear the form
        this.email = ""
        this.password = ""
        this.Cpassword = ""

      } catch (error) {
        this.accountUpdating = false;
        this.$refs.alertSnackbar.show(
          "error",
          "Failed to update your account",
        );
      }
    },
    async deleteMe() {
      try {
        this.deletingAccount = true;
        await this.$store.dispatch("deleteUser");
        this.deletingAccount = false;
        this.$refs.alertSnackbar.show("Account deleted successfully");
        this.$router.push("/");
      } catch (error) {
        console.log(error)
        this.deletingAccount = false;
        this.$refs.alertSnackbar.show(
          "error", 
          "Failed to delete your account"
        );
      }
    },

  },
  computed: {
    ...mapGetters(['user'])
  },
};
</script>

<style>
</style>