<template>
  <div id="header">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col class="header-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <!-- logo -->
        <router-link to="/" tag="span">
          <span class="logo">图书馆选座系统</span>
        </router-link>
      </el-col>

      <el-col class="header-col header-links cover-fullhidden-xs-only"  :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <!-- link of header(选座、离席等等) -->
        <!-- <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'Leave' }}">离席</router-link>
        </span>
        <span class="link">
          <router-link :to="{name: 'Login', params: { toRouteName: 'SeatSelect' }}">选座</router-link>
        </span> -->

        <!-- <el-menu 
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
        </el-menu> -->

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
        backgroundColor: "#5C944C",
        textColor: "#fff",
        activeTextColor: "#ffd04b"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../element-variables.scss';

#header {
  height: 60px;
  // background-color: #087236;
  background-color: $color-green-light;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }

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

}
</style>