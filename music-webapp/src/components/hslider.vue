<template lang="html">
    <article class="">
      <Slider :items="items" :cname="$style.slider"/>
      <section :class="$style.list">
        <div :class="$style.item" v-for="item in enters" :key="item.img">
          <router-link :to="{name:item.href}">
            <img :src="item.img" :alt="item.title">
            <h4>{{item.title}}</h4>
          </router-link>
        </div>
      </section>
    </article>
</template>

<script>
    import Slider from "../core/slider.vue";
    export default {
      name: "hslider",
      components: {
        Slider,
      },
      data(){
        return{
          items:[{
            href:"home1",
            src:"//img12.360buyimg.com/jrpmobile/jfs/t25759/60/2272607322/48838/438e6aad/5bc6f6a5Ncd00b8cb.jpg?width=750&height=320",
          },{
            href:"home2",
            src:"//img12.360buyimg.com/jrpmobile/jfs/t1/4666/5/13746/82184/5bd98633E1d2a7f34/2fd9caf35f9e5a8a.jpg?width=750&height=320",
          },{
            href:"home3",
            src:"//img12.360buyimg.com/jrpmobile/jfs/t1/8154/20/4177/48862/5bd98534E5d9de022/b6dd43ca38fcc9ee.jpg?width=750&height=320",
          }],

          enters:[{
            href:'download',
            img:require("../assets/iconfont/privte.png"),
            title:"私人FM",
          },{
            href:'home4',
            img:require("../assets/iconfont/day.png"),
            title:"每日推荐",
          },{
            href:'home5',
            img:require("../assets/iconfont/MV.png"),
            title:"MV",
          },{
            href:'home6',
            img:require("../assets/iconfont/raido.png"),
            title:"电台",
          }],
        }
      }
    }
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .slider{
    margin-top: 150px;
    text-align: center;
    background-color: #FF0000;
    height: 259px;
    img{
      width: 95%;
      display: inline-block;
      border-radius: 5%;
    }
  }
  .list{
    @include flex(row);
    padding-top: 40px;
    justify-content:space-around;
    a{
      text-decoration: none;
    }
    .item{
      text-align: center;
      width: 160px;
      height: 144px;
      text-align: center;
      margin-bottom: 40px;
      img{
        display: inline-block;
        width: 90px;
        height: 90px;
      }
      h4{
        font-size: 26px;
        margin-top: 12px;
        color: #666;
      }
    }

  }
</style>
