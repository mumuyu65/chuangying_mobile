<template>
  <div class="ydd-login">
    <header>
      <div class="text-center">
         <router-link to="/login" class="pull-left"><i class="icon iconfont icon-fanhui1" style="color:#fff; font-weight:500;"></i></router-link>
         <span style="font-size:16px;">修改密码</span>
       </div>
    </header>
    <div class="container text-center">
      <div class="login-item" >
        <i class="icon iconfont icon-shouji"></i>
        <label>手机号</label>
        <input type="text" value="" v-model="phone" placeholder="请输入手机号"/>
      </div>
      <div class="login-item">
        <i class="icon iconfont icon-yanzhengma"></i>
        <label>验证码</label>
        <input type="text" value="" v-model="vcode" placeholder="请输入验证码"/>
        <span style="position:absolute; right:0; top:10px; font-size:10px; padding:5px 8px; background-color:#e61f1c; color:#fff; border-radius:15px;">发送验证码</span>
      </div>
      <div class="login-item">
        <i class="icon iconfont icon-suo"></i>
        <label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
        <input type="text" value="" v-model="pwd" placeholder="请输入密码"/>
      </div>
    </div>
    <div class="container text-center">
      <input type="submit" class="form-control" @click="doRegister()" value="修改密码"
        style="background-color:#E61F1C; color:#fff;border:1px solid #E61F1C; width:50%; margin:0 auto; border-radius:35px;">
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
      pwd: ''
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
          //console.log(res);
          if(res.data.Code ==3){
            that.$router.push('/chat');
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

<style scoped>
  .ydd-login .container{
    width:90%;
    margin:0 auto;
    margin-top:10%;
    position:relative;
    height:20%;
  }

  .ydd-login .form-control{
    margin-bottom:10px;
  }
</style>
