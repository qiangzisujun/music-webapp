<template lang="html">
    <div :class="$style.header">
      <div :class="$style.left">
        <router-link :to="{name:'menu'}"><img src="../assets/iconfont/menu.png"/></router-link>
      </div>
      <div :class="$style.content">music-player</div>
      <div :class="$style.right">
        <router-link :to="{name:'search'}"><img src="../assets/iconfont/search.png"/></router-link>
      </div>
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
    img{
      width: 48px;
      height: 48px;
      margin: 11px 0 0 18px;
      display: inline-block;
    }
    .left{
      float: left;
    }
    .content{
      float: left;
      margin-left: 152px;
      font-weight: 800;
    }
    .right{
      float: right;
      margin-right: 18px;
    }
  }
</style>
