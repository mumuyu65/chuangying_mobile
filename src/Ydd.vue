<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ydd',
  mounted(){
    this.$router.push("/chat");
  }
}
</script>
