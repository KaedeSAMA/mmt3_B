<template>
  <div class="aside">
    <el-menu
      default-active="0"
      :collapse="isCollapse"
      text-color="white"
      background-color="#001428"
      :unique-opened="true"
      @select="pushRoute($event)"
    >
      <h3>{{ title }}</h3>
      <el-menu-item index="/home/personalPage">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="/home/a">
        <template #title>
          <el-icon><location /></el-icon>
          <span>面试总看板</span>
        </template>
        <el-menu-item index="/home/b">
          <template #title><span>报名阶段</span></template>
        </el-menu-item>
        <el-menu-item index="/home/c">
          <template #title><span>面试阶段</span></template>
        </el-menu-item>
        <el-menu-item index="/home/d">
          <template #title><span>复盘阶段</span></template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/home/e">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>超级管理</span>
        </template>
        <el-menu-item index="/home/f">
          <template #title><span>宣传信息设置</span></template>
        </el-menu-item>
        <el-menu-item index="/home/g">
          <template #title><span>组织管理</span></template>
        </el-menu-item>
        <el-menu-item index="/home/regFormSetting">
          <template #title><span>报名表设置</span></template>
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
import { useResizeHook } from '@/utils/hooks/useResizeHook';
const route = useRoute();
const router = useRouter();

const title = ref('天理闪报');
const isCollapse = ref(false);
// ### 挂载时查看视口
onBeforeMount(() => {
  if (document.documentElement.clientWidth <= 1000) {
    title.value = '闪报';
    isCollapse.value = true;
  }
});
// ### 监听窗口变化更改菜单栏状态
useResizeHook((wid, hei) => {
  if (wid <= 1000) {
    title.value = '闪报';
    isCollapse.value = true;
  }
  if (wid > 1000) {
    title.value = '天理闪报';
    isCollapse.value = false;
  }
});

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// ### 用于push路由的函数
function pushRoute(newRoute: any) {
  if (route.path !== newRoute) {
    router.push(newRoute);
  }
}
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
    height: 100vh;
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
.change-width {
  width: auto;
}
</style>
