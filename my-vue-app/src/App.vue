<template>
  <div class="h-screen">
    
    <router-view class="h-full"></router-view>
  </div>
</template>

<script>
import {ref} from 'vue';
export default{
  setup(){
  const loginComponent = {name:"login"};
  const registerComponent ={name:"register"};
  // const homeComponent ={name:"home"};
  return{ 
    loginComponent,
    registerComponent,
    // homeComponent
    }
  }
}
</script>

<style>
</style>