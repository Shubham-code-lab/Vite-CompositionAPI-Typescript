<template>
  <div class="h-full flex items-center">
    <div class="flex flex-col justify-center items-center w-full md:flex-row-reverse md:h-full">
      <div class="md:w-1/2 md:bg-gray-100 h-full flex flex-row justify-center items-center">
        <div class="rounded-full w-12 h-12 md:h-60 md:w-60 bg-violet-500"></div>
      </div>
      <!-- mobile -->
      <div class="w-full flex flex-col justify-center items-center md:w-1/2">
      <div class="w-full flex flex-col justify-center items-center md:w-1/2">
        <p class="font-semibold text-3xl pt-6 md:self-start md:px-3">Welcome back</p>
        <p class="text-gray-500 mt-3 mb-4 md:self-start md:px-3">
          Welcome back! Please enter your details.
        </p>
        <div class="w-full">
          <div class="flex flex-col w-full px-3 py-2">
            <label for="name" class="py-1">Name</label>
            <input
              class="rounded-md h-9 placeholder:p-2 border-2"
              type="text"
              id="name"
              placeholder="Enter your name"
              v-model="userName"
            />
          </div>
          <div class="flex flex-col w-full px-3 py-2">
            <label for="email" class="py-1">Email</label>
            <input
              class="rounded-md h-9 placeholder:p-2 border-2"
              type="email"
              id="email"
              placeholder="Enter your email"
              v-model="userEmail"
            />
          </div>
          <div class="flex flex-col w-full px-3 py-2">
            <label for="password" class="py-1">Password</label>
            <input
              class="rounded-md h-9 placeholder:p-2 border-2"
              type="password"
              id="password"
              placeholder="Enter your password"
              v-model="userPassword"
            />
          </div>
          <div class="flex flex-col w-full px-3 py-2">
            <label for="confirmPassword" class="py-1">Confirm Password</label>
            <input
              class="rounded-md h-9 placeholder:p-2 border-2"
              type="password"
              id="confirmPassword"
              placeholder="Re-Enter Password"
              v-model="userConfrimPassword"
            />
          </div>
          <div class="flex flex-row justify-between w-full p-3">
            <div class="flex flex-row">
              <!-- not working -->
              <input type="checkbox" name="" id="remember" />
              <label for="remember">Remember for 30 days</label>
            </div>
            <div>
              <div>Forget password</div>
            </div>
          </div>
          <!-- Sign in button -->
          <div class="w-full p-3">
            <button class="bg-violet-500 text-white w-full rounded-md h-10" @click="signUp">
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
          <span class="text-gray-500">Don't have an account?</span>
          <!-- <router-link :to="{ name: 'login' }">Sign up</router-link> -->
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script >
import {ref} from 'vue';
import {useCounterStore} from '../../pinia.ts';
export default{
  setup(){
    const userEmail = ref('');
    const userPassword = ref('');
    const userConfrimPassword = ref('');
    const userName = ref('');
    
    // 
    const store = useCounterStore();
    function signUp(){
      // console.log(store);
      // store.increment();
      // console.log(store.doubleCount);
      // console.log(store.count);
      
      store.signUp(userEmail.value, userPassword.value);
    }
    return{
      userEmail,
      userPassword,
      signUp
    }
  }
}
</script>

<style>
</style>