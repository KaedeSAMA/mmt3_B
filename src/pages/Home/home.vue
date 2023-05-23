<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <!-- 这个div用来占位Asider侧边栏组件 -->
        <div></div>
      </el-aside>
      <el-container>
        <el-header height="110px">
          <div class="titleAndAvatar">
            <div class="title">
              <!-- 标题 -->
              <span class="font">{{ title }}</span>
              <!-- 头像 -->
              <div class="avatar"></div>
            </div>
          </div>
          <!-- 这里暂时用div占位之后要写的面包屑组件 -->
          <div class=""></div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
// 定义变量保存当前子页面的标题
const title = ref('个人主页');
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
