<template>
  <el-card class="mainbox" shadow="always">
    <div class="top">
      <div class="title_1">当前面试进度:</div>
      <div class="choose">
        <el-button class="refresh" type="primary" plain @click="refresh"
          ><el-icon size="18" style="margin-right: 5px" class="refreshIcon"
            ><RefreshRight /></el-icon
          >刷新页面</el-button
        >
        <el-select
          v-model="InterviewLocation"
          class="m-2 seclect"
          placeholder="选择面试地点"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <el-scrollbar class="progress">
      <div class="progress-item" v-for="(item, index) in progress" :key="index">
        <div class="progress-item-top">
          <el-progress
            :text-inside="true"
            :stroke-width="15"
            :percentage="Math.floor((item.finished / item.total) * 100) || 0"
            style="width: 180px"
          />
          <span class="number"
            >{{ item.finished || 0 }} / {{ item.total || 0 }}</span
          >
        </div>
        <div class="progress-item-botton">
          <!-- 如果是100说明无数据 小于10添0 -->
          <span
            >{{
              item.time === 100
                ? '00'
                : item.time % 24 && item.time % 24 < 10
                ? '0' + (item.time % 24)
                : item.time % 24
            }}:00</span
          >
          <span class="last"
            >{{
              item.time + 1 === 101
                ? '00'
                : (item.time + 1) % 24 && item.time % 24 < 10
                ? '0' + ((item.time + 1) % 24)
                : (item.time + 1) % 24
            }}:00</span
          >
        </div>
      </div>
    </el-scrollbar>
    <div class="tip">注：分数表示已面试人数/该时段内面试人数</div>
    <div class="title_2">
      <div class="title_2_left">面试人员名单：</div>
      <div class="title_2_right">
        <el-button type="primary" class="signPic" @click="getcodeimg"
          >点击生成签到二维码</el-button
        >
        <el-input
          v-model="search"
          class="w-50 m-2 search"
          placeholder="请输入关键字"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="签到二维码"
      width="30%"
      class="dialog"
    >
      <div class="qrcode" @click="reGetQrcode">
        <img :src="qrcode" width="340" height="340" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <el-table
      :data="tableData"
      stripe
      class="table"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{
        color: '#409eff',
        fontSize: '15px',
        textAlign: 'center'
      }"
    >
      <el-table-column label="简历及评价" width="120">
        <template #default="scope">
          <el-icon size="23" class="doucument" @click="goer(scope.row)"
            ><Document
          /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="studentId" label="学号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="className" label="班级" width="150" />
      <el-table-column prop="department" label="面试部门" />
      <el-table-column prop="time" label="面试时间" width="150" />
      <el-table-column prop="place" label="面试地点" />
      <el-table-column
        prop="issigned"
        label="签到情况"
        :formatter="formatterSign"
      />
      <el-table-column
        prop="status"
        label="面试情况"
        :formatter="formatterStatus"
      />
    </el-table>
    <div class="botton">
      <div class="botton-left">共{{ pagesNUmTotal }}页</div>
      <div class="botton-right">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :page-count="pagesNUmTotal"
          :page-size="10"
          @current-change="handleCurrentChange"
          v-model:current-page="currentPage"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search, Document, RefreshRight } from '@element-plus/icons-vue';
