import Vue from 'vue'
import './plugins/axios'
import './plugins/echarts'
import App from './App.vue'
// import router from './router'
import router from './plugins/router'
import './util/http.js'
import './plugins/element.js'
import './assets/main.scss'   // 全局样式表

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
