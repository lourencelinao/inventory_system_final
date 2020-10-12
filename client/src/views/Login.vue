<template>
  <div class="login">
    <div class="py-5 lg:w-1/3 md:w-2/5 sm:w-3/5 mx-auto mt-16 rounded-lg bg-white shadow-md">
        <div class="text-2xl font-semibold text-center w-1/3  mx-auto">
            Login
        </div>
        <form v-on:submit.prevent="login"
        class="flex flex-col px-16 pb-3" >
          <input type="text" class="py-3 px-4 focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-300
          rounded-lg bg-gray-200 mt-5 border border-gray-200 hover:bg-white hover:border-gray-300"
          placeholder="Email" v-model="email">

          <input type="password" class="py-3 px-4 focus:outline-none focus:shadow-outline rounded-lg focus:bg-white 
          bg-gray-200 mt-5 border border-gray-200 hover:bg-white hover:border-gray-300"
          placeholder="Password" name="password" v-model="password">

          <!-- errors -->
          <div class="rounded-lg mt-3 text-red-500" v-if="error.length">
            {{ this.error }}
          </div>

          <button type="submit" class="py-3 px-4 bg-blue-500 mt-5 text-white font-semibold rounded-lg
          focus:outline-none focus:shadow-outline border border-gray-200 hover:bg-blue-600">
              Login
          </button>
        </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app"
import 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try{
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.replace({ name: 'Dashboard'} )
      }catch(err) {
        this.error = "Incorrect email or password"
        this.password = ''
        console.log(err.message)
      }
    }
  },
  mounted() {
  }
}
</script>
