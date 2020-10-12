<template>
  <div id="chart" class=" p-5 rounded-lg">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  props: ["name", "total", "categories"],
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.categories,
        },
      },
      series: [
        {
          name: this.name,
          data: this.total,
        },
      ],
    };
  },
  created() {
    // this.series[0].data.push(this.total);
    // this.series[0].data.push(0, 40, 35, 50, 49000, 60, 70);
  },
};
</script>