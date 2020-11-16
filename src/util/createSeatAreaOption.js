/**
 * icon / color for seats
 */
// const icon_used = require('./../assets/icon_used.png');
// const icon_unused = require('./../assets/icon_unused.png');
// const icon_selected = require('./../assets/icon_selected.png');
// const icon_broken = require('./../assets/icon_broken.png');
// 色表
const seatStatusColor = [
  "#00FF00", // unused
  "#A9A9A9", // used
  "#A9A9A9", // leave
  "#FF4500", // selected
];

/**
 * range of row and column
 */
let rowMin = 0.5;
let rowMax = rowMin;
let colMin = 0.5
let colMax = colMin;

/**
 * function - processData
 * 对 data 进行预处理，以输入 echarts 的图组件中
 * @param {Array} data 
 */
function processData(data) {
  let seriesData = [];
  data.forEach((seat, index) => {
    // seat data - col, row, index, seat_id, seat_status, seat_type
    rowMax = Math.max(rowMax, seat.row + 0.5)
    colMax = Math.max(colMax, seat.col + 0.5)
    let seatData = [seat.col, seat.row, index, seat.id, seat.status, seat.type];
    seriesData.push(seatData);
  })

  return seriesData;
}

/**
 * function - createSeatAreaOption
 * 基于 echarts.js 的散点图，创建座位区域
 * @param {Object} data
 * @returns {Object} option
 */
function createSeatAreaOption(data) {
  let chartData = processData(data);

  // option for echarts
  let option = {
    xAxis: {
      show: false,
      interval: 0.5,
      // min: 0.5,
      // max: 4.5
      min: colMin,
      max: colMax
    },
    yAxis: {
      show: false,
      interval: 0.5,
      // min: 0.5,
      // max: 2.5
      min: rowMin,
      max: rowMax
    },
    series: {
      type: 'scatter',
      data: chartData,
      symbol: (data) => {
        console.log(data)
        return 'roundRect'
      },
      symbolSize: 35,
      itemStyle: {
        color: (params) => {
          const data = params.data;
          let status = data[4];
          if (status < 0 || status > seatStatusColor.length - 1) {
            // 如果 status 超出了色表的长度
            status = 1; // used
          }
          return seatStatusColor[status]
        }
      },
      label: {
        show: true,
        position: 'bottom',
        color: '#555',
        formatter: (params) => {
          // console.log(params);
          let data = params.data;
          let str = `${data[1]} 行 ${data[0]} 列`;
          return str
        }
      }
    }
  };

  return option;
}

export {
  createSeatAreaOption,
  processData
};