<template>
  <div class="dashboard font-body pb-24">
    <div class="h-48 bg-bluegray-700">
      <div class="container grid grid-cols-3 gap-4 pt-8">
        <div class="text-center">
          <div class="text-2xl text-bluegray-300">Total Sales This Week</div>
          <div class="text-white text-6xl font-light">₱{{ totalPrice }}</div>
        </div>
        <div class="text-center">
          <div class="text-2xl text-bluegray-300">Total Sales This Month</div>
          <div class="text-white text-6xl font-light">₱{{ totalPrice }}</div>
        </div>
        <div class="text-center">
          <div class="text-2xl text-bluegray-300">Total Sales This Year</div>
          <div class="text-white text-6xl font-light">₱{{ totalPrice }}</div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <!-- grid transactions -->
      <!-- <div class="text-bluegray-700 text-2xl">Recent Transactions</div> -->
      <div class="mt-3 grid grid-cols-3 gap-4 h-40">
        <div class="bg-white rounded-lg shadow-lg p-5 text-bluegray-700">
          <line-chart
            name="Total Sales Per Week"
            v-bind:total="[41241, 214, 12312, 5215, 51251, 12312, 2]"
            v-bind:categories="[
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
            ]"
          ></line-chart>
        </div>

        <div>
          <div class="bg-white rounded-lg shadow-lg p-5 text-bluegray-700">
            <line-chart
              name="Total Sales Per Month"
              v-bind:total="[
                32,
                321,
                521,
                312,
                321,
                213,
                41241,
                214,
                12312,
                5215,
                51251,
                12312,
                2,
                213,
                32131,
                321312,
                421,
                12321,
                51,
                1231,
                32,
              ]"
              v-bind:categories="[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
              ]"
            ></line-chart>
          </div>
        </div>
        <div>
          <div class="bg-white rounded-lg shadow-lg p-5 text-bluegray-700">
            <line-chart
              name="Total Sales Per Year"
              :total="[
                3123,
                3213,
                312,
                6261,
                875,
                231,
                3213,
                5215,
                213,
                321,
                63261,
                232,
              ]"
              v-bind:categories="[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]"
            ></line-chart>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-12 mt-48">
        <!-- table of transactions -->
        <div class="col-span-3">
          <div class="text-bluegray-700 text-2xl mt-10">Transactions</div>
          <div class="h-auto rounded-lg shadow-md mt-5" v-if="transactions.length > 0">
            <table class="table-fixed w-full text-bluegray-900">
              <thead>
                <tr class="text-left text-bluegray-900">
                  <th class="w-1/12 px-4 py-3 bg-gray-100 rounded-tl-lg"></th>
                  <th class="w-1/4 px-4 py-3 bg-gray-100 rounded-tl-lg">
                    Attendant
                  </th>
                  <th class="w-1/4 px-4 py-3 bg-gray-100">Date</th>
                  <th class="w-1/5 px-4 py-3 bg-gray-100 text-right">
                    Total Amount
                  </th>
                  <th class="w-2/12 px-4 py-3 bg-gray-100 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white"
                  v-for="(t, indx) in transactions"
                  :key="t.id"
                  :class="{ 'bg-gray-100': indx % 2 !== 0 }"
                >
                  <td class="px-1 py-3 rounded-bl-lg">
                    <img
                      :src="imgAPI(t.firstname, t.lastname)"
                      alt=""
                      class="rounded-full h-12 w-12 shadow-md float-right"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-lg">
                      {{ t.firstname }} {{ t.lastname }}
                    </div>
                    <div class="text-sm text-bluegray-500">
                      {{ t.position }}
                    </div>
                  </td>
                  <td class="px-4 py-3">{{ moment(t.created_at) }}</td>
                  <td class="px-4 py-3 text-right">₱{{ t.total_price }}.00</td>
                  <td class="px-4 py-3 text-center text-xl rounded-br-lg">
                    <router-link to="/view">View</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <img src="../../public/img/void.svg" alt="" v-else class="w-2/3 h-64 mt-10">
        </div>

        <!-- table of actions -->
        <div class="col-span-2">
          <div class="text-bluegray-700 text-2xl mt-10">Recent Activity</div>
          <div class="h-auto shadow-md mt-5 rounded-lg" v-if="actions.length > 0">
            <table class="table-fixed w-full">
              <thead>
                <tr class="text-left text-bluegray-900">
                  <th class="w-1/12 px-4 py-3 bg-gray-100 rounded-tl-lg"></th>
                  <th class="w-1/5 px-4 py-3 bg-gray-100">User</th>
                  <th class="w-1/5 px-4 py-3 bg-gray-100">Action</th>
                  <!-- <th class="w-1/12 px-4 py-3 bg-gray-100 rounded-tr-lg"></th> -->
                </tr>
              </thead>
              <tbody class="text-bluegray-900 bg-white">
                <tr
                  v-for="(action, indx) in actions"
                  :key="action.action_id"
                  :class="{ 'bg-gray-100': indx % 2 !== 0 }"
                >
                  <td class="px-1 py-3">
                    <img
                      :src="imgAPI(action.firstname, action.lastname)"
                      alt=""
                      class="rounded-full h-12 w-12 shadow-md float-right"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-lg">
                      {{ action.firstname }}
                      {{ action.lastname }}
                    </div>
                    <div class="text-sm text-bluegray-500">
                      {{ action.position }}
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-lg">
                      {{ action.action_type }}
                    </div>
                    <div class="text-sm text-bluegray-500">
                      {{ moment(action.created_at) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="h-12 rounded-b-lg flex justify-center items-center"
              :class="{ 'bg-white': actions.length % 2 === 0 }"
            >
              <div
                class="text-bluegray-700 text-xl flex h-full w-full text-center"
              >
                <router-link
                  to="/view"
                  class="flex justify-center items-center h-full w-full hover:bg-bluegray-700 hover:text-white rounded-b-lg"
                >
                  View More
                  <chevron-right-icon
                    size="1x"
                    class="mt-1"
                  ></chevron-right-icon>
                </router-link>
              </div>
            </div>
          </div>
          <img src="../../public/img/process.svg" alt="" v-else class="w-2/3 h-64 mt-10">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "vue-feather-icons";
import ActionService from "../Services/ActionService";
import TransactionService from "../Services/TransactionService";
import moment from "moment";
import LineChart from "../components/Charts/LineChart";
export default {
  components: {
    ChevronRightIcon,
    LineChart,
  },
  data() {
    return {
      actions: [],
      transactions: [],
      recentTransactions: [],
      totalPrice: ''
    };
  },
  methods: {
    moment(date) {
      return moment(date).fromNow();
    },
    imgAPI(firstname, lastname) {
      return `https://avatars.dicebear.com/api/male/${firstname}${lastname}.svg`;
    },
  },
  mounted() {},
  async created() {
    try {
      this.actions = await ActionService.getActions();
      this.transactions = await TransactionService.getTransactions();
      this.recentTransactions = this.transactions.slice(
        this.transactions.length - 3,
        this.transactions.length
      );
      let totalPrice = await TransactionService.sumOfTotalPrices()
      this.totalPrice = totalPrice[0].sum_of_all_total_price
      console.log(this.totalPrice)
    } catch (err) {
      console.error(error.message);
    }
  },
};
</script>
