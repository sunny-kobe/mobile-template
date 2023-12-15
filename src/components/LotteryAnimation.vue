<script setup lang="ts">
import lottery from '~/assets/mp4/lottery.mp4'
import { tenDraw } from '~/api/index';

interface TenDrawResponse {
  code: number;
  msg: string;
  data: any[];
}

const props = defineProps<{
  hideLotteryDialog?: Function,
  showlotteryResult?: Function,
}>()
const emit = defineEmits();

const lotteryVideo = ref<HTMLVideoElement | null>(null);
const isLottery = ref<boolean>(false);

const startVideo = () => {
  if (lotteryVideo.value) {
    lotteryVideo.value.play();
  }
};
const skipAnimation = () => {
  // 当抽奖结果出来后才可以跳过动画
  if (lotteryVideo.value && isLottery.value === true) {
    lotteryVideo.value.currentTime = lotteryVideo.value.duration;
  }
};

const showResult = () => {
  if (props.hideLotteryDialog) {
    props.hideLotteryDialog();
    props.showlotteryResult?.();
  }
}

onMounted(async () => {
  // 在组件加载后开始预加载视频
  startVideo();

  // 招募结果
  const tenDrawRes = await tenDraw() as unknown as TenDrawResponse;
  if (tenDrawRes.code === 0) {
    isLottery.value = true;
    emit('finishAnimation', tenDrawRes.data);
  } else {
    alert(tenDrawRes.msg);
  }
});

</script>

<template>
  <div class="lottery-container">
    <div class="lottery-animation">
      <video ref="lotteryVideo" class="custom-video" autoplay muted preload="auto" @ended="showResult">
        <source :src="lottery" type="video/mp4">
      </video>
      <!-- <button @click="startVideo" class="skip-button">开始</button> -->
      <button @click="skipAnimation" w-120px h-60px absolute top-20px right-20px cursor-pointer
        bg="[url(~/assets/images/button/skip.png)]" bg-cover bg-no-repeat></button>
    </div>
  </div>
</template>

<style scoped>
.lottery-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 888;
  text-align: center;
}

.lottery-animation {
  border-radius: 10px;
}

.custom-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>
