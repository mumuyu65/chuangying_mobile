<template>
  <div class="index">
    <zhibo></zhibo>
    <div class="login" style="position:absolute; top:1.20rem; right:10px; color:#fff;z-index:222;">
      <ul class="list-unstyled app-icon">
        <li><i class="icon iconfont icon-yonghu" @click="showLogin()"></i></li>
        <li><i class="icon iconfont icon-yuyin" @click="setVolume()" v-if="volume"></i><i class="icon iconfont icon-yuyin" @click="changeVolume()" v-if="!volume"></i></li>
      </ul>
    </div>
    <ul class="chat-tab">
      <li><router-link to="/chat">聊天</router-link></li>
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
import API from '@/api/API'
//实例化api
const api = new API();

import Zhibo from '@/components/zhibo.vue'

export default {
  name: 'index',
  data(){
    return{
      volume:true,
    }
  },
  components: { Zhibo },
  methods:{
    economics(){
      alert('开发中....');
    },

    setVolume(){
      this.volume = ! this.volume;
      CKobject.getObjectById('ckplayer_a1').changeVolume('0');
    },

    changeVolume(){
      this.volume = ! this.volume;
      CKobject.getObjectById('ckplayer_a1').changeVolume('100');
    },

    showLogin(){
      this.$router.push("/login");
    }
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

  .app .app-icon>li{
    margin-bottom:5px;
    background-color:rgba(46,55,72,0.5);
    padding:5px;
    border-radius:50%;
  }

  .app .app-icon>li>i{
    padding:2px;
    border:1px solid #fff;
    border-radius:50%;
  }
</style>
