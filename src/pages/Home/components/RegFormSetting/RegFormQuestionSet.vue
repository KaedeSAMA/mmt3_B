<template>
  <!-- 本组件用于设置宣传报名表 -->
  <div class="regfrom-question-set-root">
    <!-- 这些组件由src/store/regForm.ts链接起来一起工作 -->
    <AddQuestion />
    <QuestionPreview />
    <EditQuestion />
  </div>
</template>
<script setup lang="ts">
import AddQuestion from './AddQuestion.vue';
import QuestionPreview from './QuestionPreview.vue';
import EditQuestion from './EditQuestion.vue';
</script>
<style lang="scss">
.regfrom-question-set-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
