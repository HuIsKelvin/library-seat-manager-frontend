<template>
  <div id="leave-briefly">
    <el-form>
      <el-input v-model="studentID" :placeholder="placeholder"></el-input>
      <el-button @click="LeaveBriefly">短暂离席</el-button>
      <el-button @click="releaseSeat">释放座位</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LeaveBriefly",
  data() {
    return {
      placeholder: "请输入学号",
      studentID: ""
    }
  },
  methods: {
    /**
     * 
     */
    LeaveBriefly() {
      // 需要加入学号验证
      // console.log("Leave Briefly")
      // console.log(`student id:${this.studentID}`)

      // 若未输入学号，不操作
      if(!this.studentID) { return; }

      const message = `释放学号为 ${this.studentID} 的学生的座位？`
      this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            // 
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
      if(!this.studentID) { return; }

      console.log(`student id:${this.studentID}`)
      console.log("release Seat")
      const message = `释放学号为 ${this.studentID} 的学生的座位？`
      this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            // 
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