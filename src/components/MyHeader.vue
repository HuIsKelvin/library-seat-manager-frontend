<template>
  <div id="header">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col class="header-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <span class="logo">
          <router-link to="/">选座系统</router-link>
        </span>
      </el-col>
      <el-col class="header-col header-links cover-fullhidden-xs-only"  :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <!-- <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'Leave' }}">离席</router-link>
        </span>
        <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'SeatSelect' }}">选座</router-link>
        </span> -->

        <el-menu 
          :default-active="this.$router.name" 
          class="el-menu-demo link" 
          mode="horizontal"
          router
          :background-color="headerStyle.backgroundColor"
          :text-color="headerStyle.textColor"
          :active-text-color="headerStyle.activeTextColor">
          <el-menu-item index="SeatSelection" :route="{name: 'Login', params: { toRouteName: 'SeatSelect' }}">
            <span class="link">选座</span>
          </el-menu-item>
          <el-menu-item index="Leave" :route="{name: 'Login', params: { toRouteName: 'Leave' }}">
            <span class="link">离席</span>
          </el-menu-item>
        </el-menu>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: "MyHeader",
  data() {
    return {
      headerStyle: {
        backgroundColor: "#087236",
        textColor: "#fff",
        activeTextColor: "#ffd04b"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  height: 60px;
  background-color: #087236;

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
    // :hover {
    //   background-color: rgb(44, 126, 194);
    //   color: #EEE;
    // }
  }

}
</style>