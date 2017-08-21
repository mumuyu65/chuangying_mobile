<template>
  <div class="ydd-login" style="padding:20px;">
    <router-link to="/login"><i class="icon iconfont icon-fanhui1" style="color:#E61F1C"></i></router-link>
    <div class="container text-center">
      <input type="text" value="" v-model="username" placeholder="输入手机号" class="form-control"/>
      <input type="password" value="" v-model="pwd"  placeholder="输入验证码" class="form-control"/>
      <input type="password" value="" v-model="pwd"  placeholder="用户昵称" class="form-control"/>
      <input type="password" value="" v-model="pwd"  placeholder="输入密码" class="form-control"/>
    </div>
    <div class="container text-center">
      <input type="submit" class="form-control" @click="doRegister()" value="注   册"
        style="background-color:#E61F1C; color:#fff;border:1px solid #E61F1C;">
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
    margin-top:30%;
    position:relative;
    height:20%;
  }

  .ydd-login .form-control{
    margin-bottom:10px;
  }
</style>
