<template>
  <div class="app">
    <zhibo></zhibo>
    <div class="login" style="position:absolute; top:1.20rem; right:10px; color:#fff;z-index:222;">
      <ul class="list-unstyled">
        <li style="margin-bottom:5px; background-color:rgba(46,55,72,0.5); padding:5px;border-radius:50%;"><i class="icon iconfont icon-yonghu" style="padding:2px;border:1px solid #fff; border-radius:50%;"></i></li>
        <li style="margin-bottom:5px; background-color:rgba(46,55,72,0.5); padding:5px;border-radius:50%;"><i class="icon iconfont icon-yuyin" style="padding:2px;border:1px solid #fff; border-radius:50%;"></i></li>
        <li style="margin-bottom:5px; background-color:rgba(46,55,72,0.5); padding:5px;border-radius:50%;"><i class="icon iconfont icon-huanyuansuofang" style="padding:2px;border:1px solid #fff; border-radius:50%;"></i></li>
      </ul>
    </div>
    <ul class="chat-tab">
      <li><router-link to="/">聊天</router-link></li>
      <li><a href="javascript:void(0)">专家一对一</a></li>
      <li><a href="javascript:void(0)" @click="economics()">金融说天下</a></li>
      <li class="customer text-center" style="line-height:0.7rem;">
        <div class="icon iconfont icon-erji" style="height:50%;font-size:0.6rem;"></div>
        <span>客服</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Zhibo from '@/components/zhibo.vue'
export default {
  name: 'ydd',
  components: { Zhibo },
  methods:{
    economics(){
      alert('开发中....');
    },
  }
}
</script>

<style>
  .app .chat-tab{
    margin:0;
    width:100%;
    height:1.07rem;
    line-height:1.07rem;
    background-color:#E61F1C;
    position:relative;
  }

  .app .router-link-active{
    text-decoration:none;
    background-color:#BD0C08;
  }

  .app .chat-tab>li{
    height:100%;
    padding:0 8px;
    display:inline-block;
    vertical-align:middle;
  }

  .app .chat-tab>li>a{
    font-size:0.48rem;
    color:#fff;
    padding:5px 6px;
  }

  .app .customer{
    position:absolute;
    right:0;
    top:0;
    width:1.67rem;
    background-color:#E8A32A;
    color:#fff;
  }
</style>
