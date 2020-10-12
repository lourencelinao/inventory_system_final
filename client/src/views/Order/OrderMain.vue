<template>
  <div>
    <div class="container mt-5 px-12">
      <div class="grid grid-cols-3 gap-10">
        <div class="text-bluegray-700 p-5 bg-white rounded-lg cols-span-1">
          <div class="text-4xl font-semibold px-4">Items</div>
          <div class="bg-orange-200 py-2 px-4 mt-3">Click to add to cart</div>
          <div class="flex justify-between items-baseline py-2 mt-2">
            <div class="flex mt-3 px-4">
              All Items
              <chevron-down-icon size="1.5x"></chevron-down-icon>
            </div>
            <input
              type="text"
              class="px-4 py-2 bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white rounded-md"
              placeholder="Search..."
            />
          </div>
          <!-- items -->
          <div class="mt-5">
            <div
              v-for="item in items"
              :key="item.id"
              class="mt-3 flex justify-between hover:bg-gray-100 px-4 py-2 cursor-pointer"
              @click="addToCart(item.id, item.item_name, item.item_price)"
              :class="{
                'bg-red-200': item.item_qty === 0,
                'hover:bg-red-200': item.item_qty === 0,
              }"
            >
              <div class="flex flex-col">
                <div class="text-lg font-semibold">{{ item.item_name }}</div>
                <div class="text-bluegray-500">{{ item.item_description }}</div>
              </div>
              <div class="flex flex-col text-right">
                <div class="text-lg font-semibold">
                  ₱{{ item.item_price }}.00
                </div>
                <div class="text-bluegray-500">{{ item.item_qty }} left</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg col-span-2 p-5 text-bluegray-700">
          <div
            class="text-4xl font-semibold px-4 border-b-2 border-bluegray-200 pb-5"
          >
            Order Info/Cart
          </div>
          <img
            src="../../../public/img/empty_cart.svg"
            class="w-1/2 mt-5 mx-auto"
            alt=""
            v-if="this.cart.length === 0"
          />
          <div class="mt-5 w-2/3 mx-auto" v-else>
            <table class="table-fixed w-full mr-5 text-left">
              <thead>
                <tr>
                  <th class="w-1/2 px-4 py-2 font-semibold text-lg">Items</th>
                  <th class="w-1/4 px-4 py-2 font-semibold text-lg text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="border-b-2 border-bluegray-100">
                <tr
                  class="hover:line-through cursor-pointer"
                  v-for="cart in cart"
                  :key="cart.item_id"
                  @click="removeItem(cart.item_id)"
                >
                  <td class="px-4 py-4">
                    {{ cart.item_qty }}x {{ cart.item_name }}
                  </td>
                  <td class="px-4 py-4 text-right">
                    ₱{{ cart.item_price * cart.item_qty }}.00
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-end px-4 py-2">
              <div>
                <span class="text-lg text-bluegray-500 mr-2">Total:</span>
                <span class="text-2xl">₱{{ totalPrice() }}</span
                >.00
              </div>
            </div>
            <div class="flex justify-end mt-3">
              <button
                class="text-bluegray-700 text-lg mr-5 px-4 py-2 focus:outline-none focus:shadow-outline rounded-md border border-white hover:border-bluegray-300"
                @click="clearCart()"
              >
                Clear
              </button>
              <button
                class="px-4 py-2 bg-bluegray-700 text-white rounded-md"
                @click="postTransaction()"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ChevronDownIcon } from "vue-feather-icons";
import ItemService from "../../Services/ItemService";
import TransactionService from "../../Services/TransactionService";
export default {
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      items: [],
      cart: [],
    };
  },
  /*
   * add the item inside the cart and decrease the qty in the item list
   * @param {integer} item_id: id of the item
   * @param {string} item_name: name of the item
   * @param {float} item_price: price of the item
   */
  methods: {
    addToCart(item_id, item_name, item_price) {
      // find if item already exist in the cart
      //decrease the qty of the item
      let indx = this.items.findIndex((x) => x.id === item_id);
      if (this.items[indx].item_qty !== 0) {
        this.items[indx].item_qty -= 1;
        indx = this.cart.findIndex((x) => x.item_id === item_id);
        if (indx === -1) {
          // push the item inside the cart if it doesnt exist, else increment the qty
          this.cart.push({
            item_id,
            item_name,
            item_qty: 1,
            item_price,
          });
        } else {
          this.cart[indx].item_qty += 1;
        }
      } else {
        alert(`${this.items[indx].item_name} stock is depleted!`);
      }
    },
    /*
     * calculates the total price of every item inside the cart and returns it for display
     */
    totalPrice() {
      let totalPrice = 0;
      this.cart.forEach((x) => {
        totalPrice += x.item_price * x.item_qty;
      });
      return totalPrice;
    },
    /*
     * reload the page to clear the cart
     * // TODO update this function by clearing the cart without reloading the page
     */
    clearCart() {
      location.reload();
    },
    /*
     * remove the item from the cart and add it back to the item list
     * if the qty of an item is zero then remove it from the cart
     * @param {integer} item_id: The id of the item inside the cart
     */
    removeItem(item_id) {
      let indx = this.items.findIndex((x) => x.id === item_id);
      this.items[indx].item_qty += 1;
      indx = this.cart.findIndex((x) => x.item_id === item_id);
      this.cart[indx].item_qty -= 1;
      //remove item in the cart if the qty is zero
      if (this.cart[indx].item_qty === 0) {
        this.cart.splice(indx, 1);
      }
    },
    /*
     * this method calls postTransaction from the TransactionService class, Services/TransactionServices.js
     */
    async postTransaction() {
      TransactionService.postTransaction(
        localStorage.id,
        this.totalPrice(),
        this.cart
      );
      alert("Success!");
      this.cart = [];
    },
  },
  async created() {
    this.items = await ItemService.getItems();
  },
};
</script>

<style>
</style>