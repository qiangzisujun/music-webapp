<template>
  <div :class="$style.player">
    <div :class="$style.disc">
      <img :src="item.poster" :alt="item.name" :style="{transform:'rotate(' + (item.current/item.duration*360*2) + 'deg)'}">
<!--      <span :class="$style.duration">{{convert(item.duration-item.current)}}</span>-->
    </div>
    <h2 :class="$style.title">{{item.name}}</h2>
    <h3 :class="$style.artist">{{item.artist}}</h3>
    <div :class="$style.lyric">
      <p :class="$style.previous">人如天上的明月是不可拥有</p>
      <p :class="$style.current">情如曲过只遗留无可挽救再分别</p>
      <p :class="$style.next">为何只是失望填密我的空虚</p>
    </div>
    <input type="range" value="0" min="0" :max="item.duration" v-model="item.current" @change="progress()">
    <!--<div :class="$style.controls">
      <button><i :class=""></i></button>
      <button :class="$style.active" @click="prev()"><i :class="fa fa-backward"></i></button>
      <button :class="$style.active" @click="play()"><i :class="fa" :class="{'fa-play':!item.playing, 'fa-pause':item.playing}"></i></button>
      <button :class="$style.active" @click="next()"><i :class="fa fa-forward"></i></button>
      <button :class="$style.active"><i></i></button>
    </div>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  const App = Vue.extend({})
  App.audio = new Audio()
  const convertDuration = duration => {
    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 60)
    return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
  }
  export default {
    name: "player",
    data(){
      return {
        item:{}
      }
    },
    route:{
      data(transition){
        const id=parseInt(transition.to.params.id,10);
        var poster=transition.to.params.poster;//海报，封面
        var name=transition.to.params.name;//歌曲名称
        var duration=transition.to.params.duration;//时常
        var artist=transition.to.params.artist;//艺术家，歌手
        this.$http.get(this.global.rootPath+"/song/url?id=").then(res=>{
          var data={}
          data.id=id;
          data.poster=poster;
          data.name=name;
          data.duration=duration;
          data.artist=artist;
          data.src=res.data.url;
          this.item = { current: 0, playing: false, random: false }
          Object.assign(this.item,data);
          App.audio.src=this.item.src;
          App.audio.autoplay=true;
          pp.audio.addEventListener('loadedmetadata', () => {
            this.item.duration = App.audio.duration
          })
          App.audio.addEventListener('timeupdate', () => {
            this.item.current = App.audio.currentTime
          })
          App.audio.addEventListener('play', () => {
            this.item.playing = true
          })
          App.audio.addEventListener('pause', () => {
            this.item.playing = false
          }).catch(error => router.go({ name: 'list' }))
        })
        return { item: {} }
      },
      methods: {
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
          App.audio.currentTime = this.item.current
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
  }
</script>

<style lang="scss" module>
  @import "../assets/css/element";
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
    width: 10rem;
    border-radius: 50%;
    border: .0625rem solid #fd9500;
    padding: .3rem;
    transition: transform .5s linear;
  }

  .player .disc .duration {
    font-size: 1.5rem;
    color: rgba(253, 149, 0, 1);
    margin-top: -1.5em;
    z-index: 1;
  }

  .player .title {
    font-size: 1.6rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fd9500;
    margin: 0 0 .5rem;
  }

  .player .artist {
    font-size: 1rem;
    text-align: center;
    margin: 0;
  }

  .player .lyric {
    text-align: center;
    margin-bottom: 1rem;
  }

  .player .lyric .previous,
  .player .lyric .next {
    color: rgba(255, 255, 255, .3);
  }

  .player .lyric .current {
    font-size: 1.1rem;
  }

  .player .controls {
    display: flex;
    justify-content: space-around;
    background-color: rgba(10, 10, 10, .2);
    padding: 1rem;
    font-size: 2rem;
  }

  .player .controls button {
    border: 0;
    background-color: transparent;
    color: #fff;
    width: 2.8125rem;
  }

  .player .controls button.active {
    color: #fd9500;
  }
</style>
