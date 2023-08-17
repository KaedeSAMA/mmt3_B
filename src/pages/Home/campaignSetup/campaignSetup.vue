<template>
  <div class="setUpRoot">
    <el-card class="tabs-content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-tabs">
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
    <div class="tabs-mobile">
      <MobilePhone />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import BaseInfo from './subpage/baseInfo.vue';
import ClubPromotion from './subpage/clubPromotion.vue';
import RecruitDept from './subpage/recruitDept.vue';
import MobilePhone from './subpage/mobile.vue';
import { useOrgInfo } from '@/store/mobile';

const activeName = ref('baseInfo');
// 切换手机模拟器的tab
const handleClick = (tab: TabsPaneContext, event: Event) => {
  useOrgInfo().setActiveTab(+(tab.index ?? 0));
};
</script>
<style lang="scss" scoped>
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

//el-tabs下属的subpage,:deep()才能穿透生效，其余已弃用，带scoped就需要穿透
:deep(.demo-tabs > .el-tabs__content) {
  // padding: 32px;
  // color: #6b778c;
  color: #1559ce;
  // font-size: 15px;
  // font-weight: 400;
}

.tabs-content {
  flex: 2;
  height: 100%;
}

.tabs-mobile {
  flex: 1;
  // height: 100%;
  // display: flex;

  @media (max-width: 820px) {
    display: block;
    flex: 1;
    height: 100%;
    margin-top: 20px;
  }
}
</style>
