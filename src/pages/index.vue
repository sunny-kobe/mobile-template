<script setup lang="ts" >
import { setStorage, getStorage } from '~/utils/storage';
import shareUrl from '~/utils/sharelink';
import {
  getUserInfo, onceTask, dailyTask, followDouyin, followWeiXi, followWeiBo,
  confirmShare, getFiveStarList, getPrizeList, confirmPrize
} from '~/api/index';
import "~/assets/css/animations.css";

interface Task {
  code: string;
  name: string;
  description: string;
  isFinish: number;
}
interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

defineOptions({
  name: 'IndexPage',
})
let token = getStorage('token') || '';
const scrollY = ref(0);
const isMaskVisible = ref(false)
const ruleDialogVisible = ref(false)
const shareDialogVisible = ref(false)
const phoneDialogVisible = ref(false)
const lotteryDialogVisible = ref(false)
const lotteryDialogShow = ref(true)
const lotteryResultDialogVisible = ref(false);
const recordDialogVisible = ref(false);
const inviteDialogVisible = ref(false);
const recruitDialogVisible = ref(false);
const recruitDialogShow = ref(true);
const characterCardVisible = ref(false);
const confirmRecruitVisible = ref(false);
const confirmAndShareVisible = ref(false);
const alreadyGet = ref(false);
const showModal = ref(false);
const largeImage = ref('');
const largeImageAlt = ref('');
const isAppointment = ref(false) // 预约游戏
const isDragging = ref(false)
const startX = ref(0)
const scrollX = ref(0)
const tenDrawRes = ref([]); // 抽卡结果
const lotteryNum = ref(1) // 抽卡次数
const characters = ref([])
const dailyTasks = ref([] as Task[])
const oneTasks = ref([] as Task[])
const prizeList = ref([] as any)
const recruitResult = ref()
const lotteryID = ref('')
const characterPoster = ref('')
const type = ref('')
const hisCode = ref() // 他人的邀请码

function showMask() {
  scrollY.value = window.scrollY;
  // 禁止背景页面滚动
  isMaskVisible.value = true;
  document.body.style.overflow = 'hidden';
}
function hideMask() {
  isMaskVisible.value = false;
  // 禁止背景页面滚动
  document.body.style.overflow = 'auto';
  window.scrollTo(0, scrollY.value);
}
async function goDailyTasks(task: {
  code: string;
  isFinish: number
}) {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  if (task.isFinish == 0) {
    showShare()
  } else {
    return
  }
}
async function goOneTasks(task: any) {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  if (task.code == "1") {
    showAppointment()
  } else if (task.code == "FollowDouyin") {
    // 打开网址
    if (task.isFinish == 0) {
      window.open("https://v.douyin.com/iRNFq5nn/");
      await followDouyin();
    }
  } else if (task.code == "FollowWeixin") {
    if (task.isFinish == 0) {
      window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkwODUzMTAzNw==&scene=124#wechat_redirect")
      await followWeiXi();
    }
  } else if (task.code == "FollowWeibo") {
    if (task.isFinish == 0) {
      window.open("https://weibo.com/u/7742978519");
      await followWeiBo();
    }
  }
  task.isFinish = 1;
}

// 规则
function showRoules() {
  showMask()
  ruleDialogVisible.value = true
}
function hideRuleDialog() {
  ruleDialogVisible.value = false
  hideMask()
}

// 分享
function showShare() {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  showMask()
  shareDialogVisible.value = true
}
function hideShareDialog() {
  shareDialogVisible.value = false
  hideMask()
}

// 预约游戏
function showAppointment() {
  showMask()
  phoneDialogVisible.value = true
}
function hidePhoneDialog() {
  phoneDialogVisible.value = false
  hideMask()
}
function updateIsAppointment(value: boolean) {
  isAppointment.value = value; // 更新 isAppointment 的值
};