import {
  getPlace,
  getProgress,
  getMessage,
  getqrcode
} from '@/api/oninterview';
import { dataBoardMeaasge } from '@/store/index';
// 接收控制显示与隐藏的数据
const emit = defineEmits(['change']);
// 二维码弹出框
const dialogVisible = ref(false);
// 面试地点
const InterviewLocation = ref(0);
// 面试地点选择
const options = ref([
  {
    id: 0,
    name: '无数据'
  }
]);
type place = Array<{
  id: number;
  name: string;
}>;
// 进度条
type progresstype = Array<{
  time: number;
  total: number;
  finished: number;
}>;
const progress = ref([
  {
    time: 100,
    total: 0,
    finished: 0
  }
]);
// 获取进度条
const togetProgress = async () => {
  const res = await getProgress(InterviewLocation.value);
  if ((res?.bars.length as number) > 0) {
    progress.value = res?.bars as unknown as progresstype;
  }
};
// 当前页
const currentPage = ref(1);
// 搜素内容
const search = ref('');
// 共xx页
const pagesNUmTotal = ref(0);
// xx条记录
// const record = ref(100);
// 表格数据
type table = Array<{
  id: number;
  cId: number;
  studentId: string;
  name: string;
  className: string;
  department: string;
  time: string;
  place: string;
  issigned: boolean;
  status: number;
}>;
const tableData = ref<table>();
const formatterSign = (row: any) => {
  return row.issigned === true ? '已签到' : '未签到';
};
const formatterStatus = (row: any) => {
  return row.status === 0 ? '未开始' : row.status === 1 ? '面试中' : '已结束';
};
// 获取表格
const togetMessage = async () => {
  const res = await getMessage(
    InterviewLocation.value,
    currentPage.value,
    search.value
  );
  // Object.assign(pagesNUmTotal, res?.pages);
  pagesNUmTotal.value = res?.pages as number;
  tableData.value = res?.interviewees as table;
};
// 获取面试地点、进度条、表格
(async function getPlaces() {
  const res = await getPlace();
  if (res) {
    options.value = res.places as unknown as place;
    InterviewLocation.value = res.places[0].id;
    togetProgress();
    togetMessage();
  }
})();
// 改变页
const handleCurrentChange = () => {
  togetMessage();
};
// 去简历界面
const goer = (row: any) => {
  const store = dataBoardMeaasge();
  store.setId2(row.cid);
  store.setId(row.id);
  emit('change', false);
};
// 实时刷新
const refresh = () => {
  if (InterviewLocation.value !== 0) {
    togetProgress();
    togetMessage();
    ElMessage({
      message: '刷新成功',
      type: 'success'
    });
  } else {
    ElMessage({
      message: '刷新失败',
      type: 'warning'
    });
  }
};
//
const qrcode = ref('');
// 获取二维码
const getcodeimg = async () => {
  dialogVisible.value = true;
  const res = await getqrcode();
  qrcode.value = 'data:image/png;base64,' + res;
};
// 点击二维码刷新二维码
const reGetQrcode = async () => {
  const res = await getqrcode();
  qrcode.value = 'data:image/png;base64,' + res;
  ElMessage({
    message: '二维码已刷新',
    type: 'success'
  });
};
</script>

<style scoped lang="scss">
.mainbox {
  width: 96%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-width: 620px;
  min-height: 590px;
  @media (max-width: 1150px) {
    height: 96%;
  }
  .top {
    height: 6vh;
    line-height: 6vh;
    vertical-align: top;
    display: flex;
    justify-content: space-between;
    min-height: 42px;
    .title_1 {
      font-size: 25px;
      font-weight: bold;
    }
    .choose {
      position: relative;
      width: 400px;
      .seclect {
        width: 200px;
        float: right;
      }
      .refresh {
        float: left;
        width: 150px;
        font-size: 15px;
      }
    }
  }
  .progress {
    width: 100%;
    height: 6vh;
    white-space: nowrap;
    margin-top: 10px;
    min-height: 42px;
    .progress-item {
      display: inline-block;
      width: 250px;
      padding-right: 20px;
      .progress-item-top {
        display: flex;
        .number {
          margin-left: 6px;
          font-size: 12px;
          color: #9f9f9f;
        }
      }
      .progress-item-botton {
        margin-top: 1px;
        font-size: 14px;
        .last {
          margin-left: 110px;
        }
      }
    }
  }
  .tip {
    color: #9f9f9f;
    font-size: 14px;
  }
  .title_2 {
    margin-top: 10px;
    height: 5vh;
    min-height: 35px;
    .title_2_left {
      font-size: 25px;
      font-weight: bold;
      display: inline-block;
    }
    .title_2_right {
      width: 400px;
      float: right;
      .signPic {
        float: left;
        width: 150px;
      }
      .search {
        width: 200px;
        float: right;
      }
    }
  }
  :deep(.dialog) {
    width: 450px;
    min-width: 450px;
    .qrcode {
      width: 340px;
      height: 300px;
      margin: 0 auto;
    }
  }
  .table {
    height: 53vh;
    margin-top: 5px;
    min-height: 370px;
    .doucument:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .botton {
    color: #9f9f9f;
    display: flex;
    justify-content: space-between;
    height: 4vh;
    line-height: 3vh;
    margin-top: 10px;
    .botton-left {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
