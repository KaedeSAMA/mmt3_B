<template>
  <el-card class="mainbox" shadow="always"
    >面试安排
    <div class="big">
      <div class="left">
        <!-- 面试次序和主体数据 -->
        <personList></personList>
      </div>
      <div class="right">
        任务进度表
        <!-- <taskProgress></taskProgress> -->
        面试通知
        <!-- <interviewNotice></interviewNotice> -->
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import personList from './personList.vue';
import { getMainData } from '@/api/interviewArrange';
const res = await getMainData({
  page: 1,
  pageNum: 1,
  round: 1
});
console.log(res);
// import taskProgress from './taskProgress.vue';
// import interviewNotice from './interviewNotice.vue';
</script>

<style scoped lang="scss">
.mainbox {
  width: 96%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-width: 520px;
  min-height: 580px;
  @media (max-width: 1150px) {
    height: 96%;
  }
}
.big {
  height: 100%;
  width: 100%;
  min-width: 1270px;
  min-height: 590px;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}
.left {
  padding-left: 3%;
  padding-right: 3%;
  width: 56%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin-right: 1.5%;
}
.right {
  width: 42.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
