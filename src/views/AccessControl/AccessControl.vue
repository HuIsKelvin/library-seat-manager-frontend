<template>
  <div id="AccessControl">
    <el-card class="pane flex-row-col">
      <h1 class="logo">图书馆门禁系统</h1>

      <el-form 
        class="el-form-studentID"
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm"
        @submit.native.prevent>
        <el-form-item prop="studentID">
          <el-input 
            v-model.number="ruleForm.studentID" 
            :placeholder="placeholder"
            class="el-input-studentID"
          ></el-input>
        </el-form-item>
        <el-button class="button margin-right" @click="enterLib" type="primary">进入图书馆</el-button>
        <el-button class="button margin-right margin-left" @click="leaveLib" type="danger">离开图书馆</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AccessControl",  // 模拟图书门禁系统
  component: {

  },
  data() {
    return {
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
  methods: {
    /**
     * enter Library 进入图书馆
     */
    enterLib() {
      this.$refs["ruleForm"].validate(valid => {
        if(valid) {
          this.$post('/api/enterLib', {
            studentID: this.ruleForm.studentID
          }).then(res=>{
            console.log(res)
            if(res.statusCode == 200) {
            // if(res.statusCode == 200 && res.data.statusCode == 200) {
              // let id = res.data.studentID;
              // this.$message({
              //   type: "info",
              //   message: '进入图书馆！'
              // })
              this.$notify.success({
                title: "通知",
                message: "已进入图书馆！"
              })
              this.$refs["ruleForm"].resetFields();   // 发送成功后，重置表单
            } else {
              this.$message.error('请输入正确的学号！')
            }
          })
        } else {
          this.$message.error('请输入正确的学号！')
        }
      })
    },

    /**
     * leave library 离开图书馆
     */
    leaveLib() {
      this.$refs["ruleForm"].validate(valid => {
        if(valid) {
          // send post
          this.$post('/api/leaveLib', {
            "studentID": this.ruleForm.studentID
          }).then(res => {
            // let data = res.data;
            console.log(res);
            if(res.statusCode === 200) {
              // let id = res.data.studentID;
              // this.$message({
              //   type: "info",
              //   message: `离开图书馆！`
              // })
              this.$notify.success({
                title: "通知",
                message: "已离开图书馆！"
              })
              this.$refs["ruleForm"].resetFields();   // 发送成功后，重置表单
            } else {
              this.$message.error('请输入正确的学号！')
            }
          })          
        } else {
          this.$message.error('请输入正确的学号！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../element-variables.scss";

#AccessControl {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-grey-light;

  .pane {
    padding: 1.5rem;
    margin: 0 auto;
    min-width: 40rem;
    min-height: 20rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .button {
      margin-top: 1rem;
    }
  }
}
</style>