<template>
  <div>
    <el-row
      type="flex"
      justify="start"
      style="flex-wrap: wrap; margin-left: 3px"
    >
      <el-button
        @click="clDepartment($event)"
        style="margin: 0 20px 0 0"
        ref="Btn"
        plain
        size="default"
        key="0"
        id="0"
        class="depBtn clBtn"
        >全部</el-button
      >
      <el-button
        @click="clDepartment($event)"
        style="margin: 0 20px 0 0"
        ref="Btn"
        plain
        size="default"
        v-for="item in myData.departments"
        :key="item.departmentId"
        :id="item.departmentId"
        class="depBtn"
        >{{ item.departmentName }}</el-button
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getAllDepartment } from '@/api/interviewBoard/index';
import bus from 'vue3-eventbus';

let myData: any = ref({
  num: 3,
  departments: [
    {
      departmentId: 1,
      departmentName: '部门一'
    },
    {
      departmentId: 2,
      departmentName: '部门二'
    },
    {
      departmentId: 3,
      departmentName: '部门三'
    }
  ]
});

let myDepartmentId: number = 0;

function clDepartment(acDep: any) {
  let depBtn = document.querySelectorAll('.depBtn');
  depBtn.forEach((e) => {
    e.classList.remove('clBtn');
  });
  acDep.currentTarget.classList.add('clBtn');
  myDepartmentId = acDep.currentTarget.id;
  console.log(myDepartmentId);

  bus.emit('beforeMyDepartmentId', myDepartmentId);
}

//挂载时向后端发起请求获取用户数据
onMounted(async () => {
  const data = await getAllDepartment();
  if (data) {
    console.log('getAllDepartment');
    console.log(data);
    myData.value = data;
  }
});
</script>
<style scoped lang="scss">
.clBtn {
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>
