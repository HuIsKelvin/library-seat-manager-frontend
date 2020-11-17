<template>
  <div id="library-seat">
    <el-header class="header">
      <MyHeader></MyHeader>
    </el-header>
    
    <el-container class="container">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'

export default {
  name: "LibrarySeat",
  components: {
    "MyHeader": MyHeader
  }
}
</script>

<style lang="scss">
#library-seat {

  .container {
    height: calc(100vh - 60px);
  }
}
</style>