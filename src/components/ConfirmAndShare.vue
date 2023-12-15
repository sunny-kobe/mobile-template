<script setup lang="ts">
import { saveImage } from '~/utils/saveImage'
import QrcodeVue from 'qrcode.vue';
import { getStorage } from '~/utils/storage';

const props = defineProps<{
  hideconfirmAndShare?: Function,
  recruitResult?: any,
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
  <div w-732px h-1142px fixed center z-888 text-center text="[#b38754]"
    bg="[url(~/assets/images/background/confirm-share-out.png)]" bg-cover bg-no-repeat>
    <div @touchstart="startHold" @touchend="stopHold" class="shareDialog" absolute center>
      <div @click="props.hideconfirmAndShare" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
        bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat></div>
      <div w-566px h-100px absolute-center-x top-90px bg="[url(~/assets/images/headline/confirm-share-title.png)]"
        bg-cover bg-no-repeat></div>
      <div w-600px h-833px absolute-center-x top-200px bg="[url(~/assets/images/poster/share-aisi.png)]" bg-cover
        bg-no-repeat>
        <!-- 角色 -->
        <div w-560px h-306px absolute-center-x top-420px text-20px>
          <div flex flex-wrap>
            <div v-for="(item, index) in recruitResult" :key="index" flex="[1_0_15%]" m-12px>
              <div>
                <img :src=item.avatar alt="">
                <!-- <span ml-10px text-18px text-center text-orange decoration-underline>查看详情</span> -->
                <!-- <span ml-10px text-14px text-center text-orange decoration-underline>{{ item.role_name }}</span> -->
              </div>
            </div>
          </div>
        </div>
        <div w-588px h-142px absolute-center-x bottom-10px text-20px border-rd-10px border border-slate-500 bg="#fff">
          <div absolute left-20px top-30px>预约抽卡最高可领200抽，必得五星角色</div>
          <div absolute left-20px top-80px>《航海王:梦想指针》1月24日上线</div>
          <img src="" alt="">
        </div>
      </div>
      <qrcode-vue :value="url" :size=56 absolute bottom-70px right-60px />
      <div w-600px h-40px absolute-center-x bottom--60px text-24px>
        小Tips: 船长也可以通过长按图片或截图保存进行分享，邀请更多伙伴参与活动，一起上船吧~
      </div>
    </div>
  </div>
</template>

<style scoped>
.shareDialog {
  width: 658px;
  height: 1078px;
  background-image: url(~/assets/images/background/confirm-share-in.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
