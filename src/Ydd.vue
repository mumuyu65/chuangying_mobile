<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ydd',
  mounted(){
    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      let bodyTag = document.getElementsByTagName('body')[0];
      bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
      }
      setTimeout(function() {
      window.scrollTo(0, 1)
      }, 0);
  }
}
</script>
