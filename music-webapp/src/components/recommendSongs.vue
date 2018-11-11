<template>
    <Panel title="推荐歌单" :class="$style.panel">
      <section :class="$style.list">
          <div :class="$style.item" v-for="item in items" :key="item.id">
            <router-link :to="{name:item.picUrl}">
              <img :src="item.picUrl" :alt="item.copywriter">
              <p>{{item.name}}</p>
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
        this.$http.get(this.global.rootPath+'/personalized').then(res=>{
          console.log(res.data.result[0].picUrl);
          this.items=res.data.result;
        })
        return{
          items:[]
        }
      }
    }
    /*
    id: 2409342460,
    type: 0,
    name: "【VIP专享】一周新歌推荐",
    copywriter: "编辑推荐：每周VIP专享新歌，编辑精选推荐！",
    picUrl: "http://p2.music.126.net/a8FJkDCP_VPoZsMbb6ATvw==/109951163655847926.jpg",
    canDislike: false,
    playCount: 24701432,
    trackCount: 20,
    highQuality: false,
    alg: "featured"
    */
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .panel{
    @include panel;
    h4{
      font-size: 42px;
      font-weight: 500;
      margin-left: 20px;
    }
    .list{
      @include flex(row);
      text-decoration: none;
      box-sizing: border-box;

      justify-content:space-around;
      .item{
        width: 31.333333%;
        margin-bottom: 30px;
        img{
          display: block;
          max-width: 100%;
          height: auto;
          border-radius: 3%;
        }
        p{
          color: #2E3030;
          font-size: 32px;
          margin-top: 5px;
          margin-left: 8px;
          line-height:normal;
          padding:10px 0;
        }
      }
    }
  }
</style>
