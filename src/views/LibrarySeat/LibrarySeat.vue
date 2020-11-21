<template>
  <div id="library-seat">
    <el-header class="header">
      <MyHeader></MyHeader>
    </el-header>
    
    <el-container class="container">
      <router-view class="container-view"></router-view>
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
    max-width: 1400px;
    min-width: 800px;
    // width: 60%;
    // max-width: 400px;
    // min-width: 200px;
    // min-width: 60%;
    margin: 0 auto;

    .container-view {
      width: 100%;
    }
  }
}
</style>