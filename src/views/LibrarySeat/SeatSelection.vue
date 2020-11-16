<template>
  <div id="seat-selection">

    <!-- 座位显示区域 -->
    <!-- <div id="seat-area">
      <div v-for="(seatItem, seatIndex) in seatList" :key="'seatId_'+seatIndex">
        <span 
          class="seatItem"
          @click.prevent="seatClick(seatIndex)"
          :style="{width: seatWidth+'rem', height: seatHeight+'rem', top: (seatItem.row*positionGap + (seatItem.row-1)*seatHeight)+'rem', left: (seatItem.col*positionGap + (seatItem.col-1)*seatWidth)+'rem'}">
            <img src="#" alt="seat">
        </span>
      </div>
    </div> -->

    <SeatChart :chartData="seatList" @seatClick="seatClick"></SeatChart>

    <!-- 显示当前选择的座位 -->
    <div class="seat-selected-show">
      已选择座位：
      <span v-if="ifSelected">{{selectedSeatRow}} 行 {{selectedSeatCol}} 列</span>
      <span v-else>无</span>
    </div>

    <el-form @submit.native.prevent>
      <el-form-item>
        <el-button @click="seatSelect">选座</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="seatReset">重选</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import SeatChart from './components/SeatChart.vue'

export default {
  name: "SeatSelection",
  components: {
    "SeatChart": SeatChart
  },
  data() {
    return {
      studentID: 0,       // 选座的学生的id
      seatList: [],       // 座位列表
      ifSelected: false,  // 是否已选座位
      selectedIndex: -1,  // 已选座位在 seatList 的index
      selectedID: -1,  // 已选座位的 seatID
      seatWidth: 5,
      seatHeight: 5,
      positionGap: 2,
      icon: {
        icon_unused: require("./../../assets/logo.png"),
        icon_used: require("./../../assets/logo.png"),
        icon_selected: require("./../../assets/logo.png"),
      }
    }
  },
  created() {
    this.getSeatList();
  },
  beforeMounted() {
  },
  mounted() {
    
  },
  computed: {
    selectedSeatRow() {
      let result = "";
      if(this.ifSelected) {
        result = this.seatList[this.selectedIndex].row;
      }
      return result;
    },
    selectedSeatCol() {
      let result = "";
      if(this.ifSelected) {
        result = this.seatList[this.selectedIndex].col;
      }
      return result;
    },
  },
  methods: {
    clickTest(seatData) {
      console.log("on event");
      console.log(seatData);
    },

    /**
     * 获取座位信息
     */
    getSeatList() {
      console.log("[Log] begin to get seat list");
      // this.$get("/seat/info")
      this.$get("/api/seat/info")
        .then(res => {
          console.log("seatList");
          let data = res.data;
          console.log(data);
          if(data.statusCode == 200) {
            let seatList = data.seatList;
            seatList.forEach(seatItem => {
              // operations
              console.log(seatItem)
            })
            this.seatList = seatList;
          } else {
            console.log("[Error]")
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    /**
     * 选择座位的 click 事件
     */
    seatClick(seatData) {
      console.log("seat id: ")
      // console.log(seatData)
      const { id, index } = seatData;
      const seatID = id;
      const seatIndex = index;
      console.log(`${seatID}, ${seatIndex}`)

      /**
       * 点击座位
       * 如果已选，点别的座位，先取消再选
       */
      // 如果已选，则不能选别的，除非先取消
      if(this.ifSelected && this.selectedIndex !== seatIndex) { 
        this.seatReset();
        // this.$message({
        //   message: "只能选择一个座位哦！",
        //   type: "warning",
        //   duration: 1000,
        //   showClose: true
        // })
        // return;
      }
      
      if(this.selectedIndex === seatIndex) {
        // 取消已选的座位
        this.ifSelected = false;
        this.selectedIndex = -1;
        // this.seatList[this.selectedIndex].icon = ...;
      } else {
        // 选择新的座位
        if(seatIndex < 0 || seatIndex >= this.seatList.length) { return; }  // 边界情况

        this.ifSelected = true;
        this.selectedIndex = seatIndex;
        // this.seatList[this.selectedIndex].icon = ...;
      }
    },

    /**
     * 发送选座请求
     */
    seatSelect() {
      if(!this.ifSelected) {
        this.$message({
          message: "还未选择座位！",
          type: "warning"
        })
        return;
      }
      // 弹框，确认选座

      // loading

      // 向后端发送请求
      this.$post('/api/seat/select', {
        studentID: this.studentID,
        seatID: this.seatList[this.selectedIndex].id
      }).then(res => {
        if(res.statusCode === 200) {
          let {statusCode, data} = res.data;
          console.log(data)
          if(statusCode === 200) {
            // 选座成功
            // 选座成功后的操作
          } else {
            // 发生错误
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 选座重置
     */
    seatReset() {
      if(this.ifSelected) {
        // 修改图标
        // this.seatList[this.selectedIndex].icon = ...;
      }
      this.ifSelected = false;
      this.selectedIndex = -1;
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  #seat-area {
    position: absolute;
    width: 100vh;
    height: 50rem;
    // overflow: scroll;

    .seatItem {
      // position: absolute;
      position: relative;
      background-color: antiquewhite;
    }
  }
</style>