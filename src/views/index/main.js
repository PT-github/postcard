import Vue from 'vue/dist/vue.js'
import App from '@/components/App.vue'
import '@/assets/css/style.css'
// axios
import '@/config/axios.js';
// router
import router from './router/index.js'
// include
import '@/config/include.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
