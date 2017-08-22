<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ydd',
  data(){
    return{
      volume:true,
    }
  },
  methods:{
    setVolume(){
      this.volume = ! this.volume;
      CKobject.getObjectById('ckplayer_a1').changeVolume('0');
    },

    changeVolume(){
      this.volume = ! this.volume;
      CKobject.getObjectById('ckplayer_a1').changeVolume('100');
    },

    goToLogin(){
      this.appIcon = !this.appIcon;
      window.location.replace('#/login');
    }
  }
}
</script>
