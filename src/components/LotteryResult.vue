<script setup lang="ts">
const props = defineProps<{
  hideResultDialog?: Function,
  tenDrawRes?: any,
}>()
const emit = defineEmits();

const showCharacterCard = (item: any) => {
  // 触发自定义事件，通知父组件显示角色卡片
  emit("show-character-card", [item, "lotteryResult"]);
}
const recruitResult = ref(props.tenDrawRes)

onMounted(() => {
  // 招募结果
});

</script>

<template>
  <div w-732px h-630px fixed small-center z-888 text-center bg="[url(~/assets/images/background/small-bg.png)]" bg-cover
    bg-no-repeat>
    <div @click="props.hideResultDialog" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <h2 w-400px absolute-center-x top-100px text-40px text="[#b38754]">
      船员招募
    </h2>
    <div w-560px h-306px absolute-center-x top-220px text-20px overflow-auto>
      <div flex flex-wrap>
        <div v-for="item in recruitResult" :key="item.id" flex="[1_0_15%]" m-12px>
          <div @click="showCharacterCard(item)">
            <img :src=item.avatar alt="">
            <span text-18px text-orange decoration-underline>{{ item.role_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
