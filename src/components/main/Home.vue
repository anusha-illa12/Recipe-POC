<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
   data() {
     return {};
   },
   components :{
     Header,Footer
   }
}
</script>

<style scoped>

</style>