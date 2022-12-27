<template>
  <div class="h-screen">
    <nav class="container bg-red-400">
      <ul class="list-none flex flex-row">
      <li>
        <router-link :to="loginComponent">login</router-link>
      </li>
      <li>
        <router-link :to="registerComponent">register</router-link>
      </li>
      <li>
        <router-link :to="homeComponent">home</router-link>
      </li>
      </ul>
    </nav>
    <router-view class="h-full"></router-view>
  </div>
</template>

<script>
import {ref} from 'vue';
export default{
  setup(){
  const loginComponent = {name:"login"};
  const registerComponent ={name:"register"};
  const homeComponent ={name:"home"};
  return{ 
    loginComponent,
    registerComponent,
    homeComponent
    }
  }
}
</script>

<style>
</style>