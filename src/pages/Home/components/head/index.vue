<template>
  <div class="home_head">
    <div class="left-content">
      <el-icon><Operation /></el-icon>
      <text>学生创新创业实践中心党支部</text>
    </div>
    <div class="right-content">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <text>高佳兴</text>
      <el-popover
        placement="top"
        :width="160"
        trigger="hover"
        popper-style="padding: 0px"
      >
        <template #reference>
          <svg-icon icon-name="icon-sanjiaoxing"></svg-icon>
        </template>
        <div class="operate-list">
          <div class="operate-item">个人主页</div>
          <div class="operate-item">联系我们与反馈</div>
          <div class="operate-item">退出登录</div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue';
</script>
<style scoped lang="scss">
.home_head {
  display: grid;
  height: 100%;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'left . right';
  .left-content {
    display: flex;
    align-items: center;
    grid-area: left;
    .el-icon {
      margin-right: 10px;
    }
    text {
      font-size: 14px;
    }
  }
  .right-content {
    grid-area: right;
    margin-right: 20px;
    :deep(.el-avatar--circle) {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    text {
      margin-left: 10px;
    }
    svg {
      height: 10px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
.operate-list {
  display: grid;
  width: 100%;
  grid-template-rows: 30px 40px 30px;
  margin: 10px 0;
  .operate-item {
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:last-child {
      border: none;
    }
    &:nth-child(2) {
      line-height: 40px;
    }
  }
}
</style>
