import Vue from 'vue'
import App from './App.vue'
import api from './request/api/index'
import router from './router'
import {
  Panel,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Skeleton,
  Cell,
  CellGroup,
  Area,
  Notify,
  Image,
  List,
  Lazyload,
  NavBar,
} from 'vant'



Vue.use(router)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Panel)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Skeleton)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Area);
Vue.use(Notify);
Vue.use(Image);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(NavBar);

Vue.config.productionTip = false
Vue.prototype.$api = api



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
