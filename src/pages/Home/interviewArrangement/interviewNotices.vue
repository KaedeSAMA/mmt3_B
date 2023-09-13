<script setup lang="ts">
import { getSendMsg, sendMsg } from '@/api/interviewArrange';
import { MessageCheckResData } from '@/api/interviewArrange/types/res';
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

// 面试轮数
const round = ref(1);
const roundList = new Map([
  [1, '一面'],
  [2, '二面'],
  [3, '三面'],
  [4, '四面']
]);
// 是否可以发送通知
const canPutRequest = ref(true);
// 进度条提示
const progressStatus: any = ref('');
// 进度条百分比
const percentage = ref(0);
// 进度条格式化
const format = (percentage: any) => {
  switch (percentage) {
    case 100:
      progressStatus.value = 'success';
      return '已全部发送';
    default:
      return `${percentage}%`;
  }
};

// 获取的通知内容
const noticeInfo = ref<MessageCheckResData>({
  messageTemple: '测试假数据',
  allNum: 10,
  notifiedNum: 6,
  NotNotifiedNum: 4
});
// 选中的行
const select_row_arr = ref([]);
/**
 * @description: 获取通知内容
 */
const noticeInfoQuery = async () => {
  // 获取选中的行
  select_row_arr.value = JSON.parse(
    sessionStorage.getItem('select_row_arr') as string
  );
  // 获取面试轮数
  round.value = JSON.parse(sessionStorage.getItem('round') as string);
  // console.log(select_row_arr.value);

  if (select_row_arr.value == null || select_row_arr.value.length == 0) {
    canPutRequest.value = false;
  } else {
    // 有一个人不是已安排未通知messageSendStatus为2，就不可以发送
    canPutRequest.value = select_row_arr.value.every((item: any) => {
      return item.messageStatus == 2;
    });
  }

  const res = await getSendMsg({
    // round: 1
    round: round.value
  });
  console.log('info:============', res);
  noticeInfo.value = res;
  percentage.value =
    (noticeInfo.value.notifiedNum * 100) / noticeInfo.value.allNum;
  progressStatus.value = percentage.value === 100 ? 'success' : '';
};
onMounted(async () => {
  await noticeInfoQuery();
});

/**
 * @description: 一键发送通知
 */
const putSendNotice = async () => {
  //发送通知
  if (select_row_arr.value == null || select_row_arr.value.length == 0) {
    ElMessage.error('请手动选择或一键选择要发送通知的人');
    return;
  }

  const data = {
    // message: noticeInfo.value.messageTemple,
    messageSendPoList: select_row_arr.value.map((item: any) => {
      const diff_message = noticeInfo.value.messageTemple.split('$$');
      const merge_msg = Array.prototype
        .concat([
          diff_message[0],
          item.name,
          diff_message[1],
          item.nextTime,
          diff_message[2],
          item.nextPlace,
          diff_message[3]
        ])
        .join('');
      return {
        interviewId: item.id,
        userId: item.userId,
        // message: `${diff_message[0]}${item.name}${diff_message[1]}${item.nextTime}${diff_message[2]}${item.nextPlace}${diff_message[3]}`
        message: merge_msg
      };
    })
  };
  console.log(data);
  const res = await sendMsg(data);
  console.log(res);
  // 可能需要全部刷新一下
  await noticeInfoQuery();
};
</script>

<template>
  <el-card class="mainbox1" shadow="always">
    <div class="tlt">面试通知</div>
    <article class="tab">
      <p class="info-content-card">
        {{ noticeInfo?.messageTemple }}
      </p>
    </article>
    <div class="bottom">
      <div class="checkNum">
        当前已选<span style="color: #1087fd">{{ select_row_arr.length }}</span
        >人
      </div>
      <!-- <el-button text @click="dialogTableVisible = true"> 查看 </el-button> -->
      <el-button
        type="primary"
        style="float: right"
        @click="putSendNotice"
        :disabled="!canPutRequest"
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
    <div class="tlt">发送进度</div>
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
    <div class="number">
      已通知总人数:{{ noticeInfo?.notifiedNum }}/{{ noticeInfo?.allNum }}
    </div>
    <div class="number">
      未通知人数：{{
        noticeInfo?.NotNotifiedNum ??
        noticeInfo?.allNum - noticeInfo?.notifiedNum
      }}
    </div>
  </el-card>
</template>

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
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    height: 60vh;
    min-height: 410px;
    .info-content-card {
      height: 50%;
      padding: 10px;
      // border: 1px solid #909399;
      // border-radius: 10px;
      box-shadow: 0 0 4px #74767b;
    }
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
