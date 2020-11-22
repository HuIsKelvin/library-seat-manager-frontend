<template>
  <div id="home">
    <el-card class="pane flex-row-col">
      <h1>图书馆选座系统</h1>
      <router-link :to="{name: 'Login', params: { toRouteName: 'SeatSelect' }}">
        <el-button class="button" type="primary">选座</el-button>
      </router-link>
      <router-link :to="{name: 'Login', params: { toRouteName: 'Leave' }}">
        <el-button class="button" type="primary">离席</el-button>
      </router-link>
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
@import './../element-variables.scss';

  #home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    // background-color: $color-green-light;
    background-color: $color-white;

    .pane {
      margin: 0 auto;
      max-width: 50rem;
      min-width: 35rem;
      min-height: 20rem;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      // display: flex;
      // display: -webkit-flex;
      // align-items:center;
      // justify-content:center;
    }

    .button {
      margin: .5rem 1rem;
      width: 100px;
      height: 50px;
      border-radius: 30px;
    }
  }
</style>