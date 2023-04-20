<template>
  <el-button @click="hello">你好</el-button>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { _axios } from './server/http';
const hello = () => {
  // 这里是进行get测试
  _axios
    .post('/local/', {
      name: '北京市',
      page: 0
    })
    .then((res) => {});
};
</script>
<style scoped lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
