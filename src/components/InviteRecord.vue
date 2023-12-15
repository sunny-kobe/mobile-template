<script setup lang="ts">
import { inviteRecord } from '~/api/index';
import { getStorage } from '~/utils/storage';

interface InviteRecordItem {
  id: number;
  created_at: string;
}

const props = defineProps<{
  hideInviteRecord?: Function,
}>()

const inviteRecordItem = ref([] as InviteRecordItem[]);

onMounted(async () => {
  const data = await inviteRecord({
    token: getStorage('token') || ''
  });

  inviteRecordItem.value = data.data;
});

</script>

<template>
  <div w-732px h-630px fixed small-center z-888 text-center bg="[url(~/assets/images/background/small-bg.png)]" bg-cover
    bg-no-repeat>
    <div @click="props.hideInviteRecord" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <h2 w-220px absolute-center-x top-100px text-40px text="[#b38754]">
      邀请记录
    </h2>
    <div w-540px absolute-center-x pl-10px top-220px flex items-center justify-between text-26px text="[#fdf8ea]">
      <div w-234px h-40px bg="[#d4ab7f]" border-rd-10px>序号</div>
      <div w-234px h-40px bg="[#d4ab7f]" border-rd-10px>受邀约时间</div>
    </div>
    <div w-620px h-228px absolute-center-x pl-40px top-280px text-20px overflow-auto>
      <div pr-40px>
        <div v-for="(item, index) in inviteRecordItem" :key="item.id" h-76px flex items-center justify-between text-center
          border-b-2px border-dashed border-b-zinc-600>
          <div w-234px>
            {{ index + 1 }}
          </div>
          <div w-250px>
            {{ item.created_at }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
