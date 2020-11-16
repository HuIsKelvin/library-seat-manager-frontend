<template>
  <div id="SeatChart">
    <!-- <h1>chart</h1> -->
    <div id="chart"></div>
  </div>
</template>

<script>
import { createSeatAreaOption } from './../../../util/createSeatAreaOption';

export default {
  name: "chart",
  props: {
    chartData: Array
  },
  data() {
    return {
      chartId: "chart",
      chartInstance: "",
      option: {}
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.createChart();
    });
  },
  watch: {
    chartData: {
      handler: function(val) {
          this.option = createSeatAreaOption(val);
          this.chartInstance.setOption(this.option, { notMerge: false });
      },
      deep: true
    }
  },
  methods: {
    createChart() {
      this.chartInstance = this.$echarts.init(document.getElementById(this.chartId));
      // get the option
      this.option = createSeatAreaOption(this.chartData);
      // console.log("option: "+ this.option);
      // create Echarts instance
      this.chartInstance.setOption(this.option);
      // register the click event
      this.chartInstance.on('click', this.seatClick);
    },
    seatClick(param) {
      console.log(param)
      let data = param.data;
      let seatData = {
        row: data[1],
        col: data[0],
        index: data[2],
        id: data[3],
        status: data[4],
        type: data[5]
      }
      this.$emit('seatClick', seatData);
    }
  }
}
</script>

<style lang="scss" scoped>
#SeatChart {
  // width: 200px;
  // height: 200px;

  #chart {
    min-width: 600px;
    min-height: 400px;
  }
}
</style>