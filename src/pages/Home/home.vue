<template>
  <div class="home">
    <el-container>
      <el-aside width="200px"><Aside /> </el-aside>
      <el-container>
        <el-header><Head /></el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Aside from './components/aside/index.vue';
import Head from './components/head/index.vue';
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-main {
      border: 1px solid blue;
    }
    .el-footer {
      border: 1px solid #333;
    }
  }
}
</style>
