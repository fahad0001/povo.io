// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {VueMasonryPlugin} from 'vue-masonry'

// require styles
import 'swiper/dist/css/swiper.css'

import { store } from './store'

Vue.config.productionTip = false
Vue.use(VueMasonryPlugin)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
Vue.use(require('vue-chartist'))

/* eslint-disable no-new */
export const vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  }
})
