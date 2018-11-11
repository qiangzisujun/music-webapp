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
        this.$http.get(this.global.rootPath+'/banner').then(res=>{
          for(var i=0;i<res.data.banners.length;i++){
            var arr={};
            arr.href=res.data.banners[i].url;
            arr.src=res.data.banners[i].imageUrl;
            this.items.push(arr);
            if (i===3)break;
          }
        })
        return{
          items:[],
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
    background-color: #FF0000;
    margin-top: 190px;
    img{
      width: 100%;
    }
  }
  .list{
    @include flex(row);
    padding-top: 40px;
    justify-content:space-around;
    height: 140px;
    padding-bottom: 40px;
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
        width: 120px;
        height: 120px;
      }
      h4{
        font-size: 32px;
        font-weight: 500;
        margin-top: 12px;
        color: #666;
      }
    }

  }
</style>
