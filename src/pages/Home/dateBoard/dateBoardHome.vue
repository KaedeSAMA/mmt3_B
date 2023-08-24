<template>
  <dateBoard v-if="isShow" @change="change"></dateBoard>
  <evaluateAndResume v-else @change="change"></evaluateAndResume>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import evaluateAndResume from './evaluateAndResume.vue';
import dateBoard from './dateBoard.vue';
const isShow = ref(true);
const change = (show: boolean) => {
  isShow.value = show;
};
</script>

<style scoped></style>
