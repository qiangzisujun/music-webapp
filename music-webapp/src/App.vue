<template>
  <div>
   <Herdor/>
    <Navbar/>
    <Hslider/>
    <RecommendSongs/>
    <SongList/>
  </div>
</template>

<script>
  import Herdor from "@/public/header";
  import Navbar from "./public/navbar";
  import Hslider from "./components/hslider";
  import RecommendSongs from "./components/recommendSongs";
  import SongList from "./components/songList";
  export default {
    name: 'App',
    components:{
      RecommendSongs,
      Hslider,
      Navbar,
      Herdor,
      SongList,
    }
  }
</script>

<style lang="scss" module>

</style>
