<template>
  <div class="item-edit container">
    <!-- above input fields -->
    <div class="w-1/3 h-full mx-auto mt-5">
      <div class="flex justify-between items-baseline">
        <div class="text-bluegray-700 text-3xl font-semibold">Item/Edit</div>
        <router-link to="/inventory">
          <chevrons-left-icon
            size="1.25x"
            class="stroke-current text-bluegray-700 hover:text-bluegray-800"
          >
          </chevrons-left-icon>
        </router-link>
      </div>

      <!-- input fields -->
      <div class="mt-3 border-t-2 border-bluegray-300 py-5">
        <!-- form start -->
        <form @submit.prevent="editItem">
          <div class="flex flex-col">
            <label for="item_name" class="text-xl text-bluegray-700"
              >Item Name</label
            >
            <input
              type="text"
              class="px-4 py-2 rounded-sm focus:outline-none focus:shadow-outline"
              name="item_name"
              v-model="item.item_name"
            />
            <div class="text-red-700 mt-1">
              {{ error.name }}
            </div>

            <label for="item_description" class="mt-2 text-xl text-bluegray-700"
              >Item Description</label
            >
            <input
              type="text"
              class="px-4 py-2 rounded-sm focus:outline-none focus:shadow-outline"
              name="item_description"
              v-model="item.item_description"
            />
            <div class="text-red-700 mt-1">
              {{ error.description }}
            </div>

            <div
              class="flex justify-between mt-5 border-b-2 border-bluegray-300 pb-8"
            >
              <div class="w-1/2 mr-5">
                <label for="item_qty" class="mt-5 text-xl text-bluegray-700"
                  >Item Quantity</label
                >
                <input
                  type="number"
                  class="w-full px-4 py-2 rounded-sm focus:outline-none focus:shadow-outline"
                  name="item_qty"
                  v-model="item.item_qty"
                />
                <div class="text-red-700 mt-1">
                  {{ error.qty }}
                </div>
              </div>

              <div class="w-1/2">
                <label for="item_price" class="mt-5 text-xl text-bluegray-700"
                  >Item Price</label
                >
                <input
                  type="number"
                  class="w-full px-4 py-2 rounded-sm focus:outline-none focus:shadow-outline"
                  name="item_price"
                  v-model="item.item_price"
                />
                <div class="text-red-700 mt-1">
                  {{ error.price }}
                </div>
              </div>
            </div>
          </div>

          <!-- below input fields -->
          <div class="flex justify-end mt-3">
            <router-link
              to="/inventory"
              class="mr-5 py-2 text-lg text-bluegray-700 hover:text-bluegray-800"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              class="px-6 py-2 bg-bluegray-700 text-white font-semibold rounded hover:bg-bluegray-800 focus:outline-none focus:shadow-none"
            >
              Edit
            </button>
          </div>
        </form>
        <!-- form end -->
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronsLeftIcon } from "vue-feather-icons";
import ItemService from "../../Services/ItemService";
export default {
  name: "ItemEdit",
  components: {
    ChevronsLeftIcon,
  },
  data() {
    return {
      item: {
          id: '',
          item_name: "",
          item_description: "",
          item_qty: "",
          item_price: "",
      },
      error: {
        name: "",
        description: "",
        qty: "",
        price: "",
      },
    };
  },
  methods: {
    async editItem() {
      try{
          if (!this.item.item_name) {
            this.error.name = "Field required";
        } else {
            this.error.name = "";
        }

        if (!this.item.item_description) {
            this.error.description = "Field required";
        } else {
            this.error.description = "";
        }

        if (!this.item.item_qty) {
            this.error.qty = "Field required";
        } else {
            this.error.qty = "";
        }

        if (!this.item.item_price) {
            this.error.price = "Field required";
        } else {
            this.error.price = "";
        }

      if(this.item.item_name && this.item.item_name && this.item.item_description && this.item.item_qty && this.item.item_price) {
        // remove errors
        this.error = {
          name: "",
          description: "",
          qty: "",
          price: "",
        };

        // edit at the database
        this.item.user_id = localStorage.id
        await ItemService.patchItem(this.item)
        await alert("Edit successful!")
      }
      }catch(err) {
          console.error(err.message)
      }
    },
  },
  async created() {
    try {
      let temp = await ItemService.getItem(this.$route.params.id);
      this.item = temp[0];
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>

<style></style>
