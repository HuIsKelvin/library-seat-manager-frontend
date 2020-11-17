<template>
  <div id="library-seat">
    <el-header>
      <MyHeader></MyHeader>
    </el-header>
    
    <el-container>
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

</style>