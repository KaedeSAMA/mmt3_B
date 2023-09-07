<template>
  <el-card class="mainbox1" shadow="always">
    <div class="tlt">结果通知</div>
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="通过">用户管理</el-tab-pane>
      <el-tab-pane label="失败">配置管理</el-tab-pane>
    </el-tabs>
    <div class="bottom">
      <div class="checkNum">
        当前已选<span style="color: #1087fd">100</span>人
      </div>
      <el-button text @click="dialogTableVisible = true"> 查看 </el-button>
      <el-button type="primary" style="float: right">一键发送通知</el-button>
    </div>
  </el-card>
  <el-dialog
    style="min-width: 500px"
    v-model="dialogTableVisible"
    title="通知查看"
    center
  >
    <div class="tip">增加和删除需要到对应功能模块进行，此处仅可以查看</div>
    <el-table :data="gridData" class="table" border>
      <el-table-column property="name" label="姓名" align="center" />
      <el-table-column property="result" label="面试结果" align="center" />
      <el-table-column label="简历及评价" align="center">
        <template #default="scope">
          <el-icon size="25" @click="viewResume(scope.row)" class="document"
            ><Document
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="100"
        @current-change="handleCurrentChange"
        v-model:current-page="currentPage"
        class="mt-4"
      />
    </div>
  </el-dialog>
  <el-card class="mainbox2" shadow="always">
    <div class="tlt">
      发送进度
      <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        style="width: 150px; float: right"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="progress">
      <el-progress
        type="circle"
        :width="300"
        :stroke-width="25"
        :percentage="percentage"
        :format="format"
        :status="progressStatus"
      />
    </div>
    <div class="number">已通知总人数:70/100</div>
    <div class="number">未通知人数：100</div>
  </el-card>
</template>

<script setup lang="ts">
import { Document } from '@element-plus/icons-vue';
// 已选人
const gridData = ref([
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  },
  {
    name: '王小虎',
    result: '通过'
  }
]);
// 弹出框的显示与隐藏
const dialogTableVisible = ref(false);
const viewResume = (row: any) => {
  console.log(row);
};
// 弹出框分页
const handleCurrentChange = () => {
  console.log(11);
};
// 当前页
const currentPage = ref(1);
// 选择框所选内容
const value = ref(0);
// 选择框
const options = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '未通过'
  },
  {
    value: 2,
    label: '通过'
  }
];
// 进度
const progressStatus: any = ref('');
const percentage = ref(70);
const format = (percentage: any) => {
  switch (percentage) {
    case 100:
      progressStatus.value = 'success';
      return '已全部发送';
    default:
      return `${percentage}%`;
  }
};
</script>

<style scoped lang="scss">
.tlt {
  font-size: 25px;
  font-weight: 700;
}
.mainbox1 {
  float: left;
  width: 60%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-height: 580px;
  @media (max-width: 1150px) {
    float: none;
    width: 96%;
    min-width: 590px;
    height: 96%;
  }
  .tab {
    margin-top: 20px;
    height: 60vh;
    min-height: 410px;
  }
  .bottom {
    height: 50px;
    margin-top: 10px;
    // background-color: rgb(186, 140, 140);
    .checkNum {
      display: inline-block;
      margin-left: 20px;
      font-size: 17px;
      font-weight: 700;
    }
  }
}
.tip {
  text-align: center;
  margin-top: -20px;
  font-size: 12px;
}
.table {
  margin: 0 auto;
  margin-top: 20px;
  height: 330px;
  width: 80%;
  .document:hover {
    color: #409eff;
    cursor: pointer;
  }
}
.pagination {
  height: 40px;
  display: flex;
  justify-content: center;
}
.mainbox2 {
  display: inline-block;
  width: 34%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-height: 580px;
  @media (max-width: 1150px) {
    float: none;
    width: 96%;
    height: 96%;
    min-width: 590px;
  }
  .progress {
    width: 300px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .number {
    font-size: 20px;
    text-align: center;
    color: #909399;
    margin-top: 30px;
    // background-color: red;
  }
}
</style>
