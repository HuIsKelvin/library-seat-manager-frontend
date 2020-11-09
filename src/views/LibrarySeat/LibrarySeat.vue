<template>
  <div id="library-seat">
    <h1>Library Seat Selection</h1>

    <!-- 座位显示区域 -->
    <div id="seat-area">
      <template v-for="(seatItem, seatIndex) in seatList">
        <span 
          :key="'seatId_'+seatIndex"
          class="seatItem"
          @click.prevent="selectSeat(seatIndex)"
          :style="{width: seatWidth+'rem', height: seatHeight+'rem', top: (seatItem.row*positionGap + (seatItem.row-1)*seatHeight)+'rem', left: (seatItem.col*positionGap + (seatItem.col-1)*seatWidth)+'rem'}">
            <!-- <img src="#" alt="seat"> -->
        </span>
      </template>
    </div>

    <!-- 显示当前选择的座位 -->
    <div class="seat-selected-show">
      已选择座位：
      <span v-if="ifSelected">{{selectedSeatRow}} 行 {{selectedSeatCol}} 列</span>
      <span v-else>无</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "LibrarySeat",
  data() {
    return {
      seatList: [],
      ifSelected: false,
      selectedIndex: -1,
      seatWidth: 5,
      seatHeight: 5,
      positionGap: 2
    }
  },
  created() {
    // this.axios.get("/api/seat")
    //           .then(res => {
    //             console.log("seatList" + res)
    //             let data = res.data
    //             if(data.statusCode === 200) {
    //               this.seatList = res.data.data;
    //             } else {
    //               console.log("[Error]")
    //             }
    //           })
    //           .catch(err => {
    //             console.log(err)
    //           })
    this.$get("/mock/seat/info")
        .then(res => {
          console.log("seatList" + res)
          let data = res.data
          if(data.statusCode === 200) {
            this.seatList = res.data.data;
          } else {
            console.log("[Error]")
          }
        })
        .catch(err => {
          console.log(err)
        })
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
    /**
     * 选择座位的 click 事件
     */
    selectSeat(seatIndex) {
      console.log("seat index: " + seatIndex)
      // 如果已选，则不能选别的，除非先取消
      if(this.ifSelected && this.selectedIndex !== seatIndex) { 
        this.$message({
          message: "只能选择一个座位哦！",
          type: "warning",
          duration: 1000,
          showClose: true
        })
        // return;
      }
      else if(this.selectedIndex === seatIndex) {
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
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  #seat-area {
    position: absolute;
    width: 100vh;
    height: 50rem;

    .seatItem {
      position: absolute;
      background-color: antiquewhite;
    }
  }
</style>