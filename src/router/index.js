import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/pages/index'

import Chat from '@/components/chat'

import Login from '@/pages/login'

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        children: [{
            path: '/chat',
            name: 'chat',
            component: Chat
        }]
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }],
});