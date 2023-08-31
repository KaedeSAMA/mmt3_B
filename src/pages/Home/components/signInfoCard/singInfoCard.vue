<template>
  <div class="sign_details">
    <div class="title">{{ title }}</div>
    <div class="details_content" v-html="markContent"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';
const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  }
});
const markContent = computed(() => {
  const content = props.content ?? ''; // 判断是否为undefined
  return marked(content as string).replace(/\n/g, '<br/>');
});
</script>

<style scoped lang="scss">
.sign_details {
  width: 100%;
  min-height: 75px;
  background-color: #fff;
  border-radius: 10px;
  overflow-wrap: break-word;
  .details_content {
    padding: 0 20px;
    font-size: 12px;
    letter-spacing: 2px;
    padding-bottom: 10px;
    color: #3f536e;
    :v-deep(img) {
      width: 100%;
      display: block;
    }
  }
}

.title {
  border-left: 4px solid #3784ff;
  padding: 8px;
  margin: 7px 0;
  display: inline-block;
  font-weight: 600;
  color: #2c405a;
  font-size: 15px;
  letter-spacing: 2px;
}
</style>
