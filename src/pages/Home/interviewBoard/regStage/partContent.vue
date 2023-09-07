<template>
  <div class="mainData">
    <div class="topData">
      <partTextData></partTextData>
    </div>
    <div class="bottomData">
      <partPieData></partPieData>
      <partLineData></partLineData>
    </div>
  </div>
</template>
<script setup lang="ts">
import partTextData from './partTextData.vue';
import partPieData from './partPieData.vue';
import partLineData from './partLineData.vue';
</script>
<style scoped lang="scss">
.mainData {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 92%;
  width: 100%;
  .topData {
    width: 100%;
    height: 30%;
  }
  .bottomData {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65%;
    width: 100%;
  }
}
</style>
