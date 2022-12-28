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
            Welcome to our site!
          </p>
          <p class="text-gray-500 mt-3 mb-4 md:self-start md:px-3">
            Welcome! Please create an account by filling out the form below
          </p>
          <div class="w-full">
            <div class="flex flex-col w-full px-3 py-2">
              <label for="name" class="py-1">Name</label>
              <input
                class="rounded-md h-9 placeholder:p-2 border-2"
                type="text"
                id="name"
                placeholder="Enter your name"
                v-model.trim="userName"
                @blur="checkValidity"
              />
              <p class="hidden text-red-600">please enter valid name</p>
            </div>
            <div class="flex flex-col w-full px-3 py-2">
              <label for="email" class="py-1">Email</label>
              <input
                class="rounded-md h-9 placeholder:p-2 border-2"
                type="email"
                id="email"
                placeholder="Enter your email"
                v-model.trim="userEmail"
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
                v-model.trim="userPassword"
                @blur="checkValidity"
              />
              <p class="hidden text-red-600">please enter password</p>
            </div>
            <div class="flex flex-col w-full px-3 py-2">
              <label for="confirmPassword" class="py-1">Confirm Password</label>
              <input
                class="rounded-md h-9 placeholder:p-2 border-2"
                type="password"
                id="confirmPassword"
                placeholder="Re-Enter Password"
                v-model.trim="userConfrimPassword"
                @blur="checkValidity"
              />
              <p class="text-red-600" :class="{ hidden: passwordCompare }">
                please re-enter correct password
              </p>
            </div>
            <!-- <div class="flex flex-row justify-between w-full p-3">
              <div class="flex flex-row">
                <input type="checkbox" name="" id="remember" />
                <label for="remember">Remember for 30 days</label>
              </div>
              <div>
                <div>Forget password</div>
              </div>
            </div> -->
            <!-- Sign in button -->
            <div class="w-full p-3">
              <button
                class="bg-violet-500 text-white w-full rounded-md h-10"
                @click="signUp"
              >
                Sign up
              </button>
            </div>
            <!-- google sign -->
            <div class="w-full p-3">
              <button
                class="border-gray-400 border w-full rounded-md w-full h-10"
              >
                <!-- google icon -->
                <i></i>
                <span>Sign up with Google</span>
              </button>
            </div>
          </div>
          <div>
            <span class="text-gray-500">Have an account? </span>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
          </div>
          <div class="bg-gray-600 rounded mt-10 px-4 py-2 hidden">
          <p class="inline-block px-3 text-white" ref="errorElement">Server Error</p>
          <button @click="errorCheck" class="text-red-400">Ok</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { computed, ref } from "vue";
import {useRouter} from 'vue-router';
import { userAuthStore } from "../../pinia.ts";

export default {
  setup() {
    const userName = ref("");
    const userEmail = ref("");
    const userPassword = ref("");
    const userConfrimPassword = ref("");
    const isValid = ref(false);
    const router = useRouter();
    const store = userAuthStore();
    const errorElement = ref(null);

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

    const passwordCompare = computed(function () {
      const equal = userConfrimPassword.value === userPassword.value;
      if (!equal) isValid.value = false;
      return equal;
    });

    function allInputValidity() {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (
        userName.value.length === 0 ||
        email.value.length === 0 ||
        userPassword.value.length === 0 ||
        userConfrimPassword.value.length === 0
      )
        isValid.value = false;
      else if (userConfrimPassword.value !== userPassword.value)
        isValid.value = false;
      else if (!emailRegex.test(userEmail.value)) isValid.value = false;
      else isValid.value = true;
    }

     function errorCheck(){
        errorElement.value.parentNode.classList.add('hidden');
    }

    async function signUp() {
      console.log(isValid.value);
      allInputValidity();
      if (!isValid.value) return; //gaurd clause
      console.log(isValid.value);
      const userDetail = {
        name: userName.value,
        email: userEmail.value,
        password: userConfrimPassword.value,
      };
      try{
       await store.signUp(userDetail);
       router.push({name:'login'});
      }
      catch(err){
        console.log("register error",err);
        errorElement.value.textContent = err.message;
        errorElement.value.parentNode.classList.remove('hidden');
        console.log(err);
      }
    }

    return {
      userEmail,
      userPassword,
      userName,
      userConfrimPassword,
      checkValidity,
      passwordCompare,
      errorElement,
      errorCheck,
      signUp,
    };
  },
};
</script>

<style>
</style>