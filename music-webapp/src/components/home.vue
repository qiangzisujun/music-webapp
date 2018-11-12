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
    import Navbar from "../public/navbar";
    import Hslider from "./hslider";
    import RecommendSongs from "./recommendSongs";
    import SongList from "./songList"
    export default {
      name: "home",
      components: {
        RecommendSongs,
        Hslider,
        Navbar,
        Herdor,
        SongList,
      },
    }
</script>

<style scoped>

</style>
