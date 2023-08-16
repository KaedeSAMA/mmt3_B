<template>
  <div class="big">
    <div class="title">当前组织报名情况</div>
    <hr />
    <div class="main">
      <div class="fistLine">
        截止今日报名总人数：&nbsp;{{ myData.totalNum }}人
      </div>
      <div class="secondLine">
        第一志愿报名当前组织人数：&nbsp;{{ myData.firstChoiceNum }}人
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { beforeNumData } from '@/api/interviewBoard/index';
import bus from 'vue3-eventbus';

let myDepartmentId = ref(0);
bus.on('beforeMyDepartmentId', (data: any) => {
  myDepartmentId.value = data;
});

let myData: any = ref({
  totalNum: 77,
  firstChoiceNum: 34
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
  height: 30%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  border: 1px black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .title {
    height: 15%;
    margin: 4% 0 1% 6%;
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
    margin: 0 0 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .fistLine {
      font-size: 1.5em;
      font-weight: 800;
      margin-bottom: 3%;
    }
    .secondLine {
      color: gray;
      margin-bottom: 4%;
    }
  }
}
</style>
