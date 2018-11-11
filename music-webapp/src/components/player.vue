<template>
  <div class="player">
    <div class="disc">
      <img :src="item.poster" alt="{{item.name}}" :style="{transform:'rotate(' + (item.current/item.duration*360*2) + 'deg)'}">
      <span class="duration">{{convert(item.duration-item.current)}}</span>
    </div>
    <h2 class="title">{{item.name}}</h2>
    <h3 class="artist">{{item.artist}}</h3>
    <div class="lyric">
      <p class="previous">人如天上的明月是不可拥有</p>
      <p class="current">情如曲过只遗留无可挽救再分别</p>
      <p class="next">为何只是失望填密我的空虚</p>
    </div>
    <input type="range" value="0" min="0" max="{{item.duration}}" v-model="item.current" @change="progress()">
    <div class="controls">
      <button><i class="fa fa-retweet"></i></button>
      <button class="active" @click="prev()"><i class="fa fa-backward"></i></button>
      <button class="active" @click="play()"><i class="fa" :class="{'fa-play':!item.playing, 'fa-pause':item.playing}"></i></button>
      <button class="active" @click="next()"><i class="fa fa-forward"></i></button>
      <button class="active"><i class="fa fa-random"></i></button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "player",
        props:{

        }
    }
</script>

<style scoped>

</style>
