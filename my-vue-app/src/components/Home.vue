<template>
  <div>
    <nav class="container bg-red-400">
      <ul class="list-none flex flex-row">
        <li>
          <router-link :to="loginComponent">login</router-link>
        </li>
        <li>
          <router-link :to="registerComponent">register</router-link>
        </li>
      </ul>
    </nav>
    <h1>{{ userName }}</h1>
    <h1>{{ userEmail }}</h1>
    <h1>{{ userId }}</h1>
  </div>
</template>

<script>
import { ref } from "vue";
import { userAuthStore } from "../pinia.ts";
export default {
  setup() {
    const userEmail = ref("");
    const userName = ref("");
    const userId = ref("");
    const loginComponent = { name: "login" };
    const registerComponent = { name: "register" };
    
    const store = userAuthStore();
    const userDetail = store.getUserDetail;
    userId.value = userDetail.userId;
    userEmail.value = userDetail.email;

    return {
      userEmail,
      userName,
      userId,
      loginComponent,
      registerComponent,
    };
  },
};
</script>

<style>
</style>