<script setup lang="ts">
import { saveImage } from '~/utils/saveImage'
import KVImg from '~/assets/images/poster/KVImg.png'
import QrcodeVue from 'qrcode.vue';
import { getStorage } from '~/utils/storage';

const props = defineProps<{
  hideShareDialog?: Function,
}>()
const url = getStorage('shareUrl') || '';
const selectedOption = ref('option1');

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

// 复制链接
function copyShare() {
  const input = document.createElement('input');
  input.value = url;

  // 将输入框添加到 DOM 中
  document.body.appendChild(input);
  // 选择文本
  input.select();
  // 尝试复制文本
  const success = document.execCommand('copy');
  // 从 DOM 中移除输入框
  document.body.removeChild(input);

  if (success) {
    alert('文本已成功复制到剪贴板');
  } else {
    alert('无法复制文本');
  }
}

</script>

<template>
  <div @touchstart="startHold" @touchend="stopHold" w-732px h-1050px fixed center z-888 text-center text="[#b38754]"
    bg="[url(~/assets/images/background/big-outerbg.png)]" bg-cover bg-no-repeat>
    <div @click="props.hideShareDialog" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <!-- 截图内容 -->
    <div class="shareDialog" absolute center>
      <h2 w-600px absolute-center-x top-80px text-32px>
        《航海王:梦想指针》预抽卡
      </h2>
      <div w-520px h-102px absolute-center-x top-180px bg="[url(~/assets/images/headline/share-title.png)]" bg-cover
        bg-no-repeat>
      </div>
      <div w-580px h-620px absolute-center-x bottom-60px bg="[#fff]">
        <div w-542px h-496px absolute-center-x bottom-100px>
          <img :src="KVImg" alt="">
        </div>
        <div flex justify-around absolute-center-x bottom-10px text-24px>
          <select v-model="selectedOption" w-386px h-48px mb-30px border-1px border-orange-200 bg-transparent>
            <option value="option1">我是要成为航海王的男人!</option>
            <option value="option2">无理之人，给我退下!</option>
            <option value="option3">给我个面子</option>
            <option value="option4">成为我的儿了吧!</option>
            <option value="option5">弱者，连死的方式部无权达择</option>
          </select>
          <div @click="copyShare" w-140px h-48px ml-14px lh-48px text="[#743602]" bg="#f9b43b" mb-30px>复制链接</div>
        </div>
      </div>
      <qrcode-vue :value="url" :size=40 absolute bottom-170px right-70px />
      <div w-600px h-40px absolute-center-x bottom--60px text-24px>
        小Tips: 船长也可以通过长按图片或截图保存进行分享，邀请更多伙伴参与活动，一起上船吧~
      </div>
    </div>

  </div>
</template>

<style scoped>
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(~/assets/images/icon/pull-down.jpg);
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: 30px;
  padding-right: 20px;
}

.shareDialog {
  width: 657px;
  height: 980px;
  background-image: url(~/assets/images/background/big-innerbg.png);
  background-repeat: no-repeat;
  /* background-position: contain; */
  background-size: 100% 100%;
}
</style>
