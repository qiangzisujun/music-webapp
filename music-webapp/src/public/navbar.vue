<template lang="html">
    <Panel title="导航条" :class="$style.panel">
        <ul :class="$style.content">
          <li>
            <router-link :to="{ name: 'home'}">
              <p>推荐</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'seniority'}">
              <p>排行</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'songs'}">
              <p>歌单</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'singerList'}">
              <p>歌手</p>
            </router-link>
          </li>
        </ul>
    </Panel>
</template>

<script>
    import Panel from "../core/panel";
    export default {
      name: "navbar",
      components: {Panel}
    }
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .panel{
    @include panel;
    position: fixed;
    left: 0;
    right: 0;
    height: 120px;
    top: 70px;
    background-color: #FF0000;
    margin: 0px;
    z-index: 99;
    &>h4{
      display: none;
    }
    .content{
      @include flex(row);
      justify-content: space-around;
      text-align: center;
      line-height: 120px;
      li{
        text-align: center;
        a{
          text-decoration: none;
        }
        img{
          width: 44px;
          height: 44px;
          display: inline-block;
          margin: 12px auto 6px;
        }
        p{
          color: #fff !important;
          font-size: 42px;
          font-weight:500;
        }
      }
    }
  }
</style>
