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
    this.$router.push("/chat");
  }
}
</script>
