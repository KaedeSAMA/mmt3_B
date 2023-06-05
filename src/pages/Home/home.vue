<template>
  <div class="home">
    <el-container>
      <el-aside width="auto"><Aside /> </el-aside>
      <el-container>
        <el-header><Head /></el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Aside from './components/aside/index.vue';
import Head from './components/head/index.vue';
import { useResizeHook } from '@/utils/hooks/useResizeHook';
// 定义变量保存当前子页面的标题
const asideWidth = ref('200px');
useResizeHook((wid, hei) => {
  if (wid < 1000) {
    asideWidth.value = '64px';
  }
  if (wid > 1000) {
    asideWidth.value = '200px';
  }
});
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  overflow-x: hidden;
  min-width: 460px;
  @media (max-width: 820px) {
    padding: 0;
  }
  .el-container {
    height: 100%;
    .el-main {
      padding: 0;
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   background-color: rgb(247, 248, 249);
    }
  }
}
</style>
