<template>
  <div class="h-full flex items-center">
    <div
      class="
        flex flex-col
        justify-center
        items-center
        w-full
        md:flex-row-reverse md:h-full
      "
    >
      <div
        class="
          md:w-1/2 md:bg-gray-100
          h-full
          flex flex-row
          justify-center
          items-center
        "
      >
        <div class="rounded-full w-12 h-12 md:h-60 md:w-60 bg-violet-500"></div>
      </div>
      <!-- mobile -->
      <div class="w-full flex flex-col justify-center items-center md:w-1/2">
        <div class="w-full flex flex-col justify-center items-center md:w-1/2">
          <p class="font-semibold text-3xl pt-6 md:self-start md:px-3">
            Welcome back
          </p>
          <p class="text-gray-500 mt-3 mb-4 md:self-start md:px-3">
            Welcome back! Please enter your details.
          </p>
          <div class="w-full">
            <div class="flex flex-col w-full px-3 py-2">
              <label for="email" class="py-1">Email</label>
              <input
                class="rounded-md h-9 placeholder:p-2 border-2"
                type="email"
                id="email"
                placeholder="Enter your email"
                v-model="userEmail"
                @blur="checkValidity"
              />
              <p class="hidden text-red-600">please enter your email</p>
            </div>
            <div class="flex flex-col w-full px-3 py-2">
              <label for="password" class="py-1">Password</label>
              <input
                class="rounded-md h-9 placeholder:p-2 border-2"
                type="password"
                id="password"
                placeholder="Enter your password"
                v-model="userPassword"
                @blur="checkValidity"
              />
              <p class="hidden text-red-600">please enter password</p>
            </div>
          </div>
          <div class="flex flex-row justify-between w-full p-3">
            <div class="flex flex-row">
              <!-- not working -->
              <input type="checkbox" name="" id="remember" />
              <label for="remember">Remember me</label>
            </div>
            <div>
              <div><a href="#"> Forget password</a></div>
            </div>
          </div>
          <!-- Sign in button -->
          <div class="w-full p-3">
            <button
              class="bg-violet-500 text-white w-full rounded-md h-10"
              @click="signIn"
            >
              Sign in
            </button>
          </div>
          <!-- google sign -->
          <div class="w-full p-3">
            <button
              class="border-gray-400 border w-full rounded-md w-full h-10"
            >
              <!-- google icon -->
              <i></i>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
        <div>
          <span class="text-gray-500">Don't have an account? </span>
          <router-link :to="{ name: 'register' }">Sign up</router-link>
        </div>
        <div class="bg-gray-600 rounded mt-10 px-4 py-2 hidden">
          <p class="inline-block px-3 text-white" ref="errorElement">Server Error</p>
          <button @click="errorCheck" class="text-red-400">Ok</button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script >
import { ref } from "vue";
import { userAuthStore } from "../../pinia.ts";
import { useRouter } from "vue-router";
// import Register from './Register.vue';   //component reusabilty test
export default {
  setup() {
    const userEmail = ref("");
    const userPassword = ref("");
    const router = useRouter();
    const store = userAuthStore();
    const isValid = ref(false);
     const errorElement = ref(null);


    //  const checkValidity = (event) => {   //component reuasbility test
    //   const register = new Register()
    //   register.checkValidity()
    // }

    function checkValidity(event) {
      if (event.target.value === "") {
        event.target.classList.add("border-red-900");
        event.target.nextElementSibling.classList.remove("hidden");
        isValid.value = false;
      } else {
        event.target.classList.remove("border-red-900");
        event.target.nextElementSibling.classList.add("hidden");
      }
    }

    function allInputValidity() {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (email.value.length === 0 || userPassword.value.length === 0)
        isValid.value = false;
      else if (!emailRegex.test(userEmail.value)) isValid.value = false;
      else isValid.value = true;
    }

    function errorCheck(){
        errorElement.value.parentNode.classList.add('hidden');
    }

    async function signIn() {
      allInputValidity();
      if (!isValid.value) return; //gaurd clause
      const userDetail = {
        email: userEmail.value,
        password: userPassword.value,
      };
      try {
        await store.signIn(userDetail);
        router.push({ name: "home" });
      } catch (err) {
        errorElement.value.textContent = err.message;
        errorElement.value.parentNode.classList.remove('hidden');
        console.log(err);
      }
    }
    return {
      userEmail,
      userPassword,
      checkValidity,
      signIn,
      errorElement,
      errorCheck
    };
  },
};
</script>

<style>
</style>