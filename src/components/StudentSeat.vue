<template>
  <div id="student-seat">
      <div class="selected-show">
        <el-row class="info-row">
          <el-col :span="4">学生</el-col>
          <el-col :span="6">{{this.studentName}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="4">学号</el-col>
          <el-col :span="6">{{this.studentID}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="4">已选座位</el-col>
          <el-col :span="6">
            <span v-if="ifSeated">
              <el-tag effect="dark">{{this.seatInfo.seatRow}} 行 {{this.seatInfo.seatCol}} 列</el-tag>
            </span>
            <span v-else>
              <el-tag type="info" effect="dark">无座位</el-tag>
            </span>
          </el-col>
        </el-row>
        <el-alert
          title="每人只能选一个座位！"
          type="warning"
          show-icon
          v-if="ifSeated">
        </el-alert>

      </div>
  </div>
</template>

<script>
  export default {
    name: "StudentSeat",
    props: {
      studentID: {
        required: true
      }
    },
    data() {
      return {
        studentName: "",
        seatInfo: {
          seatID: -1,
          seatRow: -1,
          seatCol: -1,
          seatStatus: -1,
          seatType: -1,
        },
        ifSeated: false
      }
    },
    mounted() {
      this.getStudentSeat()
    },
    watch: {
      studentID: {
        handler: function() {
          this.getStudentSeat();
        },
        deep: true
      }
    },
    methods: {
      /**
       * LeaveBriefly
       * 获取学生拥有的座位信息
       */
      getStudentSeat() {
        this.$post('/api/seat/studentSeat', {
          studentID: this.studentID
        }).then(res => {
          console.log("get student seat")
          const {
            statusCode,
            data
          } = res;
          console.log(statusCode)
          console.log(data)
          if (statusCode == 200 && data.seat) {
            console.log("have seat")
            this.seatInfo = data.seat;
            // this.studentID = data.studentID;
            this.studentName = data.studentName;
            this.ifSeated = true;
          } else {
            console.log("have no seat")
            // 该学生无座位
            // this.studentID = data.studentID;
            this.studentName = data.studentName;
            this.ifSeated = false;
          }
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '获取学生座位出错！'
          });
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>