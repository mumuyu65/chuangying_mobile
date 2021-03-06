// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Ydd from './Ydd'
import router from './router'
import $ from 'jquery'

import "../static/js/jquery.cookie.js"

import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/js/bootstrap.min'

import store from './store/store'

//关闭生产模式下给出的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<Ydd/>',
    components: {
        Ydd
    }
})