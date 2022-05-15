<template>
  <section
    class="w-full h-screen flex justify-center content-center bg-gray-50"
  >
    <form
      @submit.prevent="login"
      class="rounded bg-white w-fit h-fit p-6 shadow-md"
      ref="loginForm"
    >
      <h1 class="text-2xl mb-4">Social Network | Login</h1>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div class="mt-4 mb-2 flex justify-center">
        <button
          type="submit"
          name="submit"
          class="
            bg-blue-400
            hover:bg-blue-700
            text-white
            w-full
            font-bold
            py-2
            px-4
            rounded
          "
        >
          Login
        </button>
      </div>
      <p>Don't have account? <a class="text-blue-600">Create Account</a></p>
    </form>
  </section>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      pending:false,
    };
  },
  methods: {
    login() {
      this.pending = true;
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then((res) => {
        // set the token in the local storage
        localStorage.setItem("token", res.data.token);
        this.$router.push("/");
      }).catch(() => {
        this.pending = false;
      });
    },
  },
};
</script>

<style>
</style>