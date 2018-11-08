<template>
    <Panel title="推荐歌单" :class="$style.panel">
      <section :class="$style.list">
          <div :class="$style.item" v-for="item in items" :key="item.id">
            <router-link :to="{name:item.href}">
              <img :src="item.img" :alt="item.title">
              <p>{{item.content}}</p>
            </router-link>
          </div>
      </section>
    </Panel>
</template>
<script>
    import Panel from "../core/panel";
    export default {
      name: "recommendSongs",
      components: {
        Panel
      },
      data(){
        return{
          items:[{
            href:"歌单列表1",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          },{
            href:"歌单列表2",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          },{
            href:"歌单列表3",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          },{
            href:"歌单列表4",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          },{
            href:"歌单列表5",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          },{
            href:"歌单列表6",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"最是粤语最为情深 也唯独你最难忘怀"
          }]
        }
      }
    }
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .panel{
    @include panel;
    .list{
      @include flex(row);
      font-size: 20px;
      text-decoration: none;
      line-height: 30px;
      font-family: "Helvetica Neue", Helvetica;
      .item{
        width: 30.3333333333%;
        margin-left: 2%;
        img{
          width: 100%;
          height: 200px;
          border-radius: 5%;
        }
      }
    }
  }
</style>
