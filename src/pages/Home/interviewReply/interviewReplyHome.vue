<template>
  <interviewReply v-if="isShow" @change="change"></interviewReply>
  <eAndR v-else @change="change"></eAndR>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import interviewReply from './interviewReply.vue';
import eAndR from '@/pages/Home/currentIntrview/eAndR.vue';
const isShow = ref(true);
const change = (show: boolean) => {
  isShow.value = show;
};
</script>

<style scoped></style>
