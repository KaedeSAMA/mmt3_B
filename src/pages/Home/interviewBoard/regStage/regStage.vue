<template>
  <div class="biggest">
    <div class="bigger">
      <div class="topData">
        <filterButton></filterButton>
      </div>
      <div class="mainData">
        <div class="leftData">
          <textData></textData>
          <pieData></pieData>
        </div>
        <div class="rightData">
          <barData></barData>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import filterButton from './filterButton.vue';
import textData from './textData.vue';
import pieData from './pieData.vue';
import barData from './barData.vue';
</script>
<style scoped lang="scss">
.biggest {
  height: 100%;
  width: 100%;
  min-width: 1000px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bigger {
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .topData {
      width: 100%;
      height: 9%;
      background-color: pink;
    }
    .mainData {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88%;
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
  }
}
</style>
