<template>
  <div class="container inventory">
    <div
      class="h-auto bg-white mt-5 rounded-lg shadow-md"
      v-if="items.length > 0"
    >
      <table class="table-fixed">
        <thead class="">
          <tr class="text-left text-bluegray-900">
            <th class="w-1/12 px-4 py-4 bg-gray-100 rounded-tl-lg">Item</th>
            <th class="w-1/12 px-4 py-4 bg-gray-100">Description</th>
            <th class="w-1/12 px-4 py-4 text-right bg-gray-100">Qty</th>
            <th class="w-1/12 px-4 py-4 text-right bg-gray-100">Price</th>
            <th class="w-1/12 px-4 py-4 rounded-tr-lg bg-gray-100"></th>
          </tr>
        </thead>
        <!-- hey -->
        <tbody class="text-bluegray-900">
          <tr
            v-for="(item, indx) in items"
            :key="item.id"
            :class="{ 'bg-gray-100': indx % 2 !== 0 }"
          >
            <td class="px-4 py-3 rounded-bl-lg">
              <div class="text-lg">{{ item.item_name }}</div>
              <div class="text-sm text-bluegray-500">{{ item.id }}</div>
            </td>
            <td class="px-4 py-3">{{ item.item_description }}</td>
            <td class="px-4 py-3 text-right">{{ item.item_qty }}</td>
            <td class="px-4 py-3 text-right">{{ item.item_price }}</td>
            <td class="px-4 py-6 rounded-br-lg">
              <span class="flex justify-center">
                <button class="focus:outline-none focus:shadow-none">
                  <eye-icon size="1.5x" class="stroke"> </eye-icon>
                </button>
                <router-link :to="{ name: 'Edit', params: { id: item.id } }">
                  <edit-icon size="1.5x" class="ml-5 stroke"> </edit-icon>
                </router-link>
                <button
                  class="focus:outline-none focus:shadow-none"
                  @click="deleteItem(item.id)"
                >
                  <trash-2-icon
                    size="1.5x"
                    class="ml-5 stroke text-bluegray-900"
                  >
                  </trash-2-icon>
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- display if empoty table data -->
    <img
      src="../../../public/img/empty.svg"
      alt=""
      v-else
      class="w-1/2 mx-auto mt-10"
    />
  </div>
</template>

<script>
import { EyeIcon, EditIcon, Trash2Icon } from "vue-feather-icons";
import ItemService from "../../Services/ItemService";
import InventoryCreate from "../../views/Item/ItemCreate";

export default {
  name: "InventoryMain",
  components: {
    EyeIcon,
    EditIcon,
    Trash2Icon,
    InventoryCreate,
  },
  data() {
    return {
      item: {},
      items: [],
    };
  },
  methods: {
    async deleteItem(id) {
      try {
        let user_id = localStorage.id
        await ItemService.deleteItem(id, user_id);
        this.items = await ItemService.getItems();
        // this.toggleDelete = !this.toggleDelete;
      } catch (err) {
        console.error(err.message);
      }
    }
  },
  async created() {
    try {
      this.items = await ItemService.getItems();
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>
