<template>
  <div class="index">
    <zhibo></zhibo>
    <div style="position:absolute; top:1.30rem; right:10px; color:#fff;z-index:222;">
      <ul class="list-unstyled app-icon">
        <li class="login"><i class="icon iconfont icon-yonghu" @click="showLogin()"></i></li>
        <li><i class="icon iconfont icon-yuyin" @click="setVolume()" v-if="volume"></i>
            <i class="icon iconfont icon-yuyin" @click="changeVolume()" v-if="!volume"></i>
        </li>
      </ul>
    </div>
    <ul class="chat-tab">
      <li><router-link to="/chat">聊天</router-link></li>
      <li><a href="javascript:void(0)">专家一对一</a></li>
      <li><a href="javascript:void(0)" @click="economics()">金融说天下</a></li>
      <li class="customer text-center" style="line-height:0.7rem;" @click="callQQ()">
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
    },

    callQQ(){
      let url = "tencent://message/?Menu=yes&amp;amp;uin=1919991722&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988560E6A29DD620C36E5D02A3C50894BFDDFA9AE24C72EA4E656447195EDF21AA25E56C81415A4E3E06394A554DD64F3F1A382F9455BCE1C9214192773F8AF6EBF516F0E7092D08806B703D054DC2F56A1F65106C78DF1021C883D86C37678EE2EDB615B9954A338A2B2CD7A840089AB4E&amp;amp;SigU=30E5D5233A443AB2727689328A4863A4534880EE96161430D2EA5140D343AB27F9CE70D1273A9F87C0C4EA780476BBB4EB0CD74D567304A9E32DB62FCEABADF3D6133AE3F86FDB82";
      window.location.href = url;
    }
  }
}
</script>

<style>
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
