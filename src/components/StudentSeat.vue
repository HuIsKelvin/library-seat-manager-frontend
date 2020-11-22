<template>
  <div id="student-seat">
      <div class="selected-show">
        <!-- 提示条 -->
        <el-row>
          <el-alert
          title="每人只能选一个座位！"
          type="warning"
          show-icon
          v-if="ifSeated">
        </el-alert>

        <!-- 学生信息 -->
        </el-row>
        <el-row class="info-row">
          <el-col :xs="spanTitle.xs" :sm="spanTitle.sm" :md="spanTitle.md" :lg="spanTitle.lg" :xl="spanTitle.xl">学生</el-col>
          <el-col :xs="spanInfo.xs" :sm="spanInfo.sm" :md="spanInfo.md" :lg="spanInfo.lg" :xl="spanInfo.xl">{{this.studentName}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :xs="spanTitle.xs" :sm="spanTitle.sm" :md="spanTitle.md" :lg="spanTitle.lg" :xl="spanTitle.xl">学号</el-col>
          <el-col :xs="spanInfo.xs" :sm="spanInfo.sm" :md="spanInfo.md" :lg="spanInfo.lg" :xl="spanInfo.xl">{{this.studentID}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :xs="spanTitle.xs" :sm="spanTitle.sm" :md="spanTitle.md" :lg="spanTitle.lg" :xl="spanTitle.xl">已选座位</el-col>
          <el-col :xs="spanInfo.xs" :sm="spanInfo.sm" :md="spanInfo.md" :lg="spanInfo.lg" :xl="spanInfo.xl">
            <el-badge 
              :value="(seatInfo.seatStatus===2) ? '离席中' : '使用中'" 
              :type="(seatInfo.seatStatus===2) ? 'info' : 'danger'"
              :hidden="!ifSeated">
              <span v-if="ifSeated">
                <el-tag effect="dark">{{this.seatInfo.seatRow}} 行 {{this.seatInfo.seatCol}} 列</el-tag>
              </span>
              <span v-else>
                <el-tag type="info">无座位</el-tag>
              </span>
            </el-badge>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
  export default {
    name: "StudentSeat",
    props: {
      studentID: {
        required: true
      },
      seatStatus: {
        "": "",
        0: 'unused',
        1: 'used',
        2: 'leave'
      }
    },
    data() {
      return {
        studentName: "",
        seatInfo: {
          seatID: -1,
          seatRow: -1,
          seatCol: -1,
          seatStatus: 1,
          seatType: -1,
        },
        ifSeated: false,
        spanTitle: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 2,
          xl: 2
        },
        spanInfo: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 4,
          xl: 4
        },
      }
    },
    mounted() {
      if(this.studentID && (this.studentID !== -1 || this.studentID !== 0)) {
        this.getStudentSeat();
      }
    },
    watch: {
      studentID: {
        handler: function(val) {
          if(val && (val !== -1 || val !== 0)) {
            this.getStudentSeat();
          }
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
          const { statusCode, data } = res;
          // console.log(statusCode)
          // console.log(data)
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