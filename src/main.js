import Vue from 'vue'
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
import './assets/css/global.css'
Vue.config.productionTip = false

// 使用UI
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
