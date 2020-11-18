<template>
  <div id="header">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col class="header-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <span class="logo">
          <router-link to="/">选座系统</router-link>
        </span>
      </el-col>
      <el-col class="header-col header-links hidden-xs-only"  :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'SeatSelect' }}">选座</router-link>
        </span>
        <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'Leave' }}">离席</router-link>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: "MyHeader"
}
</script>

<style lang="scss" scoped>
#header {
  height: 60px;

  .header-col {
    height: 60px;
    line-height: 60px;
    
    .logo {
      margin-left: 1rem;
      padding: 0 1rem;
    }
    .link {
      float: right;
      margin: 0;
      padding: 0 1rem;

      ::after {
        display: block;
      }
    }

  }

  .header-links {
    :hover {
      background-color: rgb(44, 126, 194);
      color: #EEE;
    }
  }

}
</style>