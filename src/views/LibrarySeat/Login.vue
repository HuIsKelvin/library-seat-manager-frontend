<template>
  <div id="Login">
    <el-form
      class="el-form-studentID"
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm"
      @submit.native.prevent>
      <el-form-item>
        <el-input 
          v-model.number="ruleForm.studentID"
          :placeholder="placeholder"
          class="el-input-studentID"
        ></el-input>
      </el-form-item>
      <el-button>登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
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
  }
}
</script>

<style lang="scss" scoped>
#Login {
  
}
</style>