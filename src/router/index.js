import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/pages/index'

import Chat from '@/components/chat'

export default new Router({
  routes: [{
    path: '/',
    name: 'chat',
    component: Chat
  }],
});