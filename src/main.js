import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import './assets/css/common.css';
import {
  Lazyload,
  Toast
} from 'vant';

import host from './host'

Vue.use(Vant);
Vue.use(Lazyload, {
  lazyComponent: true,
  try: 1
});
Vue.use(Toast);
Vue.prototype.$host = host;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

Vue.config.productionTip = false

// 过滤，保留小数点后两位
Vue.filter('floatFilter', (value) => {
  return Number(parseFloat(value).toFixed(0)) == Number(parseFloat(value).toFixed(1)) ? Number(parseFloat(value).toFixed(0)) : 
        Number(parseFloat(value).toFixed(1)) == Number(parseFloat(value).toFixed(2)) ? Number(parseFloat(value).toFixed(1)) : 
        Number(parseFloat(value).toFixed(2))
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')