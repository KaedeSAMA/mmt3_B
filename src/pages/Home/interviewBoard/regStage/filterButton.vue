<template>
  <div>
    <el-row
      type="flex"
      justify="start"
      style="flex-wrap: wrap; margin-left: 3px"
    >
      <el-button
        style="margin: 0 20px 0 0"
        ref="Btn"
        plain
        size="default"
        v-for="item in myData.departments"
        :key="item.departmentId"
        :id="item.departmentId"
        :class="item.departmentId == 0 ? 'clBtn' : ''"
        >{{ item.departmentName }}</el-button
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getAllDepartment } from '@/api/interviewBoard/index';
let myData: any = {
  num: 3,
  departments: [
    {
      departmentId: 0,
      departmentName: '全部'
    },
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
};

//挂载时向后端发起请求获取用户数据
onMounted(async () => {
  const data = await getAllDepartment();
  if (data) {
    console.log('getAllDepartment');
    console.log(data);
    myData = data;
  }
});
</script>
<style scoped lang="scss">
.clBtn {
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>
