<template>
  <div>
    <div class="container inventory flex justify-between items-baseline mt-5">
      <div
        class="text-bluegray-700 text-3xl font-semibold"
        v-if="this.$route.path === '/inventory'"
      >
        Items
      </div>
      <router-link
        to="/inventory/create"
        class="px-4 py-2 bg-bluegray-700 text-white hover:bg-bluegray-800 rounded-lg 
            focus:outline-none focus:shadow-outline"
        v-if="this.$route.path === '/inventory'"
      >
        Create New Item
      </router-link>
      <!-- <router-link to="/inventory/create" class="px-4 py-2 bg-bluegray-700 text-white hover:bg-bluegray-800 rounded-lg 
            focus:outline-none focus:shadow-outline" v-if="this.$route.path === '/inventory/create'">
                Back
            </router-link> -->
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import InventoryMain from "../components/Inventory/InventoryMain";
export default {
  components: {
    InventoryMain,
  },
  data() {
    return {
      inventoryMainToggle: false,
    };
  },
  methods: {
    createItem() {
      this.inventoryMainToggle = !this.inventoryMainToggle;
    },
  },
  created() {
    this.inventoryMainToggle = !this.inventoryMainToggle;
  },
};
</script>
