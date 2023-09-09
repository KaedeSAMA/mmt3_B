<template>
  <currentInterview v-if="isShow" @change="change"></currentInterview>
  <eAndR v-else @change="change"></eAndR>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import currentInterview from './currentInterview.vue';
import eAndR from './eAndR.vue';
const isShow = ref(true);
const change = (show: boolean) => {
  isShow.value = show;
};
</script>

<style scoped></style>
