<script setup lang="ts">
const props = defineProps<{
  hideRuleDialog?: Function,
}>()


</script>

<template>
  <div w-732px h-1050px fixed center z-888 text-center text="[#b38754]" bg="[url(~/assets/images/background/big-bg.png)]"
    bg-cover bg-no-repeat>
    <div @click="props.hideRuleDialog" w-60px h-60px absolute top--84px right-26px p-2px cursor-pointer
      bg="[url(~/assets/images/icon/close.png)]" bg-cover bg-no-repeat>
    </div>
    <h2 w-220px absolute-center-x top-100px text-40px>
      活动规则
    </h2>
    <div w-640px h-726px absolute-center-x pl-40px top-230px text-24px text-left overflow-auto lh-4.5>
      <div pr-20px>
        <p>
          1. 活动期间，船长完成预约和关注任务均可获得20次抽卡次数，而完成每日任务，均可获得更多抽卡次数。
        </p>
        <p>2. 活动期间，船长最多可获得20次十连抽，共计200抽的抽卡机会。</p>
        <p>3. 抽奖说明</p>
        <p>本次活动抽卡模块结果即时显示，200抽结束后则本次预抽卡活动结束，角色卡牌设置及概率公示如下：</p>
        <p>【五星角色】</p>
        <table>
          <tr>
            <th>角色名</th>
            <th>艾斯</th>
            <th>王女薇薇</th>
            <th>基德</th>
            <th>班吉</th>
            <th>霍金斯</th>
          </tr>
          <tr>
            <td>抽出概率</td>
            <td>1.2%</td>
            <td>1.2%</td>
            <td>1.2%</td>
            <td>1.2%</td>
            <td>1.2%</td>
          </tr>
        </table>
        <p>【四星角色】</p>
        <table>
          <tr>
            <th>角色名</th>
            <th>巴奇</th>
            <th>克洛</th>
            <th>克里克</th>
            <th>Ms.星期三</th>
            <th>Ms.黄金周</th>
            <th>烟鬼</th>
            <th>爱比达</th>
            <th>Mr.2</th>
            <th>Mr.3</th>
          </tr>
          <tr>
            <td>抽出概率</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
            <td>5%</td>
          </tr>
        </table>
        <p>【三星角色】</p>
        <table>
          <tr>
            <th>角色名</th>
            <th>摩根</th>
            <th>撒谎布</th>
            <th>强高</th>
            <th>小八</th>
            <th>瓦波尔</th>
          </tr>
          <tr>
            <td>抽出概率</td>
            <td>9.80%</td>
            <td>9.80%</td>
            <td>9.80%</td>
            <td>9.80%</td>
            <td>9.80%</td>
          </tr>
        </table>
        <p>4. 奖励领取方式与时间</p>
        <p>① 奖励领取时间：2024年1月25日10:00~2024年2月29日23:59</p>
        <p>② 船长须在2024年2月29日23:59前，在游戏内用和参与本次预约活动相同的手机号，完成角色创建；</p>
        <p>③ 同时，在本预抽卡页面上，从历次抽卡获得的十连奖励中，选择其中一次十连抽奖结果，作为本次活动的最终奖励；</p>
        <p>④
          请船长在活动期间，及时在游戏上线后用相同账号完成角色创建，确定需要领取的活动最终奖励，并在奖励领取时间内，到本活动场景内领取奖励，领奖过程中请船长按照指引完成游戏账号信息授权（含区服信息），以支持相关奖励发放至船长指定的游戏账号中，活动奖励将在游戏公测上线后30天内，陆续发放至对应账号的游戏邮箱
        </p>
        <p>⑤ 截止2024年2月29日23:59前，未在游戏内创建账号，或未在本活动页面确定需要领取的活动最终奖励，或未按照指引填写区服信息授权领取奖励，视为弃奖；</p>
        <p>⑥ 请船长享受游戏，完成前期新手指引，即可开放游戏内邮箱功能并领取本次活动最终奖励。</p>
        <p>5. 如涉及奖励发放等问题，将可能有客服人员与您沟通处理，如有疑问，也欢迎船长咨询客服QQ：800152016（早8:00-晚22:00）。</p>
        <p>6. 活动过程中，凡以不正当手段（如作弊领取、违规注册、恶意刷奖等）参与本次活动的船长，《航海王：梦想指针》项目组有权终止其参与活动，并取消其获奖资格（如奖品已发放，将有权追回）。</p>
        <p>7. 最终解释权归《航海王：梦想指针》项目组所有。</p>
      </div>

    </div>

    <!-- <div class="bottomTips pulse">
      <svg t="1697600927594" class="bottomTipsIcon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="1437" width="200" height="200">
        <path
          d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m0 640L240 432l45.6-45.6L512 613.6l226.4-226.4 45.6 45.6L512 704z"
          p-id="1438"></path>
      </svg>
    </div> -->
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 50%;
  margin: 20px auto;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  /* background-color: #f2f2f2; */
}
</style>
