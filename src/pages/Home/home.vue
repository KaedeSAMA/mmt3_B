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
    .el-aside {
      background-color: #0d1d34;
    }
    .el-header {
      padding: 0;
      background-color: white;
      display: flex;
      flex-direction: column;
      .titleAndAvatar {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 2px solid rgb(242, 242, 242);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .title {
          .font {
            font-size: 18px;
          }
        }
      }
    }
    .el-main {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(247, 248, 249);
    }
  }
}
</style>
