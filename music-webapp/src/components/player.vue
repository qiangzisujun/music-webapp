<template>
  <div :class="$style.player" >
    <div :class="$style.background">
      <div :class="$style.filter"></div>
      <img :src="item.poster" width="100%" height="100%">
    </div>
    <div :class="$style.poster">
      <p :class="$style.title">{{item.name}}</p>
      <p :class="$style.artist">{{item.artist}}</p>
    </div>
    <div :class="$style.disc">
      <img :src="item.poster" :alt="item.name" :style="{transform:'rotate(' + (item.current/item.duration*360*2) + 'deg)'}">
    </div>
    <div :class="$style.lyric">
      <p :class="$style.previous">人如天上的明月是不可拥有</p>
      <p :class="$style.current">情如曲过只遗留无可挽救再分别</p>
      <p :class="$style.next">为何只是失望填密我的空虚</p>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.range">
        <span :class="$style.currentDate">{{convert(item.current)}}</span>
        <input type="range" value="0" min="0" :max="item.duration" v-model="item.current" @change="progress()">
        <span :class="$style.maxDate">{{convert(item.duration)}}</span>
      </div>
      <div :class="$style.controls">
        <div :class="$style.icon">
          <img src="../assets/iconfont/circulation.png"/>
        </div>
        <div :class="$style.icon" @click="prev()">
          <img src="../assets/iconfont/prev.png"/>
        </div>
        <div :class="$style.icon" @click="play()">
          <img src="../assets/iconfont/player.png"/>
        </div>
        <div :class="$style.icon" @click="next()">
          <img src="../assets/iconfont/next.png"/>
        </div>
        <div :class="$style.icon">
          <img src="../assets/iconfont/list.png"/>
        </div>
      </div>
    </div>
    <audio ref="audio" autoplay id="music-audio"></audio>
  </div>
</template>
<script>
  export default {
    name: "player",
    data(){
      const id=parseInt(this.$route.params.data.id,10);
      var poster=this.$route.params.data.poster;//海报，封面
      var name=this.$route.params.data.name;//歌曲名称
      var duration=this.$route.params.data.duration;//时常
      var artist=this.$route.params.data.artist;//艺术家，歌手
      var bgUrl=this.$route.params.data.bgUrl;
      this.$http.get(this.global.rootPath+"/song/url?id="+id).then(res=>{
        var data={}
        data.id=id;
        data.poster=poster;
        data.name=name;
        data.duration=duration;
        data.artist=artist;
        data.src=res.data.data[0].url;
        this.item = { current: 0, playing: true, random: false,bgUrl:"" }
        Object.assign(this.item,data);
        this.$refs.audio.src=this.item.src;
        this.item.bgUrl=bgUrl;
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          this.item.duration = this.$refs.audio.duration
        })
        this.$refs.audio.addEventListener('timeupdate', () => {
          this.item.current = this.$refs.audio.currentTime
        })
        this.$refs.audio.addEventListener('play', () => {
          this.item.playing = true
        })
        this.$refs.audio.addEventListener('pause', () => {
          this.item.playing = false
        })
      })
      return {
        item:{},
        url:''
      }
    },
    watch:{
      url(newUrl) {
        this.$refs.audio.src = newUrl
        this.$refs.audio.play()
      },
    },
    methods: {
      firstPlay () {
        this.$refs.audio.play()
      },
      changeUrl(url) {
        this.url = url;
      },
      convert(current){
        current=current | 0
        let minute=current /60|0
        let second=current %60
        if (second<10){
            second='0'+second
        }
        return minute+':'+second
      },
        play() {
          if (this.item.playing) {
            this.$refs.audio.pause()
          } else {
            this.$refs.audio.play();
          }
        },
        progress() {
          this.$refs.audio.currentTime = this.item.current
        },
        next() {
          this.$http.jsonp(`${serverUrl}/music`).then(res => {
            const ids = res.data.map(s => s.id)
            let targetIndex = ids.indexOf(this.item.id) + 1
            if (targetIndex >= ids.length) {
              targetIndex = 0
            }
            router.go({ name: 'item', params: { id: ids[targetIndex] } })
          })
        },
        prev() {
          this.$http.jsonp(`${serverUrl}/music`).then(res => {
            const ids = res.data.map(s => s.id)
            let targetIndex = ids.indexOf(this.item.id) - 1
            if (targetIndex < 0) {
              targetIndex = ids.length - 1
            }
            router.go({ name: 'item', params: { id: ids[targetIndex] } })
          })
        }
      },
  }
</script>

<style lang="scss" module>
  @import "../assets/css/element.scss";
  .poster{
    margin-top: 20px;
    .disc{
      position: fixed;
      top: 80px;
      margin: 50px 0 50px 0;
    }
    .title{
      text-align: center;
      overflow: hidden;
      color: #fd9500;
      margin-top: 10px;
    }
    .artist {
      margin-top: 30px;
      text-align: center;
      font-size:80%;
    }
  }
  .lyric{
    position: fixed;
    bottom: 320px;
    width: 100%;
    text-align: center;
    margin: 20px 0 20px 0;
    p{
      font-size: 42px;
      font-weight: 500;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fd9500;
      margin: 0 0 .5rem;
    }
  }
  .range{
    position: fixed;
    bottom: 220px;
    left: 0;
    right: 0;
    margin: 0 15px 0px 15px;
    span{
      font-size: 80%;
      width: 15%;
    }
    input{
      font-size: 80%;
      width: 75%;
    }
  }
  .controls{
    height: 200px;
    line-height: 200px;
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    @include list(row);
    justify-content:space-around;
    .icon{
      text-align: center;
      line-height: 200px;
      img{
        display: inline-block;
        width: 100px;
        height: 100px;
        padding: 50px 0 50px 0;
      }
      &:nth-child(3){
        img{
          display: inline-block;
          width: 150px;
          height: 150px;
          padding: 25px 0 25px 0;
        }
      }
    }
  }
  .player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background-color: #F2F3F4;
    .background{
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(90px);
    }
    .filter {
      position: absolute;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.6;
    }
  }
  .player .disc {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
  }

  .player .disc img {
    width: 12rem;
    border-radius: 50%;
    border: .0625rem solid #fd9500;
    padding: .3rem;
    transition: transform .5s linear;
  }



</style>
