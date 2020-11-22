<template>
  <div id="Login">
    <el-card class="card-pane center">
      <div slot="header" class="clearfix">
        <span>登录</span>
        <!-- <span v-if="toRouteName !==''">
          至
          {{toRoutePageName.toRouteName}}
          页面
        </span> -->
      </div>
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
        <el-form-item>
          <el-button @click="login" type="primary">登录</el-button>
          <!-- <el-button @click="loginTest">登录(测试)</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      toRouteName: "",
      toRoutePageName: {
        "SeatSelect": "选座",
        "Leave": "离席"
      },
      placeholder: "请输入学号",
      ruleForm: {
        studentID: "",
      },
      rules: {
        studentID: [
          {type:'number', message:'请输入数字', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    // get the next route page
    this.toRouteName = this.$route.params.toRouteName || "SeatSelect";
  },
  watch: {
    '$route.params.toRouteName': function(val) {
      console.log("new toRouteName")
      this.toRouteName = val;
    }
  },
  methods: {
    loginTest() {
      this.$router.push({ name: this.toRouteName, params: { studentID: 20214917}})
    },
    login() {
      this.$refs["ruleForm"].validate(valid => {
        if(valid) {
          this.$post('/api/login', {
            studentID: this.ruleForm.studentID
          }).then(res=>{
            console.log(res)
            if(res.statusCode == 200) {
              this.$refs["ruleForm"].resetFields();   // 发送成功后，重置表单
              let id = res.data.studentID;

              this.$router.push({
                name: this.toRouteName,
                params: { studentID: id }
              })
            } else {
              this.$message.error('请输入正确的学号！');
            }
          }).catch(err => {
            console.log(err);
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
#Login {
  .card-pane {
  }
}
</style>