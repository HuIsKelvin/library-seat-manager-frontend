<template>
  <div id="library-seat">
    <MyHeader></MyHeader>
    <router-view></router-view>
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