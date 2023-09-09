<template>
  <el-card class="mainbox" shadow="always">
    <div class="top">
      <div class="left">
        <div class="condition">
          <div class="tip">按部门查看</div>
          <el-radio-group v-model="department" class="radioGroup">
            <el-scrollbar class="check">
              <el-radio :label="0" border>全部</el-radio>
              <el-radio
                v-for="(item, index) in departmentList"
                :key="index"
                :label="item.departmentId"
                border
                >{{ item.departmentName }}</el-radio
              >
            </el-scrollbar>
          </el-radio-group>
        </div>
        <div class="condition">
          <div class="tip">按场地查看</div>
          <el-radio-group v-model="place" class="radioGroup">
            <el-scrollbar class="check">
              <el-radio :label="0" border>全部</el-radio>
              <el-radio
                v-for="(item, index) in placeList"
                :key="index"
                :label="item.id"
                border
                >{{ item.name }}</el-radio
              >
            </el-scrollbar>
          </el-radio-group>
        </div>
      </div>
      <div class="right">
        <div class="show">
          <div class="tip">展示内容</div>
          <el-select
            v-model="result"
            class="m-2 selectResult"
            placeholder="面试结果"
          >
            <el-option
              v-for="item in resultDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="show">
          <el-button type="primary" @click="check" class="checkbtn"
            >根据面试结果一键勾选</el-button
          >
        </div>
      </div>
    </div>
    <hr
      style="
        margin-top: 10px;
        background-color: #e4e7ed;
        height: 1px;
        border: none;
      "
    />
    <div class="tableBox">
      <div class="search">
        <span style="font-size: large; font-weight: 700"
          >当前面试轮次：{{ round }}面</span
        >
        <el-button
          type="primary"
          @click="arrange"
          style="float: right; margin-left: 10px"
          >一键安排</el-button
        >
        <el-input
          v-model="input"
          placeholder="请输入关键字"
          clearable
          :prefix-icon="Search"
          style="width: 200px; float: right"
        />
        <span class="refresh" @click="refresh">
          <!-- <i-ep-RefreshRight size="100"></i-ep-RefreshRight> -->
          <el-icon size="20" class="refreshIcon"><RefreshRight /></el-icon>
          实时刷新</span
        >
      </div>
      <el-table
        ref="multipleTableRef"
        stripe
        :data="tableData"
        class="table"
        style="width: 100%"
        :header-cell-style="{
          color: '#409eff',
          fontSize: '15px',
          textAlign: 'center'
        }"
        @selection-change="handleSelectionChange"
        @filter-change="informFilter"
        @sort-change="changeTableSort"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="简历及评价" align="center" width="100">
          <template #default="scope">
            <el-icon size="25" @click="viewResume(scope.row)" class="document"
              ><Document
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
          property="studentId"
          label="学号"
          width="120"
          align="center"
        />
        <el-table-column property="name" label="姓名" align="center" />
        <el-table-column
          property="className"
          label="班级"
          width="120"
          align="center"
        />
        <el-table-column
          prop="state"
          label="面试结果"
          align="center"
          width="120"
        >
          <template #default="scope">
            <el-tag class="ml-2" :type="colorCalculate(scope.row.state)">{{
              scope.row.state
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="messageState"
          label="通知情况"
          align="center"
          width="120"
          column-key="inform"
          :filters="[
            { text: '已通知', value: '2' },
            { text: '已安排未通知', value: '1' },
            { text: '未安排', value: '0' }
          ]"
        >
          <template #default="scope">
            <el-tag
              class="ml-2"
              :type="colorCalculate(scope.row.messageState)"
              >{{ scope.row.messageState }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          property="0"
          label="面试总得分"
          align="center"
          width="130"
          sortable="custom"
        />
        <el-table-column
          v-for="(item, index) in title"
          :key="index"
          :prop="item.label.toString()"
          :label="item.question"
          align="center"
          width="100"
        />
      </el-table>
      <div class="botton">
        <div class="botton-left">
          {{ allNum }}条数据，共{{ pagesNUmTotal }}页
        </div>
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
    </div>
    <div class="echarts">
      <div class="tip">面试结果总览</div>
      <div id="firstEcharts" :style="{ width: '100%', height: '23vh' }"></div>
      <div style="font-size: 15px; color: #9f9f9f; text-align: center">
        共{{ peopleNum[0] }}人
      </div>
      <div class="tip" style="display: inline-block">通过人数查看</div>
      <span class="change" @click="change">切换</span>
      <div id="secondEcharts" :style="{ width: '100%', height: '23vh' }"></div>
      <div style="font-size: 15px; color: #9f9f9f; text-align: center">
        {{ text }}
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dataBoardMeaasge } from '@/store/index';
import { Search, Document, RefreshRight } from '@element-plus/icons-vue';
import { ElTable } from 'element-plus';
import * as echarts from 'echarts';
import 'echarts';
import {
  getDepartment,
  getPlace,
  getPie,
  getTable,
  arrangeStu
} from '@/api/interviewReply';
const emit = defineEmits(['change']);
onMounted(() => {});
// 获取部门
type departmentType = Array<{
  departmentId: number;
  departmentName: string;
}>;
const departmentList = ref<departmentType>([]);
const getDepartmentData = async () => {
  const res = await getDepartment();
  departmentList.value = res?.departments as unknown as departmentType;
};
// 当前面试轮次
const round = ref(0);
// 获取地点
type placeType = Array<{
  id: number;
  name: string;
  departmentId: number;
  round: number;
}>;
const placeList = ref<placeType>([]);
const getPlaceData = async () => {
  const res = await getPlace();
  round.value = res?.round as number;
  if (res?.addressPoList.length !== 0) {
    placeList.value = res?.addressPoList as unknown as placeType;
  }
};
// 选择的部门和场地
const department = ref(0);
const place = ref(0);
// 面试结果
const result = ref(0);
const resultDate = ref([
  {
    value: 0,
    label: '展示全部'
  },
  {
    value: 3,
    label: '仅展示通过'
  },
  {
    value: 2,
    label: '仅展示不通过'
  }
]);
// 搜索框
const input = ref('');

function colorCalculate(state: string) {
  switch (state) {
    case '通过':
      return 'success';
    case '一面通过':
      return 'success';
    case '二面通过':
      return 'success';
    case '三面通过':
      return 'success';
    case '四面通过':
      return 'success';
    case '已通知':
      return 'success';
    case '失败':
      return 'danger';
    case '未通过':
      return 'danger';
    case '未安排':
      return 'danger';
    case '未通知':
      return 'danger';
    case '一面失败':
      return 'danger';
    case '二面失败':
      return 'danger';
    case '三面失败':
      return 'danger';
    case '四面失败':
      return 'danger';
    default:
      return 'warning';
  }
}
// 通知结果筛选
const messagestate = ref([]);
const informFilter = (filters: any) => {
  messagestate.value = filters.inform;
};
// 得分排序
const sort: { value: boolean | null } = { value: null };
const changeTableSort = (column: any) => {
  switch (column.order) {
    case 'ascending':
      sort.value = true;
      break;
    case 'descending':
      sort.value = false;
      break;
    default:
      sort.value = null;
  }
  getTableData();
  getSelect();
};
// 去简历页面按钮
const viewResume = (row: any) => {
  const store = dataBoardMeaasge();
  store.setId(row.id);
  store.setId2(row.id);
  emit('change', false);
};
// 当前页
const currentPage = ref(1);
// 共xx页
const pagesNUmTotal = ref(0);
// 总条数
const allNum = ref(0);
// 改变页
const handleCurrentChange = () => {
  getTableData();
  getSelect();
};
// 饼图数据1
const firstData = ref({
  pass: 0,
  fail: 0,
  undetermined: 0,
  notOperated: 0
});
// 饼图数据2
const secondEcharts = ref([{ id: 0, num: 0, content: '无数据' }]);
// 饼图数据3
const thirdEcharts = ref([{ id: 0, num: 0, content: '无数据' }]);
// 转变饼图数据属性名
type old = {
  id: number;
  content: string;
  num: number;
};
// 饼图数据转换
function objArrtransArr(oldval: Array<old>) {
  return oldval.map((element: old) => {
    const obj = {
      value: element.num,
      name: element.content
    };
    return obj;
  });
}
type echartsType = Array<{ value: number; name: string }>;
// Echarts生成函数
function initChart(box: string, data: echartsType) {
  const chart = echarts.init(document.getElementById(box));
  // 把配置和数据放这里
  chart.setOption(
    {
      tooltip: {
        trigger: 'item'
      },
      color: ['#91cd77', '#ef6567', '#5470c6', '#f9c956'],
      series: [
        {
          type: 'pie',
          radius: '80%',
          label: {
            position: 'inner'
          },
          data
        }
      ]
    },
    true
  );
  return chart;
}
// 获取饼图数据
const peopleNum = ref([0, 0, 0]);
const text = ref('按场地分，共' + peopleNum.value[1] + '人');
let echart2: any;
const getpie = async () => {
  const res = await getPie();
  firstData.value.pass = res?.pieChatAll.resultOverview.pass.num as number;
  firstData.value.fail = res?.pieChatAll.resultOverview.fail.num as number;
  firstData.value.undetermined = res?.pieChatAll.resultOverview.undetermined
    .num as number;
  firstData.value.notOperated = res?.pieChatAll.resultOverview.notOperated
    .num as number;
  peopleNum.value[0] = res?.pieChatAll.resultOverview.num as number;
  peopleNum.value[1] = res?.pieChatAll.departmentDivide.num as number;
  text.value = '按场地分，共' + peopleNum.value[1] + '人';
  peopleNum.value[2] = res?.pieChatAll.addressDivide.num as number;
  if (res?.pieChatAll.addressDivide.divide) {
    secondEcharts.value = res?.pieChatAll.addressDivide.divide as Array<old>;
  }
  if (res?.pieChatAll.departmentDivide.divide) {
    thirdEcharts.value = res?.pieChatAll.departmentDivide.divide as Array<old>;
  }
  // 渲染饼图
  const firstEcharts = ref([
    { value: firstData.value.pass, name: '通过' },
    { value: firstData.value.fail, name: '淘汰' },
    { value: firstData.value.undetermined, name: '待定' },
    { value: firstData.value.notOperated, name: '未操作' }
  ]);

  const echart1 = initChart('firstEcharts', firstEcharts.value);
  echart2 = initChart('secondEcharts', objArrtransArr(secondEcharts.value));
  window.onresize = function () {
    // 自适应大小
    echart1.resize();
    echart2.resize();
  };
};
//
type item = {
  label: number;
  question: string;
};
const title = ref<Array<item>>();
// 已选择的数据
const checkId = ref<Array<number>>([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const handleSelectionChange = (val: any) => {
  checkId.value = val.map((item: any) => {
    return item.id;
  });
};
// 选择某一条
const check = () => {
  multipleTableRef.value!.toggleAllSelection();
};
// 表格数据
const tableData = ref([]);
// 获取表格
const getTableData = async () => {
  const data = ref({
    page: currentPage.value,
    departmentId: department.value === 0 ? null : department.value,
    addressId: place.value === 0 ? null : place.value,
    isSort: sort.value,
    stateList: result.value === 0 ? [] : [result.value],
    messageStateList: messagestate.value,
    search: input.value
  });
  const res = await getTable(data.value);
  allNum.value = res?.allNum as number;
  pagesNUmTotal.value = res?.pageAll as number;
  title.value = res?.title.slice(1) as Array<item>;
  const a = res?.tableData;
  // @ts-ignore
  for (const item1 of a) {
    for (const item2 of item1.score) {
      // @ts-ignore
      item1[item2.label] = item2.score as string;
    }
  }
  // @ts-ignore
  tableData.value = a as unknown;
  getSelect();
};
watch([department, place, result, messagestate], () => {
  getTableData();
});
let timeout: any;
watch(input, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log('66');
    getTableData();
  }, 2200);
});
// 初始化：获取部门和场地 饼图 表格
getDepartmentData();
getPlaceData();
getpie();
getTableData();
// 切换饼图
const show = ref(true);
const change = () => {
  show.value = !show.value;
  echart2.dispose();
  if (show.value) {
    text.value = `按场地分，共${peopleNum.value[1]}人`;
    echart2 = initChart('secondEcharts', objArrtransArr(secondEcharts.value));
  } else {
    text.value = `按部门分，共${peopleNum.value[2]}人`;
    echart2 = initChart('secondEcharts', objArrtransArr(thirdEcharts.value));
  }
};
// 实时刷新
function refresh() {
  currentPage.value = 1;
  getTableData();
}
// 勾选
const getSelect = async () => {
  // 从后台获取已安排的
  const data = ref({
    page: currentPage.value,
    departmentId: department.value === 0 ? null : department.value,
    addressId: place.value === 0 ? null : place.value,
    isSort: sort.value,
    stateList: result.value === 0 ? [] : [result.value],
    messageStateList: [1],
    search: input.value
  });
  const res = await getTable(data.value);
  const check = res?.tableData;
  setTimeout(() => {
    check?.forEach((item1: any) => {
      multipleTableRef.value!.toggleRowSelection(
        tableData.value.find((item2: any) => {
          return item1.userId === item2.userId;
        }),
        true
      );
    });
  }, 0);
};
// 一键安排
const arrange = () => {
  arrangeStu(checkId.value);
};
</script>

