<template>
  <div id="AccessControl">
    <el-form>
      <el-input v-model="studentID" :placeholder="placeholder"></el-input>
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
      studentID: "",        // 需要加入数字校验
    }
  },
  methods: {
    /**
     * enter Library 进入图书馆
     */
    enterLib() {
      
    },

    /**
     * leave library 离开图书馆
     */
    leaveLib() {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>