<template>
  <div class="biggest">
    <div class="bigger">
      <div class="topData">
        <filterButton></filterButton>
      </div>
      <allContent></allContent>
      <!-- <partContent></partContent> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import filterButton from './filterButton.vue';
import allContent from './allContent.vue';
import partContent from './partContent.vue';
</script>
<style scoped lang="scss">
.biggest {
  height: 100%;
  width: 100%;
  min-width: 1000px;
  min-height: 600px;
  // max-width: 1900px;
  // max-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bigger {
    height: 93%;
    width: 93%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .topData {
      width: 100%;
      height: 5%;
      // background-color: pink;
    }
  }
}
</style>
