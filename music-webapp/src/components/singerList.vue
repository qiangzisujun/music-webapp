<template>
  <div>
    <Herdor/>
    <Navbar/>
    <div :class="$style.box">
      <div :class="$style.list" ref="listView">
        <ul>
          <li v-for="group in singers" :class="$style.listGroup" :key="group.id" ref="listGroup">
            <h2 :class="$style.listGroupTitle">{{group.title}}</h2>
            <ul>
              <li v-for="item in group.items" :class="$style.listGroupItem" :key="item.id">
                <img :src="item.avatar" :class="$style.avatar">
                <span :class="$style.name">{{item.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div :class="$style.listShortcut">
          <ul>
            <li v-for="(item ,index) in shortcutList"
                :class="[$style.itemBox,{'current': currentIndex === index}]" :data-index="index"
                :key="item.id"
                @touchstart="onShortcutStart"
                @touchmove.stop.prevent="onShortcutMove">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Singer from '../common/js/singer'
import BScroll from 'better-scroll'
import Navbar from "../public/navbar";
import Herdor from "../public/header";

  const pinyin = require('pinyin')
  const HOT_NAME = '热门'
  const HOT_SINGERS = 10
    export default {
      name: "singerList",
      components: {Herdor, Navbar},
      data () {
        return{
          singers:[],
          scrollY:-1,
          currentIndex:0,
          itemBox:"itemBox"
        }
      },
      created(){
        this._getSingers(),
        this.touch={},
        setTimeout(()=>{
          this._initSrcoll()
          this._calculateHeight()
        }, 20)
      },
      methods:{
        _initSrcoll(){
          this.scroll=new BScroll(this.$refs.listView,{
            probeType:3,
            click:true
          })
          this.scroll.on('scroll',(pos)=>{
            this.scrollY=pos.y
          })
        },
        _calculateHeight(){
          this.listHeight=[]
          const list=this.$refs.listGroup
          let height=0
          this.listHeight.push(height)
          for (let i=0;i<list.length;i++){
            let item=list[i]
            height +=item.clientHeight
            this.listHeight.push(height)
          }
        },
        _getSingers(){
          this.$http.get(this.global.rootPath+'/top/artists?limit=100').then(res=>{
            let s=res.data.artists
            s.map((item)=>{
              let py=pinyin(item.name[0],{
                style: pinyin.STYLE_FIRST_LETTER
              })
              item.initial=py[0][0].toUpperCase()
            })
            this.singers=this._normalizeSinger(s)
          })
        },
        _normalizeSinger (list){
          let map={
            hot:{
              title:HOT_NAME,
              items:[]
            }
          }
          list.forEach((item,index)=>{
            if (index<HOT_SINGERS){
              map.hot.items.push(new Singer({
                id:item.id,
                name:item.name,
                avatar:item.img1v1Url,
                aliaName:item.alias.join(' / ')
              }))
            }
            const key=item.initial
            if (!map[key]){
              map[key]={
                title:key,
                items:[]
              }
            }
            map[key].items.push(new Singer({
              id:item.id,
              name:item.name,
              avatar:item.img1v1Url,
              aliaName:item.alias[0]
            }))
          })
          let hot=[]
          let ret=[]
          for (const key in map){
            let val=map[key]
            if (val.title.match(/[A-Z]/)){
              ret.push(val)
            }else if (val.title===HOT_NAME){
              hot.push(val)
            }
          }
          ret.sort((a,b)=>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0)
          })
          return hot.concat(ret)
        },

        onShortcutStart(e){
          //获取到绑定的index
          let index=e.target.getAttribute('data-index')
          //使用better-scroll 的scrollToElement方法实现跳转
          this.scrollToElement(index)

          //记录一下点击时候的Y坐标和index
          let firstTouch=e.touches[0].pageY
          this.touch.y1=firstTouch
          this.touch.anchorIndex=index
        },
        onShortcutMove(e){
          //再记录一下移动时候的Y坐标，然后计算出移动了几个索引
          let touchMove=e.touches[0].pageY
          this.touch.y2=touchMove
          //这里的16.7是索引元素的高度
          let delta=Math.floor((this.y2-this.touch.y1)/16.7)
          //计算最后的位置
          //*1是因为this.touch.anchorIndex是字符串，
          let index=this.touch.anchorIndex*1+delta
          this.scrollToElement(index)
        },
        scrollToElement (index) {
          // 处理边界情况
          // 因为 index 通过滑动距离计算出来的
          // 所以向上滑超过索引框框的时候就会 < 0，向上就会超过最大值
          if (index < 0) {
            return
          } else if (index > this.listHeight.length - 2) {
            index = this.listHeight.length - 2
          }
          // listHeight 是正的， 所以加个 -
          this.scrollY = -this.listHeight[index]
          this.scroll.scrollToElement(this.$refs.listGroup[index])
        },
      },
      watch: {
        scrollY (newVal) {
          // 向下滑动的时候 newVal 是一个负数，所以当 newVal > 0 时，currentIndex 直接为 0
          if (newVal > 0) {
            this.currentIndex = 0
            return
          }
          // 计算 currentIndex 的值
          for (let i = 0; i < this.listHeight.length - 1; i++) {
            let height1 = this.listHeight[i]
            let height2 = this.listHeight[i + 1]

            if (-newVal >= height1 && -newVal < height2) {
              this.currentIndex = i
              return
            }
          }
          // 当超 -newVal > 最后一个高度的时候
          // 因为 this.listHeight 有头尾，所以需要 - 2
          this.currentIndex = this.listHeight.length - 2
        }
      },
      computed: {
        shortcutList () {
          return this.singers.map((group) => {
            return group.title.substr(0, 1)
          })
        }
      }
    }

</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .box{
    position: fixed;
    width: 100%;
    height: 100%;
    margin-top: 190px;
    .list{
      position: relative;
      height: 100%;
      width: 100%;
      .listGroup{
        padding-bottom: -100px;
        .listGroupTitle{
          height: 70px;
          line-height: 70px;
          padding-left: 50px;
          font-size: 42px;
          color: #fff;
          background:rgba(0, 0, 0, 0.1);
        }
        .listGroupItem{
          display: flex;
          align-items: center;
          padding: 15px 0;
          margin: 0 15px;
          border-bottom: 1px solid rgb(228, 228, 228);
          .avatar{
            width: 150px;
            height: 150px;
            border-radius: 15%;
          }
          .name{
            margin-left: 60px;
            color: #2E3030;
            font-size: 42px;
          }
        }
      }
      .listShortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top:45%;
        transform: translateY(-50%);
        width: 60px;
        padding: 30px 0;
        border-radius: 30px;
        text-align: center;
        font-family: Helvetica;
        .itemBox{
          padding: 15px 15px;
          line-height: 1;
          color: #757575;
          font-size: 33px;
          font-weight: bold;
          &.current{
            color: #C20C0C;
          }
        }
      }
    }
  }
</style>
