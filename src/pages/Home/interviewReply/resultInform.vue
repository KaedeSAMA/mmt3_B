<template>
  <el-card class="mainbox1" shadow="always">
    <div class="tlt">结果通知</div>
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="通过">{{ success }}</el-tab-pane>
      <el-tab-pane label="失败">{{ fail }}</el-tab-pane>
    </el-tabs>
    <div class="bottom">
      <div class="checkNum">
        当前已选<span style="color: #1087fd">{{ num }}</span
        >人
      </div>
      <el-button text @click="dialogTableVisible = true"> 查看 </el-button>
      <el-button type="primary" style="float: right" @click="sendMessage"
        >一键发送通知</el-button
      >
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
      <el-table-column property="state" label="面试结果" align="center" />
      <!-- <el-table-column label="简历及评价" align="center">
        <template #default="scope">
          <el-icon size="25" @click="viewResume(scope.row)" class="document"
            ><Document
          /></el-icon>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pagination">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="pageNum"
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
    <div class="number">已通知总人数:{{ notifiedNum }}/{{ allNum }}</div>
    <div class="number">未通知人数：{{ NotNotifiedNum }}</div>
  </el-card>
</template>

<script setup lang="ts">
// import { Document } from '@element-plus/icons-vue';
import {
  getMessage,
  getTable,
  getProgress,
  sendData
} from '@/api/interviewReply';
const success = ref('');
const fail = ref('');
onMounted(async () => {
  const res = await getMessage();
  success.value = res?.messageSuccessTemplate as string;
  fail.value = res?.messageFailTemplate as string;
});
// 弹出框的显示与隐藏
const dialogTableVisible = ref(false);
// 查看简历
// const viewResume = (row: any) => {
//   console.log(row);
// };
// 弹出框分页
const handleCurrentChange = () => {
  console.log(11);
};
// 当前页
const currentPage = ref(1);
const pageNum = ref(0);
// 选择框所选内容
const value = ref(2);
// 选择框
const options = [
  {
    value: 2,
    label: '全部'
  },
  {
    value: 0,
    label: '未通过'
  },
  {
    value: 1,
    label: '通过'
  }
];
// 进度
const progressStatus: any = ref('');
const percentage = ref(0);
const format = (percentage: any) => {
  switch (percentage) {
    case 100:
      progressStatus.value = 'success';
      return '已全部发送';
    case 0:
      return `0%`;
    default:
      return `${percentage}%`;
  }
};
const notifiedNum = ref(0);
const allNum = ref(0);
const NotNotifiedNum = ref(0);
// 获取通知进度
const isSend = ref(false);
const getInform = async (status: number) => {
  const res = await getProgress(status);
  if (res.code !== '00000') {
    clearInterval(timer);
    return;
  }
  if (res.data?.notifiedNum !== null && res.data?.allNum !== null) {
    percentage.value = Math.floor(
      ((res.data?.notifiedNum as number) / (res.data?.allNum as number)) * 100
    );
  } else {
    percentage.value = 0;
  }
  notifiedNum.value = res.data?.notifiedNum ? res.data?.notifiedNum : 0;
  allNum.value = res.data?.allNum ? res.data?.allNum : 0;
  NotNotifiedNum.value = res.data?.NotNotifiedNum
    ? res.data?.NotNotifiedNum
    : 0;
};
let timer: any;
const time = () => {
  clearInterval(timer);
  timer = setInterval(function () {
    getInform(value.value);
  }, 2000);
};
watch(
  value,
  () => {
    getInform(value.value);
    if (isSend.value) {
      time();
    }
  },
  { immediate: true }
);
watch(
  percentage,
  () => {
    if (percentage.value === 100) {
      isSend.value = false;
      clearInterval(timer);
    }
  },
  { immediate: true }
);
// 发送数据的列表
const sendSuccessList = ref<
  Array<{
    interviewId: number;
    userId: number;
  }>
>();
const sendFailList = ref<
  Array<{
    interviewId: number;
    userId: number;
  }>
>();
// 已选人
type table = Array<{
  id: number;
  userId: number;
  studentId: string;
  name: string;
  className: string;
  score: {
    label: number;
    score: number;
  }[];
  stateId: number;
  state: string;
  messageStateId: number;
  messageState: string;
}>;
const gridData = ref<table>([]);
const num = ref(0);
// 已选人
const getSelect = async () => {
  // 从后台获取已安排的
  const data = ref({
    page: currentPage.value,
    departmentId: null,
    addressId: null,
    isSort: false,
    stateList: [],
    messageStateList: [1],
    search: ''
  });
  const res = await getTable(data.value);
  gridData.value = res?.tableData as table;
  num.value = res?.allNum as number;
  pageNum.value = res?.pageAll as number;
  sendSuccessList.value = res?.tableData
    // eslint-disable-next-line array-callback-return
    .map((item) => {
      if (item.stateId === 3)
        return { interviewId: item.id, userId: item.userId };
    })
    .filter((item) => item !== undefined) as Array<{
    interviewId: number;
    userId: number;
  }>;
  sendFailList.value = res?.tableData
    // eslint-disable-next-line array-callback-return
    .map((item) => {
      if (item.stateId === 2)
        return { interviewId: item.id, userId: item.userId };
    })
    .filter((item) => item !== undefined) as Array<{
    interviewId: number;
    userId: number;
  }>;
};
getSelect();
// 发送数据
const sendMessage = () => {
  const data1 = ref({
    messageSendPoList: sendSuccessList.value as Array<{
      interviewId: number;
      userId: number;
    }>,
    message: success.value
  });
  const data2 = ref({
    messageSendPoList: sendFailList.value as Array<{
      interviewId: number;
      userId: number;
    }>,
    message: fail.value
  });
  if (
    (sendSuccessList.value?.length as number) > 0 &&
    (sendFailList.value?.length as number) > 0
  ) {
    sendData(data1.value);
    sendData(data2.value);
    isSend.value = true;
    time();
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
  width: 70%;
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
