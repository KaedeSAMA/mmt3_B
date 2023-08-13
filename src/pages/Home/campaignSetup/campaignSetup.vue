<template>
  <div class="setUpRoot">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <BaseInfo />
        </el-tab-pane>
        <el-tab-pane label="社团宣传" name="clubPromotion">
          <ClubPromotion />
        </el-tab-pane>
        <el-tab-pane label="纳新部门" name="recruitDept">
          <RecruitDept />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card> phone </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import BaseInfo from './subpage/baseInfo.vue';
import ClubPromotion from './subpage/clubPromotion.vue';
import RecruitDept from './subpage/recruitDept.vue';

const activeName = ref('baseInfo');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="scss">
.setUpRoot {
  height: 100%;

  @media (max-width: 820px) {
    flex-direction: column;
    min-height: 100%;
    justify-content: start;
    align-items: center;
    overflow-y: auto;
  }

  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
