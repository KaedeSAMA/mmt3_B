<template>
  <el-card class="mainbox" shadow="always">
    <div class="top">
      <div class="left">
        <div class="condition">
          <div class="tip">按部门查看</div>
          <el-scrollbar class="check">
            <el-checkbox-group v-model="checkboxGroup">
              <el-checkbox label="Option1" border>全部</el-checkbox>
              <el-checkbox label="Option2" border>技术部</el-checkbox>
              <el-checkbox label="Option2" border>科技部</el-checkbox>
              <el-checkbox label="Option2" border>学习部</el-checkbox>
              <el-checkbox label="Option2" border>技术部</el-checkbox>
              <el-checkbox label="Option2" border>科技部</el-checkbox>
              <el-checkbox label="Option2" border>学习部</el-checkbox>
              <el-checkbox label="Option2" border>技术部</el-checkbox>
              <el-checkbox label="Option2" border>科技部</el-checkbox>
              <el-checkbox label="Option2" border>学习部</el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
        <div class="condition">
          <div class="tip">按场地查看</div>
          <el-scrollbar class="check">
            <el-checkbox-group v-model="checkboxGroup">
              <el-checkbox label="Option1" border>全部</el-checkbox>
              <el-checkbox label="Option2" border>7-115</el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
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
          >当前面试轮次：一面</span
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
          property="stuid"
          label="学号"
          width="120"
          sortable
          align="center"
        />
        <el-table-column property="name" label="姓名" align="center" />
        <el-table-column
          property="class"
          label="班级"
          width="120"
          align="center"
        />
        <el-table-column
          prop="volunteerStatus"
          label="面试结果"
          align="center"
          :filters="[
            { text: '通过', value: '1' },
            { text: '待定', value: '2' },
            { text: '未通过', value: '3' }
          ]"
          :filter-method="resultFilter"
          width="120"
        >
          <template #default="scope">
            <el-tag class="ml-2" :type="colorCalculate(scope.row.result)">{{
              scope.row.result
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="通知情况"
          align="center"
          width="120"
          :filters="[
            { text: '已通知', value: '1' },
            { text: '已安排未通知', value: '2' },
            { text: '未安排', value: '3' }
          ]"
          :filter-method="informFilter"
        >
          <template #default="scope">
            <el-tag class="ml-2" :type="colorCalculate(scope.row.inform)">{{
              scope.row.inform
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          property="score"
          label="面试总得分"
          align="center"
          width="130"
          sortable
        />
        <el-table-column
          property="1"
          label="规划能力"
          align="center"
          width="100"
        />
        <el-table-column
          property="2"
          label="专业能力"
          align="center"
          width="100"
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
    </div>
    <div class="echarts">
      <div class="tip">面试结果总览</div>
      <div id="firstEcharts" :style="{ width: '100%', height: '24vh' }"></div>
      <div style="font-size: 15px; color: #9f9f9f; text-align: center">
        共30人
      </div>
      <div class="tip" style="display: inline-block">通过人数查看</div>
      <span class="change" @click="change">切换</span>
      <div id="secondEcharts" :style="{ width: '100%', height: '24vh' }"></div>
      <div style="font-size: 15px; color: #9f9f9f; text-align: center">
        共30人
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
const emit = defineEmits(['change']);
const checkboxGroup = ref(['Option1']);
// 结果
const result = ref(1);
const resultDate = ref([
  {
    value: 1,
    label: '通过'
  },
  {
    value: 2,
    label: '淘汰'
  },
  {
    value: 3,
    label: '待定'
  }
]);
// 选择某一条
const check = () => {
  console.log(11);
  multipleTableRef.value!.toggleAllSelection();
};
// 搜索框
const input = ref('');
// 表格数据
const tableData = ref([
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  },
  {
    id: 1,
    stuid: '20212584',
    name: 'Tom',
    class: '计算机一班',
    1: 25,
    2: 22,
    score: 100,
    result: '通过',
    inform: '未安排'
  }
]);
// 已选择的数据
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref([]);
const handleSelectionChange = (val: any) => {
  console.log(val);
  multipleSelection.value = val;
};
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
// 结果筛选
const resultFilter = () => {
  console.log(33);
};

const informFilter = () => {
  console.log(33);
};
// 去简历页面按钮
const viewResume = (row: any) => {
  console.log(row);
  const store = dataBoardMeaasge();
  store.setId(row.id);
  emit('change', false);
};
// 当前页
const currentPage = ref(1);
// 共xx页
const pagesNUmTotal = ref(10);
// 改变页
const handleCurrentChange = () => {
  console.log(11);
};
// 饼图数据1
const firstEcharts = ref([
  { value: 2, name: '通过' },
  { value: 2, name: '淘汰' },
  { value: 2, name: '待定' },
  { value: 2, name: '未操作' }
]);
// 饼图数据2
const secondEcharts = ref([
  { value: 3, name: '7-115' },
  { value: 2, name: '8-115' },
  { value: 1, name: '7-556' }
]);
// // 饼图数据3
const thirdEcharts = ref([
  { value: 32, name: '文艺部' },
  { value: 33, name: '技术部' },
  { value: 56, name: '学习部' }
]);
onMounted(() => {
  const echart1 = initChart('firstEcharts', firstEcharts.value);
  const echart2 = initChart('secondEcharts', secondEcharts.value);
  window.onresize = function () {
    // 自适应大小
    echart1.resize();
    echart2.resize();
  };
});
type echartsType = Array<{ value: number; name: string }>;
// Echarts生成函数
function initChart(box: string, data: echartsType) {
  const chart = echarts.init(document.getElementById(box));
  // 把配置和数据放这里
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '80%',
        label: {
          normal: {
            position: 'inner'
          }
        },
        data
      }
    ]
  });
  return chart;
}
const a = ref(true);
// 切换饼图
const change = () => {
  a.value = !a.value;
  if (a.value) {
    initChart('secondEcharts', secondEcharts.value);
  } else {
    initChart('secondEcharts', thirdEcharts.value);
  }
};
// 实时刷新
function refresh() {
  console.log(22);
}
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
      height: 50px;
      width: 80%;
      float: left;
      .condition {
        height: 50px;
        width: 100%;
        .check {
          width: 85%;
          float: left;
          height: 40px;
          white-space: nowrap;
          margin-top: 10px;
          margin-left: 20px;
          line-height: 50px;
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
      margin-top: 15px;
      .botton-left {
        font-size: 14px;
        margin-left: 10px;
      }
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