// 抽卡结果传递
// 监听来自 LotteryAnimation 组件的 finishAnimation 事件
const onFinishAnimation = (tenDrawResFromAnimation: any) => {
  tenDrawRes.value = tenDrawResFromAnimation;
  type.value = "lotteryResult"
};

// 角色一览
function startDragging(event: { clientX: number }) {
  isDragging.value = true
  startX.value = event.clientX - scrollX.value
}
function dragCharacter(event: { clientX: number }) {
  if (!isDragging.value)
    return
  const deltaX = event.clientX - startX.value
  scrollX.value = deltaX
}
function stopDragging() {
  isDragging.value = false
}
const hideLargeImage = () => {
  showModal.value = false;
  hideMask()
};
const showLargeImage = (character: any) => {
  largeImage.value = character.poster1;
  largeImageAlt.value = character.role_name;
  showModal.value = true;
  showMask()
};

// 抽卡
function showLottery() {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  if (lotteryNum.value > 0) {
    showMask()
    lotteryDialogVisible.value = true
  } else {
    alert("抽卡次数不足")
  }
};
function hideLotteryDialog() {
  lotteryDialogVisible.value = false
  hideMask()
}

// 抽卡结果
function showlotteryResult() {
  showMask()
  lotteryResultDialogVisible.value = true
}
function hideResultDialog() {
  getLotteryNum()
  getMyPrize()
  lotteryResultDialogVisible.value = false
  hideMask()
}

// 分享记录
function showShareRecord() {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  showMask()
  recordDialogVisible.value = true
}
function hideShareRecord() {
  recordDialogVisible.value = false
  hideMask()
}
// 邀请记录
function showInviteRecord() {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }
  showMask()
  inviteDialogVisible.value = true
}
function hideInviteRecord() {
  inviteDialogVisible.value = false
  hideMask()
}
// 已招募船员
function showAlreadyRecruit() {
  if (!isAppointment.value) {
    showAppointment()
    return;
  }

  // 判断是否有数据，没有的话关闭弹窗
  if (!prizeList.value.data.length || prizeList.value.code != 0) {
    alert("你暂时还没有船员，请先招募船员")
    return;
  } else {
    showMask()
    recruitDialogVisible.value = true
  }
}
function hideAlreadyRecruit() {
  recruitDialogVisible.value = false
  hideMask()
}

// 卡牌展示
function showCharacterCard(item: any) {
  console.log(item);
  type.value = item[1]
  if (type.value == "alreadyRecruit") {
    recruitDialogShow.value = false
    characterPoster.value = item[0].poster1;
    characterCardVisible.value = true
    return
  }
  if (type.value == "lotteryResult") {
    lotteryDialogShow.value = false
    characterPoster.value = item[0].poster1;
    characterCardVisible.value = true
    return
  }

  showMask();
  characterPoster.value = item[0].poster1;
  characterCardVisible.value = true
}
function hideCharacterCard() {
  if (type.value == "alreadyRecruit") {
    recruitDialogShow.value = true
  }
  if (type.value == "lotteryResult") {
    lotteryDialogShow.value = true
  }
  if (type.value == "select") {
    hideMask()
  }
  characterCardVisible.value = false
  // hideMask()
}

// 确认招募
function confirmRecruit(recruitRes: any) {
  console.log(recruitRes);
  recruitResult.value = recruitRes.characters;
  lotteryID.value = recruitRes.lotteryID;
  confirmRecruitVisible.value = true
  hideAlreadyRecruit()
}
// 确认招募分享
async function showconfirmAndShare() {
  // 确认招募
  if (alreadyGet.value == false) {
    const data = await confirmPrize({
      lotteryID: lotteryID.value,
      token: getStorage('token') || ''
    }) as unknown as ApiResponse;
    if (data.code == 0) {
      showMask()
      confirmAndShareVisible.value = true
      alreadyGet.value = true
      setStorage('alreadyGet', alreadyGet.value);
    } else {
      alert(data.msg)
    }
  }
  showMask()
  confirmAndShareVisible.value = true

}
function hideconfirmAndShare() {
  confirmAndShareVisible.value = false
  hideMask()
}

