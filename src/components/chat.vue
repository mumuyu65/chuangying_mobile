<template>
<div>
    <div class="chat">
        <div class="chat-inner" >
            <div class="inner-container">
                <div class="chat-item" v-for="item in chatInner">
                  <ol class="list-inline" @click="sendTextTo(item)" style="cursor:pointer; display:block;">
                    <li style="vertical-align: middle">
                      <img v-bind:src="item.userlog" alt="">
                    </li>
                    <li style="vertical-align: middle"><h5>{{item.date}}</h5></li>
                    <li><h5>{{item.name}}</h5></li>
                  </ol>
                  <h5 v-html="item.text" style="background:rgba(255,255,255,0.1); width:80%; padding:8px; border-radius:5px; margin:0 20px 0 50px;"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="chat-content" id="chat_content">
        <input v-model="chatContent" placeholder="输入聊天内容" @keyup.enter="sendContent()"/>
        <ol class="list-inline">
            <li class="chat-icon" @click="toggleImg()"><i class="icon iconfont icon-img" ></i></li>
            <li class="chat-face chat-img" v-show="showImg" >
                <div class="chat-face-inner" style="background:rgba(0,0,0,0.7)">
                    <ol class="list-inline" style="width:100%">
                        <li v-bind:class="{active:item.active}" v-for="item in chatImgTitle" @click="changeImgTab(item)">
                            {{item.title}}
                        </li>
                        <li class="active pull-right" @click="toggleImg()">关闭</li>
                    </ol>
                    <div class="chat-face-content" style="padding-bottom: 50px;">
                      <img v-bind:src="face.imgurl" v-for="face in chatImgs" @click="ImgSelect(face)" />
                    </div>
                </div>
            </li>
            <li class="chat-icon" @click="toggleGift()"><i class="icon iconfont icon-jinlingyingcaiwangtubiao83"></i></li>
            <li class="chat-face chat-img chat-gift" v-show="showGift" >
                <div class="chat-face-inner" style="background:rgba(0,0,0,0.7);padding:0 10px;">
                    <h5 style="text-align:end;"><span @click="toggleGift()" style="padding: 5px 10px;background-color: #E61F1C;">关闭</span></h5>
                    <div class="chat-face-content" style="padding-bottom: 50px;">
                      <img v-bind:src="gift.imgurl" v-for="gift in chatGifts" @click="GiftSelect(gift)" />
                    </div>
                </div>
            </li>
            <li class="chat-icon" @click="sendContent()"><i class="icon iconfont icon-feihangmoshi"></i></li>
        </ol>
    </div>
</div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

const chatUrl='http://61.147.124.143:10011';

import { mapGetters } from 'vuex'

import Jsonp from 'jsonp'

