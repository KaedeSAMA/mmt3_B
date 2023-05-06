<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: aqua;
    }
    .el-header {
      background-color: red;
    }
    .el-main {
      background-color: blue;
    }
    .el-footer {
      background-color: green;
    }
  }
}
</style>
