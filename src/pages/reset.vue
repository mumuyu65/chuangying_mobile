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
        <span v-if="typeVcode" @click="getVcode()" style="position:absolute; right:0; top:10px; font-size:10px; padding:5px 8px; background-color:#e61f1c; color:#fff; border-radius:15px;">发送验证码</span>
        <span style="position:absolute; right:0; top:10px; font-size:10px; padding:5px 8px; background-color:#e61f1c;
          color:#fff; border-radius:15px;" v-if="!typeVcode">
          请<span>{{seconds}}</span>s后重新发送
        </span>
      </div>
      <div class="login-item">
        <i class="icon iconfont icon-suo"></i>
        <label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
        <input type="password" value="" v-model="pwd" placeholder="请输入密码"/>
      </div>
    </div>
    <div class="container text-center">
      <input type="submit" class="form-control" @click="resetLogin()" value="修改密码"
        style="background-color:#E61F1C; color:#fff;border:1px solid #E61F1C; width:50%; margin:0 auto; border-radius:35px;">
    </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import env from '@/config/env'

export default {
  name: 'login',
  data () {
    return {
      phone: '',
      pwd: '',
      vcode:'',
      typeVcode:true,
      seconds:60,
      timer:'',
      appIcon:false,
    }
  },
  methods: {
    resetLogin (){
        let params={
            account:this.phone.trim(),
            newpwd:this.pwd.trim(),
            vcode:this.vcode.trim(),
        };
        let that = this;

        if(this.phone.trim()&& this.pwd.trim()&&this.vcode.trim()){
            api.resetPwd(params).then(function(res){
                if(res.data.Code ==3){
                   that.$router.push("/login");
                }
            }).catch(function(err){
                console.log(err);
            });
        }else{
          alert("存在空值！");
        }
    },

    //验证码
    getVcode(){
        let params={
            phone:this.phone.trim()
        };

        let that = this;

        if(this.phone.trim()){
            that.typeVcode = !that.typeVcode;
            that.timer = setInterval(function(){
                that.seconds--;
                if(that.seconds<=0){
                  clearInterval(that.timer);
                  that.typeVcode = !that.typeVcode;
                }
            },1000);
            $.post(env.baseUrl+'/cycj/vcode/get',params,function(res){
                if(res.Code ==3){
                    console.log('发送成功！');
                }else{
                    alert(res.Msg);
                }
            })
        }else{
            alert('手机号码不能为空！');
        }
    },
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
