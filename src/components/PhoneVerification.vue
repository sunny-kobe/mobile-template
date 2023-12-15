<script setup lang="ts">
import { getStorage, setStorage } from '~/utils/storage';
import { getActionCode, checkActionCode, getLoginCode, phoneAppointment } from '~/api/index';

const props = defineProps<{
  hidePhoneDialog?: Function,
  isAppointment?: boolean,
}>()
const emit = defineEmits();

// const phoneNumber = ref('13333333333');
const phoneNumber = ref('');
const verificationCode = ref('');
const isCounting = ref(false);
const countdown = ref(60);
const isAppointment = ref(props.isAppointment); // 创建一个 ref 来存储 isAppointment 的值
const codeMsg = ref("");
const isCode = ref(false);
const captcha = ref();
const captchaElement = ref(null);
const invitationCode = ref('');
const isCaptcha = ref(true);

// 对手机号码进行正则表达式验证
const phoneRegex = /^1[3456789]\d{9}$/;
// 对验证码进行正则表达式验证,6位数字
const codeRegex = /^\d{6}$/;

const sendVerificationCode = async () => {
  let passToken;
  if (!phoneRegex.test(phoneNumber.value)) {
    codeMsg.value = "请输入正确的手机号码";
    return;
  }
  isCaptcha.value = false;
  // 行为验证码
  captcha.value.open({
    el: captchaElement.value,
    initCallback: async function () {
      const res = await getActionCode({
        from: 'hhwcardCode'
      });
      if (res) {
        return {
          key: res.data.verifyToken,
          smImg: res.data.thumbBase64,
          bigImg: res.data.imageBase64
        }
      }
    },
    verifyCallback: async function ({ key, dotArr }: { key: string, dotArr: any[] }) {
      // key 验证码的 key  arr 数组坐标 位置
      const res = await checkActionCode({
        verifyDots: dotArr,
        verifyToken: key,
        from: 'hhwcardCode'
      });
      isCaptcha.value = true;
      passToken = res.data.passToken;
      captcha.value.close()

      // 发送验证码
      const data = await getLoginCode({
        username: phoneNumber.value,
        passToken
      });
      console.log(data);

      codeMsg.value = "";
      startCountdown();
      isCode.value = true;
      /**
       * captcha.value.close()
       * captcha.value.refresh()
      */
    },

    closeCallback() {
      isCaptcha.value = true;
    }

  });
};

const login = async () => {
  try {
    if (!phoneRegex.test(phoneNumber.value)) {
      codeMsg.value = "请输入正确的手机号码";
      return;
    }
    // 如果还没有获取验证码
    if (!isCode.value) {
      codeMsg.value = "请先获取验证码";
      return;
    }
    if (!codeRegex.test(verificationCode.value)) {
      codeMsg.value = "请输入正确的验证码";
      return;
    }
    codeMsg.value = "";

    const data = await phoneAppointment({
      username: phoneNumber.value,
      captcha: verificationCode.value,
      invitationCode: invitationCode.value
    });

    isAppointment.value = true;// 更新 isAppointment 状态为 true
    setStorage('isAppointment', true);
    setStorage('myCode', data.data.invitationCode)
    setStorage('token', data.data.token)
    emit('update:isAppointment', true);
    props.hidePhoneDialog?.();
    // 刷新页面
    window.location.reload();
  } catch (error) {
    // 处理错误情况
    console.error(error);
  }
};

const startCountdown = () => {
  isCounting.value = true;
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(interval);
      isCounting.value = false;
      countdown.value = 60;
    }
  }, 1000);
};

onMounted(() => {
  captcha.value = Captcha.init({
    refreshNumber: 2
  });

  invitationCode.value = getStorage('hisCode') || "";
  console.log(invitationCode.value);
});
</script>
<template>
  <div v-show="isCaptcha" w-728px h-540px fixed small-center z-888 text-26px text-center
    bg="[url(~/assets/images/background/verificate-bg.png)]" bg-cover bg-no-repeat>
    <div w-520px h-300px absolute-center-x top-100px text-center p-20px>
      <input class="custom-placeholder" v-model="phoneNumber" maxlength="11" placeholder="输入手机号" w-510px h-60px mx-0
        my-10px>
      <div w-510px my-10px>
        <input class="custom-placeholder" v-model="verificationCode" placeholder="输入验证码" w-284px h-60px>
        <!-- 发生验证码 -->
        <button @click="sendVerificationCode" :disabled="isCounting" w-194px h-62px ml-30px text="[#fff]" bg="[#d4ab7f]">
          {{ isCounting ? `${countdown} 秒后重试` : "获取验证码" }}
        </button>
      </div>
      <div absolute-center-x top-180px text-center>
        <span v-show="codeMsg" h-20px text="red">
          {{ codeMsg }}
        </span>
      </div>
      <button @click="login" w-278px h-70px mt-50px bg="[url(~/assets/images/button/login-btn.png)]" bg-cover
        bg-no-repeat></button>
    </div>
    <div @click="props.hidePhoneDialog" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
  </div>
  <div ref="captchaElement"></div>
</template>

<style scoped>
.custom-placeholder {
  border: 1px solid #d4ab7f;
  outline: none;
  padding-left: 26px;
}

.custom-placeholder::placeholder {
  color: #d4ab7f;
}
</style>
