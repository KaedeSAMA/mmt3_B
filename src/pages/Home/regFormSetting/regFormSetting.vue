<template lang="">
  <div>这里是面试流程设置</div>
</template>
<script setup lang="ts">
import { useResizeHook } from '@/utils/hooks/useResizeHook';
useResizeHook((width, height) => {
  console.log(width, height);
});
</script>
<style lang="scss"></style>