// 获取抽卡次数
async function getLotteryNum() {
  const userInfo = await getUserInfo({
    token
  });
  lotteryNum.value = userInfo.data.remainingChances;
}
// 已招募船员
async function getMyPrize() {
  const myPrizeList = await getPrizeList({
    token
  })
  // console.log(myPrizeList);
  prizeList.value = myPrizeList
}

// 深度监听dailyTasks和oneTasks，当它们的值发生变化时，更新lotteryNum
watch([dailyTasks, oneTasks], () => {
  // 先判断有没有token
  if (!token) {
    return;
  }
  getLotteryNum();
}, { deep: true });


onMounted(async () => {
  // 获取当前页面的完整 URL
  const currentURL = window.location.href;
  // 活动分享
  if (currentURL.includes('invitationCode')) {
    const urlParams = new URLSearchParams(window.location.search);
    hisCode.value = urlParams.get('invitationCode');

    if (getStorage('hisCode') == null) {
      const data = await confirmShare({
        invitationCode: hisCode.value,
        token
      }) as unknown as ApiResponse;;
      if (data.code == 0) {
        console.log(data, '成功分享');
      } else {
        console.log(data, '分享失败');
      }
    }
    setStorage('hisCode', hisCode.value);
  }


  // 从缓存中读取预约游戏状态
  const isAppointmentFromStorage = getStorage('isAppointment');
  if (isAppointmentFromStorage) {
    isAppointment.value = isAppointmentFromStorage;
    getLotteryNum();
  }

  // 每日任务列表
  // 单次任务列表
  // 五星角色列表
  const [dailyTaskList, onceTaskList, FiveStarList] = await Promise.all([
    dailyTask(),
    onceTask(),
    getFiveStarList(),
  ]);
  dailyTasks.value = dailyTaskList.data;
  oneTasks.value = onceTaskList.data;
  characters.value = FiveStarList.data;

  if (token) {
    setStorage('shareUrl', shareUrl);

    await getMyPrize()
    if (prizeList.value.code != 0) {
      alert(prizeList.value.msg)
    } else {
      // 判断是否有已确认的奖励
      function findConfirmedObject(arr: any[]) {
        return arr.find((obj: { isConfirm: number; }) => obj.isConfirm === 1) || null;
      }
      const confirmedObject = findConfirmedObject(prizeList.value.data);
      if (confirmedObject) {
        confirmRecruitVisible.value = true;
        alreadyGet.value = true
        setStorage('alreadyGet', alreadyGet.value);
        recruitResult.value = confirmedObject.characters;
        // console.log("找到isConfirm值为1的对象：", confirmedObject);
      }
    }
  }

});
</script>

