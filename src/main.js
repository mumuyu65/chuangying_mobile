// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Ydd from './Ydd'
import router from './router'
import $ from 'jquery'

import "../static/js/jquery.cookie.js"

import 'animate.css'
import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/js/bootstrap.min'

//关闭生产模式下给出的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<Ydd/>',
    components: {
        Ydd
    }
})