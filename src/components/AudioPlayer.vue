<script setup>
import song from '~/assets/mp4/song.mp3'

const isMuted = ref(false)
const audio = ref(null);
const isPlaying = ref(false);

// 音乐开关
function toggleMute() {
  isMuted.value = !isMuted.value
  // 在这里添加切换音频状态的逻辑
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
}


</script>

<template>
  <div>
    <audio ref="audio">
      <source :src="song" type="audio/mpeg">
    </audio>
    <div @click="toggleMute" w-70px h-70px mt-12px>
      <div v-show="!isMuted" w-70px h-70px bg="[url(~/assets/images/button/mute.png)]" bg-contain></div>
      <div v-show="isMuted" w-70px h-70px bg="[url(~/assets/images/button/voice.png)]" bg-contain></div>
    </div>
  </div>
</template>

<style scoped></style>
