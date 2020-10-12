<template>
    <div class="container inventory">
        <div class="w-full h-auto bg-white mt-5 rounded-lg shadow-md">
            <table class="table-fixed w-full">
                <thead class="">
                    <tr class="text-left text-bluegray-900">
                        <th class="w-1/12 px-4 py-4 bg-gray-100 rounded-tl-lg">Item</th>
                        <th class="w-1/5 px-4 py-4 bg-gray-100">Description</th>
                        <th class="w-10 px-4 py-4 text-right bg-gray-100">Qty</th>
                        <th class="w-1/12 px-4 py-4 text-right bg-gray-100">Price</th>
                        <th class="w-1/12 px-4 py-4 rounded-tr-lg bg-gray-100"></th>
                    </tr>
                </thead>
                <tbody class="text-bluegray-900">
                    <tr v-for="item in items" :key="item.id" :class="{ 'bg-gray-100': item.id % 2 === 0 }">
                        <td class="px-4 py-3">
                            <div class="text-lg">{{ item.item_name }}</div>
                            <div class="text-sm text-bluegray-500">{{ item.id }}</div>
                        </td>
                        <td class="px-4 py-3">{{ item.item_description }}</td>
                        <td class="px-4 py-3 text-right">{{ item.item_qty }}</td>
                        <td class="px-4 py-3 text-right">{{ item.item_price }}</td>
                        <td class="px-4 py-3 flex justify-center items-center h-16">
                            <eye-icon size="1.5x" class="stroke"></eye-icon>
                            <edit-icon size="1.5x" class="ml-5 stroke"></edit-icon>
                            <trash-2-icon size="1.5x" class="ml-5 stroke text-bluegray-900"></trash-2-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { EyeIcon, EditIcon, Trash2Icon } from 'vue-feather-icons'
import ItemService from '../../Services/ItemService'
import InventoryCreate from '../../views/Item/ItemCreate'
export default {
    name: 'InventoryMain',
    components: {
        EyeIcon,
        EditIcon,
        Trash2Icon,
        InventoryCreate
    },
    data() {
        return {
            item: {},
            items: [],
        }
    },
    methods: {
        
    },
    async created() {
        try{
            this.items = await ItemService.getItems()
        }catch(err) {
            console.error(err.message)
        }
    },
}
</script>
