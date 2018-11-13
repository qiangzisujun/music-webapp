<template>
  <div :class="$style.player" @touchstart="firstPlay">
    <section :class="$style.poster">
      <p :class="$style.title">{{item.name}}</p>
      <p :class="$style.artist">{{item.artist}}</p>
      <div :class="$style.disc">
        <img :src="item.poster" :alt="item.name" :style="{transform:'rotate(' + (item.current/item.duration*360*2) + 'deg)'}">
      </div>
    </section>
    <section :class="$style.lyric">
      <p :class="$style.previous">人如天上的明月是不可拥有</p>
      <p :class="$style.current">情如曲过只遗留无可挽救再分别</p>
      <p :class="$style.next">为何只是失望填密我的空虚</p>
    </section>
    <section :class="$style.range">
      <span :class="$style.currentDate">0.00<!--{{convert(item.duration-item.current)}}--></span>
      <input type="range" value="0" min="0" :max="item.duration" v-model="item.current" @change="progress()">
      <span :class="$style.maxDate">{{item.duration}}</span>
    </section>
    <section :class="$style.controls">
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
    </section>
    <audio ref="audio"></audio>
  </div>
</template>
<script>
  const convertDuration = duration => {
    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 60)
    return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
  }
  export default {
    name: "player",
    data(){
      const id=parseInt(this.$route.params.data.id,10);
      var poster=this.$route.params.data.poster;//海报，封面
      var name=this.$route.params.data.name;//歌曲名称
      var duration=this.$route.params.data.duration;//时常
      var artist=this.$route.params.data.artist;//艺术家，歌手
      this.$http.get(this.global.rootPath+"/song/url?id="+id).then(res=>{
        var data={}
        data.id=id;
        data.poster=poster;
        data.name=name;
        data.duration=duration;
        data.artist=artist;
        data.src=res.data.data[0].url;
        this.item = { current: 0, playing: false, random: false }
        Object.assign(this.item,data);

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
      }
    },
    methods: {
      firstPlay () {
        this.$refs.audio.play()
      },
      changeUrl(url) {
        this.url = url;
      },
        convert: convertDuration,
        play() {
          if (this.item.playing) {
            App.audio.pause()
          } else {
            App.audio.play()
          }
          this.item.playing = !this.item.playing
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
  @import "../assets/css/element";
  .poster{
    margin-top: 20px;
    .disc{
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
    text-align: center;
    margin-top: 20px;
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
    span{
      width: 15%;
    }
    input{
      width: 70%;
    }
  }
  .controls{
    background: #F04752;
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
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .player .disc {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .player .disc img {
    width: 12rem;
    border-radius: 50%;
    border: .0625rem solid #fd9500;
    padding: .3rem;
    transition: transform .5s linear;
  }
  .player .controls button.active {
    color: #fd9500;
  }


</style>
