<template lang="html">
    <div :class="$style.header">
      <span :class="$style.left">
        <router-link :to="{name:'menu'}"><img src="../assets/iconfont/menu.png"/></router-link>
      </span>
       music-player
      <span :class="$style.right">
        <router-link :to="{name:'search'}"><img src="../assets/iconfont/search.png"/></router-link>
      </span>
    </div>
</template>

<script>
    import Btn from "../core/btn.vue";
    export default {
      name: "header",
      components: {

        }
    }
</script>

<style lang="scss" module>
  .header{
    color:#fff;
    height: 70px;
    line-height: 70px;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: 32px;
    z-index: 100;
    background-color: #FF0000;
    text-align: center;
    font-weight: 800;
    .left{
      float: left;
      line-height: 70px;
      width: 48px;
      height: 48px;
      margin: 17px 0 0 18px;
      box-sizing: border-box;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .content{
      float: left;

    }
    .right{
      width: 48px;
      height: 48px;
      float: right;
      margin: 17px 18px 0 0;
      img{
        width: 100%;
        height: 100%;

      }
    }
  }
</style>
