<template>
  <div id="app" class="">
    <nav class="bg-white shadow-md">
      <div class="container flex justify-between items-center h-16">
        <!-- logo -->
        <div class="text-2xl text-bluegray-700 font-semibold">Micro</div>
        <div
          class="flex text-md font-graphik text-bluegray-700 font-medium"
          v-if="isLoggedIn"
        >
          <router-link class="mr-5 font-bold" to="/dashboard"
            >Dashboard</router-link
          >
          <router-link class="mr-5 font-bold" to="/inventory"
            >Inventory</router-link
          >
          <router-link class="font-bold" to="/order">Orders</router-link>
        </div>
        <div class="flex">
          <!-- <button class="px-5 py-2 bg-bluegray-700 text-bluegray-100 mr-5 rounded-full 
          focus:outline-none focus:shadow-outline font-semibold shadow-md">
            New Item
          </button> -->
          <!-- top right profile pic -->
          <div class="relative text-left font-graphik" v-if="isLoggedIn">
            <button
              class="rounded-full w-10 h-10 flex justify-center items-center focus:outline-none border border-bluegray-700 shadow-md"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              v-on:click="dropdown"
              v-on-clickaway="away"
            >
              <img
                :src="imgAPI"
                alt="profile_picture"
                class="rounded-full w-full h-full shadow-sm"
              />
            </button>
            <!-- dropdown -->
            <div
              id="dropdown"
              class="origin-top-right absolute right-0 mt-5 w-56 rounded-md shadow-lg transition ease-out duration-100"
              v-if="dropdown_toggle"
            >
              <div class="rounded-md bg-white shadow-xs">
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div
                    class="block px-4 pt-2 text-sm leading-5 text-gray-700 font-graphik"
                    role="menuitem"
                  >
                    Signed in as
                  </div>
                  <div
                    class="block px-4 pb-2 text-sm leading-5 text-gray-700 font-semibold font-graphik"
                    role="menuitem"
                  >
                    {{ email }}
                  </div>
                  <div class="border-t border-gray-300"></div>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                    >Account settings</a
                  >
                  <button
                    type="submit"
                    class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                    v-on:click="logOut"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- display -->
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import UserService from "./Services/UserService";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      isLoggedIn: false,
      id: "",
      email: "",
      dropdown_toggle: false,
      imgAPI: "",
    };
  },
  methods: {
    async logOut() {
      try {
        this.isLoggedIn = false;
        await firebase.auth().signOut();
        this.dropdown_toggle = !this.dropdown_toggle; //toggles dropdown off
        this.$router.replace({ name: "Home" });
      } catch (e) {
        console.log(e.message);
      }
    },
    dropdown() {
      // toggles the dropdown
      this.dropdown_toggle = !this.dropdown_toggle;
    },
    away: function () {
      // closes the dropdown when clicked outside
      if (this.dropdown_toggle) {
        this.dropdown_toggle = !this.dropdown_toggle;
      }
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        console.log("Not logged in");
      }
    });
  },
  created() {
    this.email = localStorage.email;
    this.imgAPI =
      // "https://avatars.dicebear.com/api/male/" + localStorage.email + ".svg";
      `https://avatars.dicebear.com/api/male/${localStorage.firstname}${localStorage.lastname}.svg`;
  },
};
</script>
