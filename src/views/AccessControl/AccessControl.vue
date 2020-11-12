<template>
  <div id="AccessControl">
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
      <el-button @click="enterLib">进入图书馆</el-button>
      <el-button @click="leaveLib">离开图书馆</el-button>
    </el-form>
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
          // 可以发送表单
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
          // 可以发送表单
          this.$post('/leaveLib', {
            "studentID": this.ruleForm.studentID
          }).then(res => {
            let data = res.data;
            if(res.status === 200 && data.statusCode === 200) {
              this.$refs["ruleForm"].resetFields();   // 发送成功后，重置表单
            } else {
              // 
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

</style>