<style scoped lang="scss">
.mainbox {
  width: 96%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-width: 1200px;
  min-height: 580px;
  @media (max-width: 1150px) {
    height: 96%;
  }
  .top {
    height: 100px;
    min-width: 1100px;
    .tip {
      float: left;
      font-size: large;
      line-height: 50px;
    }
    .left {
      height: 100px;
      width: 80%;
      float: left;
      .condition {
        height: 50px;
        width: 100%;
        .radioGroup {
          width: 87%;
          height: 38px;
          margin-top: 10px;
          margin-left: 15px;
        }
        .check {
          white-space: nowrap;
        }
      }
    }
    .right {
      height: 100px;
      width: 20%;
      min-width: 230px;
      float: right;
      .show {
        height: 50px;
        .selectResult {
          width: 140px;
          margin-left: 20px;
          margin-top: 10px;
        }
        .checkbtn {
          margin-top: 10px;
          float: left;
          margin-left: 30px;
        }
      }
    }
  }
  .tableBox {
    display: inline-block;
    height: 64vh;
    width: 78%;
    min-width: 900px;
    vertical-align: top;
    .search {
      margin-top: 15px;
      .refresh {
        float: right;
        margin-right: 20px;
        .refreshIcon {
          top: 4px;
        }
      }
      .refresh:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
    .table {
      height: 52vh;
      margin-top: 15px;
      min-height: 320px;
      .document:hover {
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
      margin-top: 8px;
      .botton-left {
        font-size: 14px;
        margin-left: 10px;
      }
      // .botton-right {
      //   width: 200px;
      //   background-color: red;
      // }
    }
  }
  .echarts {
    display: inline-block;
    height: 64vh;
    width: 22%;
    min-height: 430px;
    .tip {
      font-size: large;
      margin-top: 15px;
      margin-left: 50px;
    }
    .change {
      margin-left: 10px;
      color: #409eff;
    }
    .change:hover {
      cursor: pointer;
      border-bottom: 1px solid #278ef4;
    }
  }
}
</style>
