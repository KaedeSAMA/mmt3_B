<template>
  <el-card class="mainbox" shadow="always">
    <el-tabs v-model="activeName" class="demo-tabs">
      <!-- 报名表问题 -->
      <el-tab-pane label="报名表问题设置" name="first">
        <RegFormQuestionSet />
      </el-tab-pane>
      <!-- 报名时间 -->
      <el-tab-pane label="报名时间设置" name="second">Config</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import RegFormQuestionSet from '../../components/RegFormSetting/RegFormQuestionSet.vue';

const activeName = ref('first');
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
  :deep(.el-card__body) {
    box-sizing: border-box;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: calc(100% - 60px);
        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
}
</style>
