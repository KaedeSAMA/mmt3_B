<template>
  <el-card class="mainbox" shadow="always">
    <article class="container">
      <!-- 面试次序和主体数据 -->
      <personList></personList>
      <br />
      <div class="right">
        <!-- 任务进度表 -->
        <!-- <taskProgress></taskProgress> -->
        <!-- 面试通知 -->
        <!-- <interviewNotice></interviewNotice> -->
      </div>
    </article>
  </el-card>
</template>

<script setup lang="ts">
import personList from './personList.vue';
import { getMainData } from '@/api/interviewArrange';
// const res = await getMainData({
//   page: 1,
//   pageNum: 1,
//   round: 1
// });
// console.log(res);
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
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
