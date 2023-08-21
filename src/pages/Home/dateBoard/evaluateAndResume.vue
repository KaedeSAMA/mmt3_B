<template>
  <el-card class="mainbox" shadow="always">
    <div class="resume">
      <resume></resume>
    </div>
    <div class="evaluate">
      <evaluate></evaluate>
    </div>
    <el-icon size="20" class="closeIcon" @click="close"><Close /></el-icon>
  </el-card>
</template>

<script setup lang="ts">
import resume from './components/resume.vue';
import evaluate from './components/evaluate.vue';
import { Close } from '@element-plus/icons-vue';
const emit = defineEmits(['change']);
const close = () => {
  emit('change', true);
};
</script>

<style scoped lang="scss">
.mainbox {
  width: 96%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-width: 520px;
  min-height: 580px;
  position: relative;
  @media (max-width: 1150px) {
    height: 96%;
  }
  .closeIcon {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .closeIcon:hover {
    cursor: pointer;
  }
  .resume {
    width: 49%;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding-left: 15px;
  }
  .evaluate {
    width: 49%;
    margin-left: 2%;
    // background-color: rgb(58, 206, 214);
    display: inline-block;
    vertical-align: top;
  }
}
</style>
