<template>
  <div>
   <Herdor/>
    <Navbar/>
    <Hslider/>
    <RecommendSongs/>
  </div>
</template>

<script>
  import Herdor from "@/public/header";
  import Navbar from "./public/navbar";
  import Hslider from "./components/hslider";
  import RecommendSongs from "./components/recommendSongs";
  export default {
    name: 'App',
    components:{
      RecommendSongs,
      Hslider,
      Navbar,
      Herdor,
    }
  }
</script>

<style lang="scss" module>

</style>
