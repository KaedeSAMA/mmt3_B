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
              <el-button
                type="primary"
                :icon="Plus"
                @click="addMemberHandler()"
              />
            </div>
          </template>
        </el-table-column>
        <!--  学号列  -->
        <el-table-column prop="studentId" label="学号" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.studentId
            }}</span>
            <el-input
              v-model="scope.row.studentId"
              type="text"
              placeholder="学号"
              v-else
            />
          </template>
        </el-table-column>
        <!--  姓名列  -->
        <el-table-column prop="name" label="姓名" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{ scope.row.name }}</span>
            <el-input
              v-model="scope.row.name"
              type="text"
              placeholder="姓名"
              v-else
            />
          </template>
        </el-table-column>
        <!--  权限列  -->
        <el-table-column prop="permission" label="用户权限" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.permission
            }}</span>
            <el-input
              v-model="scope.row.permission"
              type="text"
              placeholder="用户权限"
              v-else
            />
          </template>
        </el-table-column>
        <!--  手机号列  -->
        <el-table-column prop="phone" label="手机号" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.phone
            }}</span>
            <el-input
              v-model="scope.row.phone"
              type="text"
              placeholder="手机号"
              v-else
            />
          </template>
        </el-table-column>
        <!-- 密码列 -->
        <el-table-column prop="password" label="密码" align="center">
          <template #default="scope">
            <span v-if="scope.row.tableStatus === 0">{{
              scope.row.password
            }}</span>
            <el-input
              v-model="scope.row.password"
              type="text"
              placeholder="密码"
              v-else
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 确认更改的对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="confirmHandleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { DeleteFilled, Edit, Plus } from '@element-plus/icons-vue';
import { TaddAssociationMember } from '@/api/types/dataType';
import {
  addAssociationMember,
  getAllAssociationMember
} from '@/api/accountManage/index';
import { ElMessage, ElMessageBox } from 'element-plus';
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
    studentId: '学号',
    name: '姓名',
    permission: '权限',
    phone: '手机号',
    password: '密码',
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
// 点击编辑icon触发的更改行状态函数
const changeEditing = (row: any) => {
  console.log(row.id);
  // 在tableData中找到这个id对应的数据，修改其在表格中的展示状态
  tableData.value.map((item) => {
    if (item.id === row.id) {
      // 找到了id对应的数据⬇️
      if (item.tableStatus === 0) {
        item.tableStatus = 1;
      } else {
        confirmChange(row);
      }
    }
    return null;
  });
  console.log(tableData.value);
};
// 确认更改账户信息框的函数
const confirmChange = (row: any) => {
  ElMessageBox.confirm('确定要修改成员的信息吗?', '警告', {
    confirmButtonText: '确认修改',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      tableData.value.map((item) => {
        console.log(row.id);
        if (item.id === row.id) {
          // 这里后续接上请求接口，成功则改变状态
          item.tableStatus = 0;
          ElMessage({
            type: 'success',
            message: '修改成功'
          });
        }
        return null;
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '修改已取消'
      });
    });
};
// 点击添加按钮的处理函数，功能：添加新账号
const addMemberHandler = async () => {
  // 1.收集第一行的输入框数据
  const data: TaddAssociationMember = {
    studentId: tableData.value[0].studentId,
    name: tableData.value[0].name,
    permission: tableData.value[0].permission,
    phone: tableData.value[0].permission,
    passwd: tableData.value[0].password
  };
  // 2.向后端发送添加账号的请求
  const res = await addAssociationMember(data);
  console.log(res);
  // 2.1 判断请求结果，成功则在本地表格数据中推入新的一项，并重置第一项
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
