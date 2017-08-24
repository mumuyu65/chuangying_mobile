<template>
<div class="zhibo clearfix" id="video-container"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data(){
    return{
      VideoOption:{},
    }
  },
  mounted(){
    this.initData();
  },
  computed: mapGetters({
      orientation: 'getOrientation',
  }),
  watch:{
    orientation:'changeOrientation',
  },
  methods:{
    initData(){
        var rtmp = this.getParams('rtmp'),
            flv  = this.getParams('flv'),
            m3u8 = this.getParams('m3u8'),
            mp4  = this.getParams('mp4'),
            live = (this.getParams('live') == 'true' ? true : false),
            coverpic = this.getParams('coverpic'),
            width = this.getParams('width'),
            height = this.getParams('height'),
            autoplay = (this.getParams('autoplay') == 'true' ? true : false);
        /**
         * 视频类型播放优先级
         * mobile ：m3u8>mp4
         * PC ：RTMP>flv>m3u8>mp4
         */

        /**
         * 属性说明：
         *
         * coverpic  {Object|String} src:图片地址，style：default 居中1:1显示 stretch 拉伸铺满，图片可能会变形 cover 等比横向铺满，图片某些部分可能无法显示在区域内
         *  封面在 ios10 暂时无法生效。
         */
        this.VideoOption = {
            rtmp: rtmp,
            flv: flv ,
            m3u8: m3u8 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f230.m3u8',
            mp4 : mp4 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f40.mp4',
            coverpic: coverpic || {style:'cover', src:'//vodplayerinfo-10005041.file.myqcloud.com/3035579109/vod_paster_pause/paster_pause1469013308.jpg'},
            autoplay: false,
            live: live,
            width : width || '100%',
            height : height || '5.56rem'
        };

        var player = new TcPlayer('video-container', this.VideoOption);
        window.qcplayer  = player;
    },

    getParams(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURIComponent(r[2]);
      }
      return null;
    },

    changeOrientation(){
      if (window.orientation === 180 || window.orientation === 0) {
            this.VideoOption.width = '100%';

            this.VideoOption.height = '5.56rem';

            $("#chat_content").css("bottom",'0rem');

            $("body").css("height",document.body.clientHeight);

            $("body").css("oveflow","hidden");
      }
      if (window.orientation === 90 || window.orientation === -90 ){

            this.VideoOption.width = '100%';

            this.VideoOption.height = '100%';

            $("#chat_content").css("bottom",'0rem');

            $("body").css("height",document.body.clientHeight);

            $("body").css("oveflow","hidden");
      }
    }
  }
}
</script>
