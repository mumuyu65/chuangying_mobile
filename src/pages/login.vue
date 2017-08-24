<template>
  <div class="ydd-login">
    <header>
       <div class="text-center">
         <router-link to="/" class="pull-left"><i class="icon iconfont icon-fanhui1" style="color:#fff; font-weight:500;"></i></router-link>
         <span style="font-size:16px;">登录</span>
       </div>
    </header>
    <div class="container text-center">
      <div class="login-item">
        <i class="icon iconfont icon-shouji"></i>
        <label>用户名</label>
        <input type="text" value="" v-model="username" placeholder="请输入您的手机号"/>
      </div>
      <div class="login-item">
        <i class="icon iconfont icon-suo"></i>
        <label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
        <input type="password" value="" v-model="pwd" placeholder="请输入您的密码"/>
      </div>
      <router-link to="/register" class="pull-left" style="color:#000;">注册新用户</router-link>
      <router-link to="/reset" class="pull-right" style="color:#000;">忘记密码</router-link>
    </div>
    <div class="container text-center">
      <input type="submit" class="form-control" @click="login()" value="登  录"
        style="background-color:#E61F1C; color:#fff;border:1px solid #E61F1C; border-radius:35px; width:50%; margin:0 auto;">
    </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'login',
  data () {
    return {
      username: '',
      pwd: '',
      appIcon:false,
    }
  },
  methods: {
    login (){
      let params={
          account:this.username,
          pwd:this.pwd,
          platform:6,
        };

      let response = api.login(params);
      let that = this;
      response.then(function(res){
          if(res.data.Code ==3){
            window.location.href="#/";

            $.cookie('mobile-user',JSON.stringify(res.data.Data));

            that.$store.dispatch("changeLogin",true);

          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
        });
    }
  }
}
</script>
