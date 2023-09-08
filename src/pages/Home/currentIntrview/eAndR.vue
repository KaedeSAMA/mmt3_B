<template>
  <el-card class="mainbox" shadow="always">
    <div class="resume"><resume></resume></div>
    <div class="evaluate"><evaluateEmit></evaluateEmit></div>
    <el-icon size="20" class="closeIcon" @click="close"><Close /></el-icon>
  </el-card>
</template>

<script setup lang="ts">
import resume from '@/pages/Home/components/evaluateAndResume/resume.vue';
import evaluateEmit from '@/pages/Home/components/evaluateAndResume/evaluateEmit.vue';
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
    height: auto;
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
    @media (max-width: 1150px) {
      width: 98%;
    }
  }
  .evaluate {
    width: 48%;
    margin-left: 2%;
    display: inline-block;
    vertical-align: top;
    @media (max-width: 1150px) {
      width: 98%;
      margin-top: 20px;
    }
  }
}
</style>
