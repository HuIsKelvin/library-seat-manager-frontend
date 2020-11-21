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
      let chart = document.getElementById(this.chartId);
      // const initial = function () {
      //   // 根据想要的效果调整的公式，不是固定的
      //   // chart.style.width = (window.innerWidth/4)+80+"px";

      //   // 获取 chart 的父父结点chartParent，再根据其算宽度
      //   let chartParent = chart.parentNode;
      //   console.log(chart.parentNode);
      //   console.log(chart.parentNode.parentNode);
      //   chart.style.width = chartParent.clientWidth - 30 + "px";
      //   chart.style.margin = "0 auto";
      //   chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
      // }
      // initial();

      this.chartInstance = this.$echarts.init(chart);
      // get the option
      this.option = createSeatAreaOption(this.chartData);
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
  // overflow:auto;

  #chart {
    width: 90%;
    height: 100%;
    min-height: 500px;
    min-width: 800px;
    // min-width: 600px;
    // min-height: 400px;
  }
}
</style>