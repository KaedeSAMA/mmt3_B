<template>
  <div class="home">
    <el-container>
      <el-aside width="200px"><Aside /> </el-aside>
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

// 定义变量保存当前子页面的标题
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  min-width: 1250px;
  min-height: 760px;
  .el-container {
    height: 100%;
    .el-main {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(247, 248, 249);
    }
  }
}
</style>
