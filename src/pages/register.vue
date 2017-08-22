<template>
  <div class="ydd-login">
    <header>
      <div class="text-center">
        <router-link to="/login" class="pull-left"><i class="icon iconfont icon-fanhui1" style="color:#fff"></i></router-link>
        <span style="font-size:16px;">注册</span>
      </div>
    </header>
    <div class="container text-center">
      <div class="" style="border-bottom:1px solid #ececec;padding:5px 0; margin-bottom:10px;" >
        <i class="icon iconfont icon-shouji" style="font-size:25px;color:#e61f1c"></i>
        <label style="font-size:16px; vertical-align:top; padding-top:5px;">手机号</label>
        <input type="text" value="" v-model="username"
          style="border:1px solid transparent; height:30px; margin-left:20px; vertical-align:top;" placeholder="请输入手机号"/>
      </div>
      <div class="" style="border-bottom:1px solid #ececec;padding:5px 0; margin-bottom:10px;" >
        <i class="icon iconfont icon-yanzhengma" style="font-size:25px;color:#e61f1c"></i>
        <label style="font-size:16px; vertical-align:top; padding-top:5px;">验证码</label>
        <input type="text" value="" v-model="vcode"
          style="border:1px solid transparent; height:30px; margin-left:20px; vertical-align:top;"
           placeholder="请输入验证码"/>
      </div>
      <div class="" style="border-bottom:1px solid #ececec;padding:5px 0; margin-bottom:10px;" >
        <i class="icon iconfont icon-yonghu" style="font-size:25px;color:#e61f1c; font-weight:700"></i>
        <label style="font-size:16px; vertical-align:top; padding-top:5px;">昵&nbsp;&nbsp;&nbsp;&nbsp;称</label>
        <input type="text" value="" v-model="nick"
          style="border:1px solid transparent; height:30px; margin-left:20px; vertical-align:top;"
           placeholder="请输入昵称"/>
      </div>
      <div class="" style="border-bottom:1px solid #ececec;padding:5px 0; margin-bottom:10px;" >
        <i class="icon iconfont icon-suo" style="font-size:25px;color:#e61f1c"></i>
        <label style="font-size:16px; vertical-align:top; padding-top:5px;">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
        <input type="text" value="" v-model="pwd"
          style="border:1px solid transparent; height:30px; margin-left:20px; vertical-align:top;"
           placeholder="请输入密码"/>
      </div>
    </div>
    <div class="container text-center">
      <input type="submit" class="form-control" @click="doRegister()" value="注   册"
        style="background-color:#E61F1C;color:#fff;border:1px solid #E61F1C;
        width:50%; border-radius:35px; margin:0 auto;">
        <div style="height:10px;"></div>
      <router-link to="/login" style="color:#000;">已有账号，请登录</router-link>
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
    margin-top:5%;
    position:relative;
    height:20%;
  }

  .ydd-login .form-control{
    margin-bottom:10px;
  }
</style>
