<script setup lang="ts">
import { saveImage } from '~/utils/saveImage'
import QrcodeVue from 'qrcode.vue';
import { getStorage } from '~/utils/storage';

const props = defineProps<{
  hideCharacterCard?: Function,
  characterPoster?: any,
}>()

const url = getStorage('shareUrl') || '';

// 长按保存
let holdTimer: any = null
function startHold() {
  holdTimer = setTimeout(() => {
    saveImage('.shareDialog');
  }, 1000);
}

function stopHold() {
  clearTimeout(holdTimer) // 清除定时器，确保不会触发保存图片
}

</script>

<template>
  <div class="shareDialog" @touchstart="startHold" @touchend="stopHold">
    <div w-717px h-1094px absolute-center-x>
      <!-- crossorigin="anonymous" -->
      <img :src="props.characterPoster" alt="">
    </div>
    <div @click="props.hideCharacterCard" w-60px h-60px absolute top--40px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <qrcode-vue :value="url" :size=56 absolute bottom-226px right-120px />
    <div w-600px h-40px absolute-center-x bottom--34px text-24px text="[#b38754]">
      小Tips: 船长也可以通过长按图片或截图保存进行分享，邀请更多伙伴参与活动，一起上船吧~
    </div>
  </div>
</template>

<style scoped>
.shareDialog {
  width: 717px;
  height: 1094px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 888;
}
</style>
