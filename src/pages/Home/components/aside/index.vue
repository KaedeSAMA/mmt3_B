<template>
  <div class="aside">
    <h3>天理闪报</h3>
    <el-menu
      default-active="0"
      :collapse="isCollapse"
      text-color="white"
      background-color="#001428"
      :unique-opened="true"
    >
      <el-menu-item index="0">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>面试总看板</span>
        </template>
        <el-menu-item index="1-1">
          <template #title><span>报名阶段</span></template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <template #title><span>面试阶段</span></template>
        </el-menu-item>
        <el-menu-item index="1-3">
          <template #title><span>复盘阶段</span></template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>超级管理</span>
        </template>
        <el-menu-item index="2-1">
          <template #title><span>宣传信息设置</span></template>
        </el-menu-item>
        <el-menu-item index="2-2">
          <template #title><span>组织管理</span></template>
        </el-menu-item>
        <el-menu-item index="2-3">
          <template #title><span>面试流程设置</span></template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Menu as IconMenu,
  Location,
  HomeFilled
} from '@element-plus/icons-vue';

const isCollapse = ref(false);
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
</script>
<style scoped lang="scss">
.aside {
  height: 100%;
  h3 {
    text-align: center;
    background-color: #001428;
    color: white;
    height: 60px;
    line-height: 60px;
    font-family: '楷体';
  }
  .el-menu {
    height: calc(100vh - 60px);
    background-color: #001428;
    border-right: none;
    .el-menu-item {
      &:hover {
        background-color: #0186fc;
        color: #fff;
      }
    }

    :deep(.el-menu-item) {
      &.is-active {
        background-color: #102335;
        color: #fff;
        &::before {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          height: 100%;
          width: 2px;
          background-color: #0186fc;
        }
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