export default {
    name: 'chatRoom',
    data () {
        return {
          selectedFace:'',
          chatContent:'',
          role_img:'',
          ws:null,        //长连接
          user:{},        //用户
          userLevels:[],  //用户等级
          chatInner:[],   //聊天内容
          roomID:0,       // 房间号
          showImg:false,  //聊天图片
          chatImgs:[],
          templateRoom:'',  //直播房间号
          showImg:false,  //聊天图片
          chatImgTitle:[
            {id:1,title:'礼物',active:false},{id:2,title:'自创',active:false},
            {id:3,title:'逗你玩',active:false},{id:4,title:'欢喜兔',active:false},
            {id:5,title:'阿呆',active:false}],

          chatImgs:[],  //聊天图片

          showGift:false,  //聊天礼物
          chatGifts:[{id:1,imgurl:'../../static/images/gifts/baoxiang.png'},
          {id:2,imgurl:'../../static/images/gifts/caishen.png'},{id:3,imgurl:'../../static/images/gifts/car.png'},
          {id:4,imgurl:'../../static/images/gifts/huangguan.png'},{id:5,imgurl:'../../static/images/gifts/jinyuanbao.png'},
          {id:6,imgurl:'../../static/images/gifts/qiandai.png'},{id:7,imgurl:'../../static/images/gifts/rose.png'},
          {id:8,imgurl:'../../static/images/gifts/zhuanshi.png'}],
        }
    },
    mounted (){
        this.initChat();   //判断是否登录
        $("#chat_content").css("bottom",'1.0rem');
    },
    methods:{
        //聊天图标
        initFace (){
          let that =this;
          Jsonp('https://api.weibo.com/2/emotions.json?source=1362404091',function (err, res) {
              if(res.code ==1){
                that.chatFaces=res.data;
                that.UserLevel();  //用户等级
              }
            });


            //聊天图片
            api.chatImage().then(function(res){
                if(res.data.Code ==3){
                    that.templeChatImgs = res.data.Data;
                    that.changeImgTab(that.chatImgTitle[0]);
                }else{
                    alert("加载聊天图片不成功！");
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        changeImgTab(item){
            for(let i =0; i<this.chatImgTitle.length;i++){
                this.chatImgTitle[i].active = false;
            }
            item.active = !item.active;
            let temp_title = item.title;
            this.chatImgs = [];
            for(let i=0; i<this.templeChatImgs.length; i++){
                if(this.templeChatImgs[i].title ==temp_title ){
                    this.chatImgs.push(this.templeChatImgs[i]);
                }
            }
        },

        initChat (){
            if($.cookie("mobile-user")){
               if(parseInt(JSON.parse($.cookie("mobile-user")).Flag)!== -1){
                    this.user=JSON.parse($.cookie("mobile-user"));

                    let params={
                        begidx:0,
                        counts:10
                    };

                    let that = this;

                    api.roomNum(params).then(function(res){
                        if(res.data.Code ==3){
                            that.templateRoom = res.data.Data.Detail;
                            api.userLevel().then(function(res){
                               if (res.data.Code == 3) {
                                    that.userLevels = res.data.Data;

                                    that.ConnSvr();
                                }
                          }).catch(function(err){
                              console.log(err);
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                }else{
                    this.initFace();
                }
            }
            else{
                 this.initFace();  //初始化图片
            }
        },

        //游客变为会员登录
        changeUser(){
            if(this.isLogin){
               this.user=JSON.parse($.cookie("mobile-user"));
               this.confirmUser();  //聊天链接
            }
        },

        //游客登录
        visitorLogin() {
            let that = this;
            api.visitorLogin().then(function(res) {
                if(res.data.Code ==3){
                    $.cookie('mobile-user', JSON.stringify(res.data.Data));
                    //console.log(JSON.stringify(res.data.Data));
                    that.user =res.data.Data;
                    that.ConnSvr();  //聊天链接
                }else{
                    alert(res.data.Msg);
                }
            })
        },

        //用户等级
        UserLevel (){
          let that =this;
          api.userLevel().then(function(res){
               if (res.data.Code == 3) {
                    that.userLevels = res.data.Data;
                    that.roomNo();    //房间号列表
                }
          }).catch(function(err){
              console.log(err);
            });
        },

        ImgTrans(img){
            return '<img src="' + img + '"/>'
        },

        //长链接断开
        close (){
            let that = this;
            console.log("WebSocket Closed.");

            //2秒后启动重连
            setTimeout(function(){
                that.ConnSvr();
            }, 2000);
        },

        //长链接出错
        error (evt){
          console.log("WebSocket Error." + evt.data);
        },

        //验证用户信息
        confirmUser (){
            let sid = this.user.SessionId;
            let uid = this.user.UserId;


            // 发送认证消息
            let body = '{"uid":"' + uid + '","sessionid":"' + sid + '","platform":"4"}';
            let pklen = body.length + 16;
            this.ws.send(JSON.stringify({
                'pklen': pklen,
                'klen': 16,
                'ver': 1,
                'op': 7,
                'id': 4,
                'body': JSON.parse(body)
            }));
        },

        //心跳
        heartbeat (){
          this.ws.send(JSON.stringify({
                'pklen': 16,
                'klen': 16,
                'ver': 1,
                'op': 2,
                'id': 1,
                'body': ''
            }));
        },

        //查询房间号
        roomNo(){
            let params={
                begidx:0,
                counts:10
            };

            let that = this;
            api.roomNum(params).then(function(res){
                if(res.data.Code ==3){
                    that.templateRoom = res.data.Data.Detail;
                    that.visitorLogin();
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        //进入房间
        enterRoom () {
            let body = parseInt(this.templateRoom[0].roomno);
            let pklen = body.length + 16;
            this.ws.send(JSON.stringify({
                'pklen': pklen,
                'klen': 16,
                'ver': 1,
                'op': 27,
                'id': 4,
                'body': body
            }));
        },

        //长链接
        ConnSvr (){
            var that = this;
            that.ws = new WebSocket("ws://61.147.124.143:10015/sub");

            that.ws.onopen = function() {
                console.log("conn succeed.");

                that.confirmUser(); //用户认证消息
            };

            that.ws.onmessage = function(evt) {
                let receives = JSON.parse(evt.data); //从字符窜中解析出json对象
                let data = receives[0];
                switch (data.op) {
                    case 3:
                        console.log("聊天室收到心跳回复");
                        break;
                    case 8:
                        let rcvbody_8 = data.body;
                        console.log("用户认证成功!");
                        // 启动计时器发送心跳包
                        var timer = setInterval(function() {
                            that.heartbeat();
                         }, 20000);
                        that.enterRoom();  //进入房间
                        break;
                    case 24:
                        let rcvbody_24 = data.body;
                        let data_24 = JSON.parse(JSON.stringify(rcvbody_24));
                        that.personInformation(data_24);  //接受个人信息消息
                        break;
                    case 26:
                        let rcvbody_26 = data.body;
                        let data_26 = JSON.parse(JSON.stringify(rcvbody_26));
                        that.quliaoInformation(data_26);   //接受群聊消息
                        break;
                    case 28:
                        let rcvbody_28 = data.body;
                        let data_28 = JSON.parse(JSON.stringify(rcvbody_28));
                        //console.log("进入房间后的反馈信息", data_28);
                        if (data_28.code == 100) {
                            let roomId = data_28.data.roomid;
                            that.roomID = roomId;
                            that.historyChat(roomId);
                            that.scrollTop();
                        } else {
                            console.log(data.msg);
                        };
                        break;
                    case 30:
                        let rcvbody_30 = data.body;
                        let data_30 = JSON.parse(JSON.stringify(rcvbody_30));
                        console.log("用户退出房间的反馈信息", data_30);
                        break;
                }
            };
            that.ws.onclose = that.close;
            that.ws.onerror = that.error;
        },

        //发送内容
        sendContent (){
           if(this.chatContent){
                    this.sendText(this.chatContent);

                    let tempLevel = this.userLevels.length;

                    if(this.user.Flag == -1){
                        let chat_content={
                            userlog:this.userLevels[10].role_css,
                            name:this.user.Nick,
                            text:this.analysis(this.chatContent),
                            date:this.dateStamp(new Date())
                        };

                          this.chatInner.push(chat_content);

                          this.scrollTop();

                          this.chatContent = '';
                    }else{
                         let chat_content={
                            userlog:this.userLevels[this.user.Level].role_css,
                            name:this.user.Nick,
                            text:this.analysis(this.chatContent),
                            date:this.dateStamp(new Date())
                        };

                          this.chatInner.push(chat_content);

                          this.scrollTop();

                          this.chatContent = '';
                    }
                }else{
                    alert("输入的内容不能为空！");
                }
        },

        //发送消息
        sendText (Message) {
            if(this.ws){
                let body = '{"roomid":"' + this.roomID + '","message":"' + Message + '","type":"0"}';
                let pklen = body + 16;
                this.ws.send(JSON.stringify({
                    'pklen': pklen,
                    'klen': 16,
                    'ver': 1,
                    'op': 23,
                    'id': 4,
                    'body': JSON.parse(body)
                }));
            }else{
                this.ConnSvr();
            }
        },

        personInformation (Data) {
            if(Data.code == 100){
                //console.log('自己在群聊中发送消息的反馈', Data);
            }
        },

        //接收群聊消息
        quliaoInformation (Data) {
            let date = this.dateStamp(parseInt(Data.time * 1000)); //时间戳
            switch (Data.type) {
                case '0':
                    if(Data.username == this.user.Nick){
                        break;
                    }else{
                        this.showChat(date, Data.username, Data.message, Data);
                        break;
                    }
                case '2':
                        let roomName;
                        if(this.liveUrl == '0'){
                            roomName ='大厅直播';
                        }else{
                            roomName ='战队直播';
                        }
                        this.showChat(date, Data.username, Data.message.inname + '进入房间', Data);
                        break;
                case '3':
                    this.showChat(date, Data.username, Data.message.outname + '退出房间', Data);
                    break;
                case '5':
                    alert("直播结束....");
                    break;
            }
        },

        //显示聊天内容
        showChat (date, name, text, img) {
            //根据不同的级别，显示不同的图标
            var userLog;
            console.log('用户接收群聊消息', img);
            let len = this.userLevels.length;
            if(img.username == '系统'){
                userLog ='../../static/images/xitong.png';
            }else if(parseInt(img.inflag)== -1){
                userLog = this.userLevels[10].role_css;
            }
            else{
               userLog = this.userLevels[img.userlevel].role_css;
            }

            let Text = this.analysis(text);

            var chat_content={
                userlog:userLog,
                name:name,
                text:Text,
                date:date
            };

            //console.log(chat_content,this.chatInner);

            this.chatInner.push(chat_content);

            this.scrollTop();  //聊天置底
        },

        //私聊
        sendTextTo(item){
            this.chatContent = '@'+item.name;
        },

        //时间转换格式
        dateStamp (tm) {
            //获取一个事件戳
            var time = new Date(tm);
            //获取年份信息
            var y = time.getFullYear();
            //获取月份信息，月份是从0开始的
            var m = time.getMonth() + 1;
            //获取天数信息
            var d = time.getDate();

            var H = time.getHours();

            var M = time.getMinutes();

            var S = time.getSeconds();
            //返回拼接信息
            return this.add(H) + '：' + this.add(M);
        },

        add(m) {
            return m < 10 ? '0' + m : m
        },

        //文字始终置顶
        scrollTop (){
            let t = document.getElementsByClassName('chat-inner')[0];
            let shit = t.scrollHeight;
            setTimeout(function(){
                t.scrollTop = shit;
            },100)
        },

        //分析输入的聊天内容
         /*进行解析*/
        analysis (value) {

            let arr = value.match(/\[.{1,5}\]/g);

            let imgArr = value.indexOf("http");

            let gift = value.indexOf('static');

            if (arr && imgArr == -1) {
                for (let i = 0; i < arr.length; i++) {
                    for (let j in this.chatFaces) {
                        if (arr[i] == this.chatFaces[j].phrase) {
                            var ex = '<img src="' + this.chatFaces[j].url + '"/>';
                            value = value.replace(arr[i], ex);
                            break;
                        }

                    }
                }
            }
            else if(imgArr !== -1 ){
                value = '<img src="' + value + '"/>';
            }else if(gift !== -1){
                value = '<img src="' + value + '"/>';
            }

           //console.log(value);

            return value;
        },

        //聊天室的历史记录
        historyChat(rid){
            let params={
                sid:this.user.SessionId,
                rmid:parseInt(rid),
            };

            let that = this;

            api.historyChat(params).then(function(res){
                console.log(res.data);
                if(res.data.Code ==3){
                    let templeObj = res.data.Data;

                    let len = that.userLevels.length;

                    let userlog;

                    for(let i=0; i<templeObj.length;i++){
                        if(parseInt(templeObj[i].userflag) !==-1){
                            switch(templeObj[i].userlevel){
                                case '0': userlog = that.userLevels[0].role_css;break;
                                case '1': userlog = that.userLevels[1].role_css;break;
                                case '2': userlog = that.userLevels[2].role_css;break;
                                case '3': userlog = that.userLevels[3].role_css;break;
                                case '4': userlog = that.userLevels[4].role_css;break;
                                case '5': userlog = that.userLevels[5].role_css;break;
                            }

                            var chat_content={
                                userlog:userlog,
                                name:templeObj[i].username,
                                text:that.analysis(templeObj[i].message),
                                date:that.dateStamp(templeObj[i].time*1000)
                            };

                            that.chatInner.push(chat_content);

                            that.scrollTop();

                        }else{
                            userlog = that.userLevels[10].role_css;
                            var chat_content={
                                userlog:userlog,
                                name:templeObj[i].username,
                                text:that.analysis(templeObj[i].message),
                                date:that.dateStamp(templeObj[i].time*1000)
                            };

                            that.chatInner.push(chat_content);

                            that.scrollTop();
                        }
                    }
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        //开启或关闭聊天图片
        toggleImg(){
            this.showImg = !this.showImg;
        },

        ImgSelect(item){
            this.showImg = !this.showImg;
            if($.cookie("mobile-user")){
                let Flag = JSON.parse($.cookie("mobile-user")).Flag;
                let chat_content;
                if(parseInt(Flag)==-1){
                    chat_content={
                        userlog:this.userLevels[10].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }else{
                    chat_content={
                        userlog:this.userLevels[this.user.Level].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }
                this.chatInner.push(chat_content);
                this.sendText(item.imgurl);
                this.scrollTop();
            }else{
                alert("未登录，不可以发送图片!");
            }
        },

        //开启或关闭聊天礼物
        toggleGift(){
            this.showGift = !this.showGift;
        },

        GiftSelect(item){
            this.showGift= !this.showGift;
            if($.cookie("mobile-user")){
                let Flag = JSON.parse($.cookie("mobile-user")).Flag;
                let chat_content;
                if(parseInt(Flag)==-1){
                    chat_content={
                        userlog:this.userLevels[10].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }else{
                    chat_content={
                        userlog:this.userLevels[this.user.Level].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }
                this.chatInner.push(chat_content);
                this.sendText(item.imgurl);
                this.scrollTop();
            }else{
                alert("未登录，不可以发送图片!");
            }
        },
    },
}
</script>
