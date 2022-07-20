<template>
  <section class="w-full h-screen flex justify-center content-center bg-gray-50">
    <form @submit.prevent="createAccount" ref="createAccountForm" class="rounded bg-white w-fit h-fit p-6 shadow-md">
      <h1 class="text-2xl mb-4">Social Network | Create Account</h1>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input type="text" v-model="name" required id="name" class="w-full border border-gray-300 rounded px-2 py-1"
          :class="{ 'border-red-500 outline-1 outline-red-500': nameError }" />
      </div>
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input type="text" v-model="username" required id="username"
          class="w-full border border-gray-300 rounded px-2 py-1"
          :class="{ 'border-red-500 outline-1 outline-red-500': usernameError }" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input type="email" v-model="email" required id="email" class="w-full border border-gray-300 rounded px-2 py-1"
          :class="{ 'border-red-500 outline-1 outline-red-500': emailError }" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
          Create Password
        </label>
        <input type="password" v-model="password" required id="password"
          class="w-full border border-gray-300 rounded px-2 py-1"
          :class="{ 'border-red-500 outline-1 outline-red-500': passwordError }" />
      </div>
      <div class="mb-4">
        <label for="cpassword" class="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input type="password" v-model="cpassword" required id="cpassword"
          class="w-full border border-gray-300 rounded px-2 py-1" :class="{
            'border-red-500 outline-1 outline-red-500': cpassword !== password,
          }" />
      </div>
      <div class="mt-4 mb-2 flex justify-center">
        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="!loading">Create Account</span>
          <TheSpinner v-else text="Please Wait..." />
        </button>
      </div>
      <p>Already Created?<router-link class="text-blue-600" to="/login"> Login</router-link></p>
    </form>
    <TheAlertSnackbar ref="alertSnackbar" />
  </section>
</template>

<script>
import TheSpinner from "../components/utils/TheSpinner.vue";
import TheAlertSnackbar from "../components/utils/TheAlertSnackbar.vue";
export default {
  name: "CreateAccountView",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      cpassword: "",
      nameError: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      loading: false,
    };
  },
  methods: {
    async createAccount() {
      if (this.password === this.cpassword) {
        try {
          this.loading = true
          const user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("createAccount", user)
          this.clearInputs();
          this.loading = false;
          this.$refs.alertSnackbar.show("success", "Account Created ");
          this.$router.push("/");
        } catch (error) {
          this.clearInputs();
          this.loading = false;
          this.$refs.alertSnackbar.show("error", error.message);
          console.log(error);
        }
      }
    },
    clearInputs() {
      this.name = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.cpassword = "";
    },
  },

  components: { TheSpinner, TheAlertSnackbar },
};
</script>

<style>
</style>