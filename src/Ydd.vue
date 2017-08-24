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
    $("body").css("height",document.body.clientHeight);
    $("body").css("oveflow","hidden");
  }
}
</script>
