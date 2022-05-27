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

        <form @click.prevent="updateAccount" class="flex flex-col mb-2">
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
import validateInput from "@/utils/validateInput.js";
export default {
  name: "SettingsView",
  components: { TheProfileSidebar, ThePeopelYouMayKnow, TheDiscussions, TheAlertSnackbar, TheSpinner },
  data() {
    return {

      username: "",
      name: "",
      bio: "",
      generalUpdating: false,

      email: "",
      password: "",
      Cpassword: "",
      accountUpdating: false,

      deletingAccount: false,
    }
  },
  methods: {
    async updateGeneral() {
      try{
        // if only the username is changed then we can just update the username
        if(this.username !== this.user.username){
          this.generalUpdating = true;
          if(validateInput(this.username, "username")){
            // await this.$store.dispatch("updateUser", {username: this.username});
            this.generalUpdating = false;
            this.$refs.alertSnackbar.show("Username updated successfully", "success");
          }
        }
        // // if the name is changed then we need to update the name and the username
        // else if(this.name !== this.user.name){
        //   this.generalUpdating = true;
        //   if(validateInput(this.name, "name")){
        //     // await this.$store.dispatch("updateUser", {name: this.name});
        //     this.generalUpdating = false;
        //     this.$refs.alertSnackbar.show("Name updated successfully", "success");
        //   }
        // }
        // // if the bio is changed then we need to update the bio
        // else if(this.bio !== this.user.bio){
        //   this.generalUpdating = true;
        //   if(validateInput(this.bio, "bio")){
        //     // await this.$store.dispatch("updateUser", {bio: this.bio});
        //     this.generalUpdating = false;
        //     this.$refs.alertSnackbar.show("Bio updated successfully", "success");
        //   }
        // }
      }catch(error){
        console.log(error)
        this.generalUpdating = false;
        this.$refs.alertSnackbar.show(
          error.message,
          "error"
        );
      }

    },
    async updateAccount() {
      try {
        // if the email is changed then we need to update the email
        if(this.email !== this.user.email){
          this.accountUpdating = true;
          if(validateInput(this.email, "email")){
            await this.$store.dispatch("updateUser", {email: this.email});
            this.accountUpdating = false;
            this.$refs.alertSnackbar.show("Email updated successfully");
          }
        }
        // if the password is changed then we need to update the password
        else if(this.password !== ""){
          this.accountUpdating = true;
          if(validateInput(this.password, "password")){
            await this.$store.dispatch("updateUser", {password: this.password});
            this.accountUpdating = false;
            this.$refs.alertSnackbar.show("Password updated successfully");
          }
        }
      } catch (error) {
        console.log(error)
        this.$refs.alertSnackbar.show({
          message: error.message,
          type: "error"
        });
      }
    },
    async deleteMe() {
      try {
        this.deletingAccount = true;
        await this.$store.dispatch("deleteUser");
        this.deletingAccount = false;
        this.$refs.alertSnackbar.show("Account deleted successfully");
      } catch (error) {
        console.log(error)
        this.$refs.alertSnackbar.show({
          message: error.message,
          type: "error"
        });
      }
    },
  },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>

<style>
</style>