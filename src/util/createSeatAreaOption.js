// 
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
    rowMax = Math.max(rowMax, seat.row)
    colMax = Math.max(colMax, seat.col)
    let seatData = [seat.col, seat.row, index, seat.id, seat.status, seat.type];
    seriesData.push(seatData);
  })

  rowMax += 0.5;
  colMax += 0.5;

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
        return 'circle'
      },
      symbolSize: 40,
      label: {
        show: true,
        position: 'bottom',
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