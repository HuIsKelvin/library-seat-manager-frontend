<template>
  <div id="leave-briefly">
    <el-card class="card-pane">
      <div class="selected-show">
        <el-row class="info-row">
          <el-col :span="4">学生</el-col>
          <el-col :span="6">{{this.studentName}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="4">姓名</el-col>
          <el-col :span="6">{{this.studentID}}</el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="4">已选座位</el-col>
          <el-col :span="6">
            <!-- <span v-if="ifSeated">{{this.seatInfo.seatRow}} 行 {{this.seatInfo.seatCol}} 列</span>
            <span v-else>无座位</span> -->
            <span v-if="ifSeated">
              <el-tag effect="dark">{{this.seatInfo.seatRow}} 行 {{this.seatInfo.seatCol}} 列</el-tag>
            </span>
            <span v-else>
              <el-tag type="info">无座位</el-tag>
            </span>
          </el-col>
        </el-row>

        <!-- <span>学生：{{this.studentName}}</span>
        <span>学号：{{this.studentID}}</span>
        <span v-if="ifSeated">已选座位：{{this.seatInfo.seatRow}}行{{this.seatInfo.seatCol}}列</span>
        <span v-else>未选座位</span> -->
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <el-form
        class="el-form-studentID"
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm"
        @submit.native.prevent>
        <!-- <el-form-item>
          <el-input 
            v-model.number="ruleForm.studentID" 
            :placeholder="placeholder"
            class="el-input-studentID"
          ></el-input>
        </el-form-item> -->
        <el-button @click="LeaveBriefly">短暂离席</el-button>
        <el-button @click="releaseSeat">释放座位</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import StudentSeat from '../../components/StudentSeat.vue'

export default {
  name: "LeaveBriefly",
  components: {
    // "StudentSeat": StudentSeat
  },
  data() {
    return {
      studentID: "",
      studentName: "",
      seatInfo: {
        seatID: -1,
        seatRow: -1,
        seatCol: -1,
        seatStatus: -1,
        seatType: -1,
      },
      ifSeated: false,
      placeholder: "请输入学号",
      ruleForm: {
        studentID: "",
      },
      rules: {
        studentID: [
          // { required: true, message: '请输入学号', trigger: 'blur' },
          {type:'number', message:'请输入数字', trigger: 'change'}
        ]
      }
    }
  },
  beforeCreate() {
    // get the student id from param of route
    let routeStudentID = this.$route.params.studentID;
    if(!routeStudentID) {
      // route to the login page
      this.$router.push({ name: "Login", params: { toRouteName: 'Leave' }})
    } else {
      this.studentID = this.$route.params.studentID;
    }

  },
  mounted() {
    this.studentID = this.$route.params.studentID;
    
    this.getStudentSeat();
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
        const { statusCode, data } = res;
        if(statusCode == 200 && data.seat) {
          this.seatInfo = data.seat;
          this.studentID = data.studentID;
          this.studentName = data.studentName;
          this.ifSeated = true;
        } else {
          // 该学生无座位
          this.studentID = data.studentID;
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

    /**
     * LeaveBriefly
     */
    LeaveBriefly() {
      // 需要加入学号验证
      // console.log("Leave Briefly")
      // console.log(`student id:${this.studentID}`)

      if(!this.ifSeated) { 
        this.$message({
          message: "您暂时没有座位！",
          type: "warning"
        })
        return; 
      }

      const message = `暂时离开学号为 ${this.studentID} 的学生的座位？`
      this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$post('/api/seat/leave', {
              studentID: this.studentID
            }).then(res => {
              console.log("leave requeset sended!")
              if(res.statusCode == 200) {
                // this.$router.push({ name: "Login", params: { toRouteName: "Leave"}})
                // this.$notify.success({
                //   title: '通知',
                //   message: '已暂时离席！'
                // });
                this.operationSuccess();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "暂时离席失败！"
                });
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消!'
            });          
          });
    },

    /**
     * release seat 释放座位
     */
    releaseSeat() {
      // 若未输入学号，不操作
      if(!this.ifSeated) { 
        this.$message({
          message: "您暂时没有座位！",
          type: "warning"
        })
        return; 
      }

      console.log(`student id:${this.studentID}`)
      console.log("release Seat")
      const message = `释放学号为 ${this.studentID} 的学生的座位？`
      this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$post('/api/seat/release', { studentID: this.studentID })
                .then(res => {
                  if(res.statusCode == 200) {
                    // this.$router.push({name: "Login", params: { toRouteName: "Leave"}})
                    // this.$notify.success({
                    //   title: "通知",
                    //   message: "已释放座位！"
                    // });
                    this.operationSuccess();
                  } else {
                    this.$notify.error({
                      title: "错误",
                      message: "释放座位过程出现错误！"
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  this.$notify.error({
                    title: "错误",
                    message: "释放座位过程出现错误！"
                  });
                })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消!'
            });          
          });
    },

    operationSuccess() {
      const message = "操作成功！"
      this.$alert(message, '提示', {
            confirmButtonText: '确定',
            type: 'success',
            showClose: false,
            //callback: ()=> { this.$router.push({ name: "Login", params: { toRouteName: "Leave" } }) }
          })
          .then(()=> {
            this.$router.push({ name: "Login", params: { toRouteName: "Leave" } })
          })
    }
  }
}
</script>

<style>

</style>