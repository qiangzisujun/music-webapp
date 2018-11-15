<template>
    <div>
      <Header/>
      <Navbar/>
      <section :class="$style.seniority">
        <ul :class="$style.content">
          <li :class="$style.list">
            <div :class="$style.img">
                <img src="../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"/>
            </div>
            <div :class="$style.title">
                <p>1.可不可以-张紫豪</p>
                <p>2.沙漠骆驼-展展与罗罗</p>
                <p>3.盗降行-花粥</p>
            </div>
          </li>
          <li :class="$style.list">
            <div :class="$style.img">
              <img src="../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"/>
            </div>
            <div :class="$style.title">
              <p>1.可不可以-张紫豪</p>
              <p>2.沙漠骆驼-展展与罗罗</p>
              <p>3.盗降行-花粥</p>
            </div>
          </li>
          <li :class="$style.list">
            <div :class="$style.img">
              <img src="../assets/img/6dc96dd718c4c7c35b54c8f8762b071d.jpg"/>
            </div>
            <div :class="$style.title">
              <p>1.可不可以-张紫豪</p>
              <p>2.沙漠骆驼-展展与罗罗</p>
              <p>3.盗降行-花粥</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
    import Header from "../public/header";
    import Navbar from "../public/navbar";
    export default {
      name: "seniority",
      components: {Navbar, Header},

    }
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .seniority{
    margin-top: 200px;
  }
  .content{
    box-sizing: border-box;
    padding-bottom: 40px;
    padding-top: 15px;
    .list{
      font-size: 32px;
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid black;
      .img{
        box-sizing: border-box;
        display: inline-block;
        float:left;
        width: 35%;
        img{
          margin-left: 25px;
          width: 300px;
          height: 300px;
          border-radius: 10px;
        }
      }
      .title{
        display: inline-block;
        box-sizing: border-box;
        width: 65%;
        line-height: 300px;
        height: 300px;
        p{
          line-height: 50px;
          margin-top: 30px;
          font-size: 38px;
          &:nth-child(1){
            padding-top: 20px;
          }
        }
      }
    }
  }
</style>
