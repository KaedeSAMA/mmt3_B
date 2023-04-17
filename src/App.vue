<template>
  <el-button @click="hello">你好</el-button>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { _axios } from './server/http';
const hello = () => {
  // 这里是进行get测试
  _axios
    .get('https://v.api.aa1.cn/api/api-tplist/go.php/api/News/local_news', {
      name: '北京市',
      page: 0
    })
    .then((res) => {
      console.log(res);
    });
};
</script>
<style scoped lang="scss"></style>
