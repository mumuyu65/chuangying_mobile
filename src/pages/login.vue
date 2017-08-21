<template>
  <div class="ydd-login">
    <div class="container text-center">
      <input type="text" value="" v-model="username" class="form-control" placeholder="用户名"/>
      <input type="password" value="" v-model="pwd" class="form-control" placeholder="密码"/>
      <button @click="login()" class="btn btn-danger">登陆</button>
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
      username: '18516074685',
      pwd: 'yu123456'
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
    width:70%;
    margin:40% 15%;
    height:20%;
  }

  .ydd-login .form-control{
    margin-bottom:10px;
  }
</style>
