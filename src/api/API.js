/**
 * Created by yangyangyu on 2017/6/14.
 * 统一的api接口部分
 */

import axios from 'axios'
import config from './config'

class API {
    // 游客登录
    visitorLogin(param) {
        config.data = param
        return axios.post('/cycj/visitor/login', {}, config)
    }

    //登录
    login(param) {
        config.data = param;
        return axios.post('/cycj/login', {}, config);
    }

    //皮肤
    skin(param) {
        config.data = param;
        return axios.post('/cycj/user/skin', {}, config);
    }

    //验证码
    getVcode(param) {
        config.data = param;
        return axios.post('/cycj/vcode/get', {}, config);
    }

    //重置密码
    resetPwd(param) {
        config.data = param;
        return axios.post('/cycj/pwd/reset', {}, config);
    }

    //注册
    register(param) {
        config.data = param;
        return axios.post('/cycj/register', {}, config);
    }

    //退出
    logout(param) {
        config.data = param;
        return axios.post('/cycj/logout', {}, config);
    }

    //用户等级
    userLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/query', {}, config);
    }

    changeLevel(param) {
        config.data = param;
        return axios.post('/cycj/live/changeNick', {}, config);
    }

    //个人设置
    personSetting(param) {
        config.data = param;
        return axios.post('/cycj/userinfo/update', {}, config);
    }

    //直播
    getZhibo(param) {
        config.data = param;
        return axios.post('/cycj/live/query', {}, config);
    }

    //查询房间号
    roomNum(param) {
        config.data = param;
        return axios.post('/cycj/live/query', {}, config);
    }

    //查询聊天的历史记录
    historyChat(param) {
        config.data = param;
        return axios.post('/cycj/live/messages', {}, config);
    }

    //聊天图片
    chatImage(param) {
        config.data = param;
        return axios.post('/cycj/live/images', {}, config);
    }
}
export default API;