<template>
  <div w-750px text="[#614034]" text-16px relative>
    <!-- 遮罩层 -->
    <div v-if="isMaskVisible" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex-center backdrop-blur-5>
    </div>
    <!-- 模态框用于显示大图 -->
    <div v-if="showModal" @click="hideLargeImage" w-717px h-1094px fixed center z-999>
      <img :src="largeImage" :alt="largeImageAlt" w-717px h-1094px>
    </div>

    <!-- 1:pv -->
    <div h-930px bg="[url(~/assets/images/background/bg1.jpg)]" bg-cover bg-no-repeat relative>
      <!-- 挂件 -->
      <div w-70px h-230px absolute left-30px top-30px>
        <!-- 规则和分享 -->
        <div w-70px h-152px bg="[url(~/assets/images/button/ruleAndShare.png)]" bg-contain>
          <div @click="showShare" w-70px h-70px></div>
          <div @click="showRoules" w-70px h-70px></div>
        </div>
        <!-- 声音 -->
        <AudioPlayer />
      </div>
      <div w-570px h-346px absolute-center-x top-480px bg="[url(~/assets/images/headline/theme-title.png)]" bg-contain
        bg-no-repeat></div>
      <div w-460px h-40px absolute-center-x top-766px text-24px text="[#efeff0]" text-center>
        活动时间: 2023/12/29-2024/01/31
      </div>
      <!-- 预约游戏 -->
      <div w-490px h-114px absolute-center-x bottom-10px>
        <div v-if="!isAppointment" @click="showAppointment" w-490px h-114px
          bg="[url(~/assets/images/button/reserved.png)]" bg-contain>
        </div>
        <div v-if="isAppointment" w-490px h-114px bg="[url(~/assets/images/button/reserved-already.png)]" bg-contain>
        </div>
      </div>
    </div>

    <!-- 2:招募 -->
    <div h-1062px bg="[url(~/assets/images/background/bg2.jpg)]" bg-cover bg-no-repeat relative mt--2px>
      <!-- 横向滚动查看角色 -->
      <CharacterCarousel :characters="characters" :start-dragging="startDragging" :drag-character="dragCharacter"
        :stop-dragging="stopDragging" :scroll-x="scrollX" @show-large-image="showLargeImage" />
      <div w-200px h-30px absolute-center-x top-800px text-22px text-center>
        剩余抽卡次数：{{ lotteryNum }}
      </div>
      <div @click="showLottery" w-280px h-62px absolute-center-x top-840px bg="[url(~/assets/images/button/lottery.png)]"
        bg-contain bg-no-repeat>
      </div>
      <div flex justify-around items-center w-700px h-50x absolute-center-x top-960px text-26px text-center lh-48px>
        <div @click="showShareRecord" w-190px h-48px bg="[url(~/assets/images/background/record-bg.png)]" bg-contain>
          分享记录
        </div>
        <div @click="showInviteRecord" w-190px h-48px bg="[url(~/assets/images/background/record-bg.png)]" bg-contain>
          邀请记录
        </div>
        <div @click="showAlreadyRecruit" w-190px h-48px bg="[url(~/assets/images/background/record-bg.png)]" bg-contain>
          已招募船员
        </div>
      </div>
    </div>

    <!-- 3:任务 -->
    <div h-268px bg="[url(~/assets/images/background/bg3.jpg)]" bg-cover bg-no-repeat relative mt--2px></div>
    <div h-1096px bg="[url(~/assets/images/background/bg4.jpg)]" bg-cover bg-no-repeat relative mt--2px>
      <div w-700px h-900px absolute-center-x top-100px text-22px text-center>
        <!-- 每日任务 -->
        <ul h-270px flex flex-col justify-between items-center>
          <li v-for="task in dailyTasks" :key="task.code" w-692px h-124px
            bg="[url(~/assets/images/background/task-bg.png)]" bg-contain bg-no-repeat flex justify-between items-center>
            <div w-420px h-72px text-left ml-40px>
              <div h-30px>{{ task.description }}</div>
            </div>
            <div @click="goDailyTasks(task)" mr-30px>
              <div v-if="task.isFinish != 0" w-174px h-60px bg="[url(~/assets/images/button/to-complete.png)]" bg-contain
                bg-no-repeat></div>
              <div v-else w-174px h-60px bg="[url(~/assets/images/button/tocomplete.png)]" bg-contain bg-no-repeat></div>
            </div>
          </li>
        </ul>

        <!-- 单次任务 -->
        <ul h-560px mt-140px flex flex-col justify-between items-center>
          <li v-for="task in oneTasks" :key="task.code" w-692px h-124px bg="[url(~/assets/images/background/task-bg.png)]"
            bg-contain bg-no-repeat flex justify-between items-center>
            <span w-420px h-72px lh-72px text-left ml-40px>{{ task.description }}</span>
            <div @click="goOneTasks(task)" mr-30px>
              <div v-if="task.isFinish !== 0" w-174px h-60px bg="[url(~/assets/images/button/completed.png)]" bg-contain
                bg-no-repeat></div>
              <div v-else w-174px h-60px bg="[url(~/assets/images/button/tocomplete.png)]" bg-contain bg-no-repeat></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 4:挑选伙伴 -->
    <div h-264px bg="[url(~/assets/images/background/bg5.jpg)]" bg-contain bg-no-repeat relative mt--2px></div>
    <div h-906px bg="[url(~/assets/images/background/bg6.jpg)]" bg-cover bg-no-repeat relative mt--2px>
      <!-- 展示图 -->
      <div absolute-center-x top-50px>
        <div v-if="confirmRecruitVisible" w-560px h-306px absolute-center-x top-0px text-20px overflow-auto>
          <div flex flex-wrap>
            <div v-for="(item, index) in recruitResult" :key="index" flex="[1_0_15%]" m-12px>
              <div @click="showCharacterCard([item, 'select'])">
                <img :src=item.avatar alt="">
                <!-- <span ml-10px text-18px text-center text-orange decoration-underline>查看详情</span> -->
                <span ml-10px text-14px text-center text-orange decoration-underline>{{ item.role_name }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-else text-24px mt-140px whitespace-nowrap>目前空空如也,赶紧挑选你的强力五星吧</p>
      </div>
      <!-- 按钮 -->
      <div>
        <div v-if="!confirmRecruitVisible" @click="showAlreadyRecruit" w-280px h-62px absolute-center-x top-500px
          bg="[url(~/assets/images/button/select-yours.png)]" bg-contain bg-no-repeat>
        </div>
        <div v-if="confirmRecruitVisible" flex justify-around items-center absolute-center-x top-500px>
          <!-- 确认奖励 -->
          <div @click="showconfirmAndShare" w-280px h-62px top-500px
            bg="[url(~/assets/images/button/confirm-and-share.png)]" bg-contain bg-no-repeat></div>
          <!-- 重新挑选 -->
          <div v-if="!alreadyGet" @click="showAlreadyRecruit" w-280px h-62px top-500px
            bg="[url(~/assets/images/button/select-again.png)]" bg-contain bg-no-repeat></div>
        </div>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <ShareDialog v-if="shareDialogVisible" :hide-share-dialog="hideShareDialog" />
    <!-- 规则弹窗 -->
    <RuleDialog v-if="ruleDialogVisible" :hide-rule-dialog="hideRuleDialog" />
    <!-- 登录 -->
    <PhoneVerification v-if="phoneDialogVisible" :hide-phone-dialog="hidePhoneDialog" :is-appointment="isAppointment"
      @update:isAppointment="updateIsAppointment" />
    <!-- 抽卡动画 -->
    <LotteryAnimation v-if="lotteryDialogVisible" :hide-lottery-dialog="hideLotteryDialog"
      :showlotteryResult="showlotteryResult" @finishAnimation="onFinishAnimation" />
    <!-- 抽卡结果 -->
    <LotteryResult v-if="lotteryResultDialogVisible" v-show="lotteryDialogShow" :hide-result-dialog="hideResultDialog"
      :tenDrawRes="tenDrawRes" @show-character-card="showCharacterCard" />
    <!-- 分享记录 -->
    <ShareRecord v-if="recordDialogVisible" :hide-share-record="hideShareRecord" />
    <!-- 邀请记录 -->
    <InviteRecord v-if="inviteDialogVisible" :hide-invite-record="hideInviteRecord" />
    <!-- 已招募船员 -->
    <AlreadyRecruit v-if="recruitDialogVisible" v-show="recruitDialogShow" :hide-already-recruit="hideAlreadyRecruit"
      :prize-list="prizeList" @confirm-recruit="confirmRecruit" @show-character-card="showCharacterCard" />
    <!-- 卡牌展示   -->
    <CharacterCard v-if="characterCardVisible" :hide-character-card="hideCharacterCard"
      :character-poster="characterPoster" />
    <!-- 确认奖励分享 -->
    <ConfirmAndShare v-if="confirmAndShareVisible" :recruit-result="recruitResult"
      :hideconfirm-and-share="hideconfirmAndShare" />
  </div>
</template>

<style scoped></style>
