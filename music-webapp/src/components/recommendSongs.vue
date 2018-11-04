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
            content:"'长大，这两个字，孤独得连偏旁都没有'"
          },{
            href:"歌单列表2",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"'长大，这两个字，孤独得连偏旁都没有'"
          },{
            href:"歌单列表3",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"'长大，这两个字，孤独得连偏旁都没有'"
          },{
            href:"歌单列表4",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"'长大，这两个字，孤独得连偏旁都没有'"
          },{
            href:"歌单列表5",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"'长大，这两个字，孤独得连偏旁都没有'"
          },{
            href:"歌单列表6",
            img:require("../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"),
            title:"孤独",
            content:"'长大，这两个字，孤独得连偏旁都没有'"
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

    }
  }
</style>
