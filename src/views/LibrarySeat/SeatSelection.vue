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

    <StudentSeat class="row" :studentID="studentID" :key="studentID"></StudentSeat>

    <!-- 显示座位列表 -->
    <el-card class="seat-select-card row">
      <div slot="header" class="clearfix">
        <span>座位列表</span>
      </div>
      <SeatChart 
        :chartData="seatList" 
        @seatClick="seatClick"
        v-loading="loading"
        element-loading-background="rgba(250, 250, 250, 0.5)"
      ></SeatChart>
    </el-card>

    <!-- 显示当前选择的座位 -->
    <div class="seat-selected-show row">
      已选择座位：
      <span v-if="ifSelected"><el-tag effect="dark">{{selectedSeatRow}} 行 {{selectedSeatCol}} 列</el-tag></span>
      <span v-else><el-tag type="info">无</el-tag></span>
    </div>

    <el-form @submit.native.prevent class="seat-selected-form row">
      <el-form-item>
        <el-button class="margin-right" @click="seatSelect" v-if="ifCanSelect" type="primary">选座</el-button>
        <el-button class="margin-right" @click="seatSelect" v-else type="primary" disabled>选座</el-button>
        <el-button class="margin-left" @click="seatReset" type="danger">重选</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import SeatChart from './components/SeatChart.vue'
import StudentSeat from '../../components/StudentSeat.vue'

export default {
  name: "SeatSelection",
  components: {
    "SeatChart": SeatChart,
    "StudentSeat": StudentSeat
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
      loading: true,
      ifCanSelect: true
    }
  },
  created() {
    // get the student id from param of route
    let routeStudentID = this.$route.params.studentID;
    if(!routeStudentID) {
      // route to the login page
      // this.$router.push({ name: "Login", params: { toRouteName: "SeatSelect" }})
      this.$router.push({ name: "Home" })
    } else {
      this.studentID = this.$route.params.studentID;
    }

    // this.studentID = this.$route.params.studentID;
    this.getStudentSeat();
    this.loading = true;
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
        result = this.seatList[this.selectedIndex].seatRow;
      }
      return result;
    },
    selectedSeatCol() {
      let result = "";
      if(this.ifSelected) {
        result = this.seatList[this.selectedIndex].seatCol;
      }
      return result;
    },
  },
  watch: {
    '$route.params.studentID': (val) => {
      // console.log("new studentID")
      this.studentID = val;
    },
    studentID(val) {
      // console.log("student change")
      if(val && (val !== -1 || val !== 0)) {
        this.getStudentSeat();
      }
    }
  },
  methods: {

    /**
     * 获取学生的座位信息
     */
    getStudentSeat() {
      if(!this.studentID || this.studentID == -1 || this.studentID == 0) {
        return;
      }

      this.$post('/api/seat/studentSeat', {
        studentID: this.studentID
      }).then(res => {
        const { statusCode, data } = res;
        this.studentID = data.studentID;
        this.studentName = data.studentName;
        if(statusCode == 200 && data.seat) {
          // 该学生已有座位
          this.ifCanSelect = false;
          // this.$notify.warning({ title: '警告', message: '每人只能选一个座位！' })
        } else if(statusCode == 200) {
          // 该学生无座位, 可以选座
          this.ifCanSelect = true;
        } else {
          console.log("Error in getting student seat")
        }
      }).catch(err => {
        console.log(err)
          this.$notify.error({
            title: '错误',
            message: '获取学生座位出错！'
          });
      })
    },

    /**
     * 获取座位信息
     */
    getSeatList() {
      this.loading = true;

      this.$get("/api/seat/info")
        .then(res => {
          let {data, statusCode} = res.data;
          if(statusCode == 200) {
            this.loading = false;
            let seatList = data.seats;
            // seatList.forEach(seatItem => {
            //   // operations
            //   console.log(seatItem)
            // })
            this.seatList = seatList;
            // console.log("this.seatList");
            // console.log(this.seatList);
          } else {
            console.error("[Error]")
            this.$notify.error({
              title: '错误',
              message: '获取座位列表出错！'
            });
          }
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '获取座位列表出错！'
          });
        })
    },

    /**
     * 选择座位的 click 事件
     */
    seatClick(seatData) {
      // console.log("seat id: ")
      // console.log(seatData)
      const { index } = seatData;
      // const seatID = id;
      const seatIndex = index;
      // console.log(`click seat: ${seatID}, ${seatIndex}`)

      // 座位已选或离席
      if(this.seatList[seatIndex].seatStatus !== 0) {
        return;
      }

      /**
       * 点击座位
       * 如果已选，点别的座位，先取消再选
       */
      // 如果已选，则不能选别的，除非先取消
      if(this.ifSelected && this.selectedIndex !== seatIndex) { 
        this.seatReset();
      }
      
      if(this.selectedIndex === seatIndex) {
        // 取消已选的座位
        // this.ifSelected = false;
        // this.seatList[this.selectedIndex].status = 0; // change status to selected
        // this.selectedIndex = -1;
        this.seatReset();
      } else {
        // 选择新的座位
        if(seatIndex < -1 || seatIndex >= this.seatList.length) { return; }  // 边界情况

        this.ifSelected = true;
        this.selectedIndex = seatIndex;
        this.seatList[this.selectedIndex].seatStatus = 3; // change status to selected
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

      // 弹框，询问确认选座
      let row = this.seatList[this.selectedIndex].seatRow;
      let col = this.seatList[this.selectedIndex].seatCol;
      const message = `确定选择 ${row} 行 ${col} 列的座位？`
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // 向后端发送请求
        this.$post('/api/seat/select', {
          studentID: this.studentID,
          seatID: this.seatList[this.selectedIndex].seatID
        }).then(res => {
          if (res.statusCode === 200) {
            // 选座成功
            const message = "选座成功！"
            this.$alert(message, '提示', {
                confirmButtonText: '确定',
                type: 'success',
                showClose: false,
              })
              .then(() => {
                this.$router.push({ name: "Login", params: { toRouteName: "SeatSelect" } })
              })
          } else {
            this.$notify.error({
              title: "错误",
              message: "选座失败！"
            })
            this.getSeatList(); // 选座失败，刷新座位列表
          }
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(() => {
        // 取消操作
        this.$message({
          type: 'info',
          message: '已取消!'
        }); 
      })

    },

    /**
     * 选座重置
     */
    seatReset() {
      if(this.ifSelected) {
        // 修改图标
        this.seatList[this.selectedIndex].seatStatus = 0; // change status to unused
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

  #seat-selection {
    .seat-selected-show,
    .seat-selected-form {
      text-align: center;
    }
    .seat-select-card {
      width: 100%;
    }
  }
</style>