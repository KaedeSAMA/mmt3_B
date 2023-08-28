<template>
  <div class="mainData">
    <div class="leftData">
      <textData></textData>
      <pieData></pieData>
    </div>
    <div class="rightData">
      <lineData></lineData>
    </div>
  </div>
</template>
<script setup lang="ts">
import textData from './textData.vue';
import pieData from './pieData.vue';
import lineData from './lineData.vue';
</script>
<style scoped lang="scss">
.mainData {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92%;
  width: 100%;

  .leftData {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 48%;
  }
  .rightData {
    height: 100%;
    width: 48%;
  }
}
</style>
