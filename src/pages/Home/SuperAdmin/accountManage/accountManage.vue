<template lang="">
  <div class="account-manage-root">
    <el-card class="table-card">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="选项" align="center">
          <template #default="scope">
            <!-- // ### 使用tableStatus确定表格状态，0为默认显示，1为编辑，2为第一行特殊  -->
            <div
              v-if="scope.row.tableStatus === 0 || scope.row.tableStatus === 1"
            >
              <el-icon :size="20" :class="{ icon: true }"
                ><DeleteFilled
              /></el-icon>
              <el-icon :size="20" class="icon" @click="changeEditing(scope.row)"
                ><Edit
              /></el-icon>
            </div>
            <div v-if="scope.row.tableStatus === 2">
              <el-button type="primary" :icon="Plus" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="studentId" label="学号" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.studentId
            }}</span>
            <el-input type="text" v-else />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{ scope.row.name }}</span>
            <el-input type="text" v-else />
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="用户权限" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.permission
            }}</span>
            <el-input type="text" v-else />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.phone
            }}</span>
            <el-input type="text" v-else />
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.password
            }}</span>
            <el-input type="text" v-else />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { DeleteFilled, Edit, Plus } from '@element-plus/icons-vue';
import { getAllAssociationMember } from '@/api/accountManage/index';
// 处理后用于注入表格的数据类型
type TTableData = {
  id: number;
  studentId: string;
  name: string;
  permission: string;
  phone: string;
  password: string;
  tableStatus: number;
};
// 初始化注入表格的数据
const tableData: Ref<TTableData[]> = ref([
  {
    id: 0,
    studentId: '加载中',
    name: '加载中',
    permission: '加载中',
    phone: '加载中',
    password: '*****',
    tableStatus: 2
  }
]);
// 挂载时获取数据,并对数据进行修改
onMounted(async () => {
  const data = await getAllAssociationMember(1);
  if (data) {
    tableData.value = [
      {
        id: -1,
        studentId: '',
        name: '',
        permission: '',
        phone: '',
        password: '',
        tableStatus: 2
      },
      ...data.memberInfoDataList.map((item) => {
        return {
          ...item,
          password: '******',
          tableStatus: 0
        };
      })
    ];
    console.log(tableData);
  }
});
const changeEditing = (val) => {
  console.log(val);
};
</script>
<style lang="scss">
.account-manage-root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-card {
  width: 95%;
  height: 95%;
}
.icon :hover {
  color: #409efc;
}
</style>
