<template>
  <div id="leave-briefly">
    <el-card class="card-pane">
      <div class="selected-show">
        <span>学生</span>
        <br/>
        <span>学号：{{this.studentID}}</span>
        <br/>
        <span v-if="ifSeated">已选座位：{{this.seatInfo.seatRow}}行{{this.seatInfo.seatCol}}列</span>
        <span v-else>未选座位</span>
      </div>

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
export default {
  name: "LeaveBriefly",
  data() {
    return {
      studentID: "",
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

    // this.$get('', {
    //   studentID: this.studentID
    // }).then(res => {
    //   if(res.statusCode == 200 && res.data.statusCode == 200) {
    //     this.seatInfo = res.data.data;
    //   } else {
    //     // err 
    //   }
    // }).catch(err => {
    //   console.log(err)
    //   this.$message({
    //     type: 'warning',
    //     message: '服务器出错！'
    //   }); 
    // })
  },
  methods: {
    /**
     * LeaveBriefly
     */
    LeaveBriefly() {
      // 需要加入学号验证
      // console.log("Leave Briefly")
      // console.log(`student id:${this.studentID}`)

      // 若未输入学号，不操作
      if(!this.studentID) { 
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
              if(res.statusCode == 200 && res.data.statusCode == 200) {
                this.$notify.success({
                  title: '通知',
                  message: '暂时离席操作成功！'
                });

                // route to other place
                this.$router.push({ name: "Leave", params: { studentID: ""}})
                // this.$router.push({ name: "Login", params: { toRouteName: "Leave"}})
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
      if(!this.studentID) { 
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
            this.$post('/seat/release', { studentID: this.studentID })
                .then(res => {
                  if(res.statusCode == 200) {
                    this.$notify.success({
                      title: "通知",
                      message: "已释放座位！"
                    });
                  } else {
                    this.$notify.error({
                      title: "错误",
                      message: "释放座位过程出现错误！"
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消!'
            });          
          });
    }
  }
}
</script>

<style>

</style>