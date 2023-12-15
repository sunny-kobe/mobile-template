<script setup lang="ts">
import "~/assets/css/animations.css";
import { getStorage } from '~/utils/storage';

const props = defineProps<{
  hideAlreadyRecruit?: Function,
  confirmRecruit?: Function,
  prizeList?: any,
}>()
const emit = defineEmits();
const recruitResult = ref()
const alreadyGet = getStorage('alreadyGet') || [];

const showCharacterCard = (item: any) => {
  // 触发自定义事件，通知父组件显示角色卡片
  emit("show-character-card", [item, "alreadyRecruit"]);
}
// 当前显示的弹窗
const currentSlide = ref(1)

const previousSlide = () => {
  if (currentSlide.value > 1) {
    currentSlide.value--;
  } else {
    alert("已经是第一次了")
  }
};

const nextSlide = () => {
  if (currentSlide.value < recruitResult.value.length) {
    currentSlide.value++;
  } else {
    alert("已经是最后一次了")
  }
};

const sureRecruit = async () => {
  console.log(alreadyGet);
  if (alreadyGet == true) {
    alert("你已经确定奖励了")
    return
  }
  let recruitRes = recruitResult.value[currentSlide.value - 1];
  emit("confirm-recruit", recruitRes);
}

onMounted(() => {
  // 奖品列表
  recruitResult.value = props.prizeList.data;
})


</script>

<template>
  <div w-732px h-996px fixed center z-888 text-center text="[#b38754]"
    bg="[url(~/assets/images/background/select-bg.png)]" bg-cover bg-no-repeat>
    <div @click="props.hideAlreadyRecruit" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <h2 w-220px absolute-center-x top-100px text-40px>
      活动规则
    </h2>
    <div w-520px h-136px text-24px absolute-center-x top-210px>
      <div font-medium>以下为本次活动中十连抽奖记录</div>
      <div font-medium> 船长可选取其中一次十连结果作为最终活动奖励!</div>
      <span font-extralight>(游戏正式上线后,船长可点击游戏内公告链，指定账号领取奖励)!</span>
    </div>
    <h2 w-394px h-50px lh-50px text-30px absolute-center-x top-390px bg="[url(~/assets/images/headline/select-title.png)]"
      bg-cover bg-no-repeat>
      十连抽:<span text-orange>第{{ currentSlide }}次</span>
    </h2>
    <!-- 结果展示 -->
    <div w-560px h-306px absolute-center-x top-490px text-20px overflow-auto>
      <div v-for="(item, index) in recruitResult" :key="item.lotteryID">
        <div flex flex-wrap v-show="(currentSlide - 1) === index">
          <div v-for="character in item.characters" :key="character.id" flex="[1_0_15%]" m-12px>
            <div @click="showCharacterCard(character)">
              <img :src=character.avatar alt="">
              <span text-18px text-orange decoration-underline>{{ character.role_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pulse" @click="previousSlide" w-21px h-35px absolute top-610px left-60px
      bg="[url(~/assets/images/icon/turn-left.png)]" bg-cover bg-no-repeat>
    </div>
    <div class="turn-pulse" @click="nextSlide" w-21px h-35px absolute top-610px right-60px
      bg="[url(~/assets/images/icon/turn-left.png)]" bg-cover bg-no-repeat>
    </div>
    <!-- 确认招募 -->
    <div @click="sureRecruit" w-274px h-69px absolute-center-x bottom-80px
      bg="[url(~/assets/images/button/confirm-receipt.png)]" bg-cover bg-no-repeat>
    </div>
  </div>
</template>

<style scoped></style>
