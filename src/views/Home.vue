<template>
  <div id="home">
    <el-card class="pane">
      <h1>图书馆选座系统</h1>
      <el-button>
        <router-link :to="{name: 'SeatSelect'}">选座</router-link>
      </el-button>
      <el-button>
        <router-link :to="{name: 'Leave'}">离席</router-link>
      </el-button>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss" scoped>
#home {
  position: relative;
  margin: 0 auto;

  .pane{
    margin: 0 auto;
    max-width: 50rem;
    min-width: 35rem;
    min-height: 20rem;
  }
}
</style>
