<template>
  <div class="big">
    <div class="title">当前部门报名情况</div>
    <hr />
    <div class="main">
      <div class="fistLine">
        截止今日报名总人数：&nbsp;{{ myData.totalNum }}人
      </div>
      <div class="secondLine">
        第一志愿报名当前部门人数：&nbsp;{{ myData.firstChoiceNum }}人
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { beforeNumData } from '@/api/interviewBoard/index';
import bus from 'vue3-eventbus';

let myDepartmentId = ref(1);
bus.on('beforeMyDepartmentId', (data: any) => {
  myDepartmentId.value = data;
});

let myData: any = ref({
  totalNum: 30,
  firstChoiceNum: 9
});

//挂载时向后端发起请求获取用户数据
onMounted(async () => {
  const data = await beforeNumData(myDepartmentId.value);
  if (data) {
    console.log('beforeNumData');
    console.log(data);
    // myData.value = data;
  }
});
</script>
<style scoped lang="scss">
.big {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  border: 1px black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
  .title {
    height: 18%;
    margin: 1% 0 0.2% 4%;
  }
  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(180, 180, 180, 0.2),
      rgba(180, 180, 180, 0.4),
      rgba(180, 180, 180, 0.2)
    );
  }
  .main {
    height: 70%;
    margin: 0 0 0 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .fistLine {
      font-size: 1.5em;
      font-weight: 800;
      margin-bottom: 2%;
    }
    .secondLine {
      color: gray;
    }
  }
}
</style>
