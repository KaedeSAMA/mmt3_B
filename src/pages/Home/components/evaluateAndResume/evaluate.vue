<template>
  <el-scrollbar class="bigBox">
    <div class="title">面试评价</div>
    <div class="select">
      <div class="tlt" style="display: inline-block">实时面试评价</div>
      <el-select v-model="round" class="m-2 selectRound" placeholder="面试轮次">
        <el-option
          v-for="item in roundData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="result">
      <div class="tlt" style="display: inline-block">面试结果</div>
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
      <el-button type="primary" @click="changeResult">确定修改</el-button>
      <el-table border class="table" :data="resultValue" :show-header="false">
        <el-table-column
          v-for="(item, index) in resultHeader"
          :key="index"
          :prop="item"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="result">
      <div class="tlt" style="display: inline-block">通过部门：</div>
      <div
        class="tlt"
        style="display: inline-block; border-bottom: 1px solid gray"
      >
        {{ passDepartment }}
      </div>
      <el-checkbox v-model="checked" disabled style="margin-left: 30px"
        >服从调剂</el-checkbox
      >
      <el-table border class="table" :data="getOpinion" :show-header="false">
        <el-table-column
          v-for="(item, index) in getOpinionHeaders"
          :key="index"
          :prop="item"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="rank">
      <div class="tlt">个人排名：{{ rank }}</div>
      <el-scrollbar class="score">
        <div class="scoreItem">
          <div class="item">{{ scoreData.interviewer.project }}</div>
          <div
            class="item"
            v-for="(item, index) in scoreData.interviewer.name"
            :key="index"
          >
            {{ item }}
          </div>
          <div class="item">平均分</div>
        </div>
        <div
          class="scoreItem"
          v-for="(item, index) in scoreData.questionPoList"
          :key="index"
        >
          <div class="item">{{ item.question }}</div>
          <div class="item" v-for="(val, index) in item.score" :key="index">
            {{ val }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="msg" style="margin-bottom: 20px">
      <div class="tlt">面试综合评价</div>
      <el-table :data="synthesizeData" border class="table">
        <el-table-column
          prop="name"
          label="面试官"
          align="center"
          width="150"
        />
        <el-table-column prop="opinion" align="center" label="面试评价" />
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getEvaluate, getRound, changeStatus } from '@/api/dateBoard';
import { useUserInfoStore, dataBoardMeaasge } from '@/store/index';
// 获取id
const id = ref(0);
const store = dataBoardMeaasge();
id.value = store.id;
onMounted(async () => {
  const store2 = useUserInfoStore();
  permissionId.value = store2.permissionId;
  // 获取面试轮次
  const res = await getRound(id.value);
  roundData.value = roundData.value.slice(0, res?.round);
  round.value = res?.round as number;
  if ((res?.round as number) > 0) {
    getEvaluateData();
  }
});
// 轮次
const round = ref(0);
const roundData = ref([
  {
    value: 1,
    label: '一面'
  },
  {
    value: 2,
    label: '二面'
  },
  {
    value: 3,
    label: '三面'
  },
  {
    value: 4,
    label: '四面'
  },
  {
    value: 5,
    label: '五面'
  },
  {
    value: 0,
    label: '无数据'
  }
]);
watch(round, () => {
  if ((round.value as number) > 0) {
    getEvaluateData();
  }
});
// 结果
const result = ref(0);
const oldResult = ref(0);
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
// 表格转换函数
type table = Array<{
  name: string;
  opinion: string;
}>;
type header = Array<{
  prop: string;
  label: string;
}>;
const getHeaders = (table: table) => {
  return table.reduce(
    (pre, cur, index) => pre.concat(`value${index}`),
    ['title']
  );
};
const getValues = (headers: header, table: table) => {
  return headers.map((item) => {
    return table.reduce(
      (pre: object, cur: any, index: number) =>
        Object.assign(pre, { ['value' + index]: cur[item.prop] }),
      { title: item.label }
    );
  });
};
// 结果表格数据
const headers = [
  {
    prop: 'name',
    label: '面试官'
  },
  {
    prop: 'opinion',
    label: '面试官意见'
  }
];
const tableData = ref([
  {
    name: '无数据',
    opinion: '无数据'
  }
]);
// 结果表格
let resultHeader = getHeaders(tableData.value);
let resultValue = getValues(headers, tableData.value);
watch(tableData, () => {
  resultHeader = getHeaders(tableData.value);
  resultValue = getValues(headers, tableData.value);
});
// 部门名称
const passDepartment = ref('无数据');
// 是否调剂
const checked = ref(false);
// 部门通过表格
const opinionDate = ref([
  {
    name: '无数据',
    opinion: '无数据'
  }
]);
let getOpinionHeaders = getHeaders(opinionDate.value);
let getOpinion = getValues(headers, opinionDate.value);
watch(opinionDate, () => {
  getOpinionHeaders = getHeaders(opinionDate.value);
  getOpinion = getValues(headers, opinionDate.value);
});
// 个人排名
const rank = ref(0);
type scoretype = {
  interviewer: {
    project: string;
    name: Array<string>;
  };
  questionPoList: Array<{
    question: string;
    score: Array<number>;
  }>;
};
const scoreData = ref({
  interviewer: {
    project: '面试官',
    name: ['暂无数据']
  },
  questionPoList: [
    {
      question: '暂无数据',
      score: [0, 0]
    }
  ]
});
// 面试评价
const synthesizeData = ref([
  {
    name: '无数据',
    opinion: '无数据'
  }
]);
// 获取主体数据
const getEvaluateData = async () => {
  const res = await getEvaluate(id.value, round.value);
  result.value = res?.status as number;
  oldResult.value = result.value;
  round.value = res?.round as unknown as number;
  tableData.value = res?.interviewResult as unknown as table;
  opinionDate.value = res?.passResult as unknown as table;
  passDepartment.value = res?.passDepartment as string;
  checked.value = res?.isTransfers as boolean;
  rank.value = res?.interviewGradingPo.rank as number;
  synthesizeData.value = res?.comprehensiveQuestionList as table;
  scoreData.value = res?.interviewGradingPo as unknown as scoretype;
};
// 权限
const permissionId = ref(0);
// 修改结果
const changeResult = async () => {
  console.log(permissionId.value);
  if (permissionId.value === 1 || permissionId.value === 2) {
    changeStatus(id.value, round.value, result.value);
    oldResult.value = result.value;
  } else {
    result.value = oldResult.value;
    ElMessage({
      message: '你没有权限,请去实时面试或面试复盘部分进行修改',
      type: 'warning'
    });
  }
};
</script>

<style scoped lang="scss">
.bigBox {
  height: 80vh;
  min-height: 540px;
  @media (max-width: 1150px) {
    height: auto;
  }
}
.title {
  font-size: 25px;
  font-weight: 700;
}
.tlt {
  font-size: 20px;
}
.table {
  width: 95%;
  margin-top: 15px;
  min-width: 397px;
}
.select {
  margin-top: 20px;
  min-width: 290px;
  .selectRound {
    width: 130px;
    float: right;
    margin-right: 20px;
  }
}
.result {
  margin-top: 20px;
  min-width: 400px;
  .selectResult {
    width: 130px;
    margin-left: 50px;
    margin-right: 50px;
  }
  :deep(.el-checkbox__input.is-disabled + span.el-checkbox__label),
  :deep(.el-checkbox.is-disabled) {
    cursor: default !important;
  }
}
.msg {
  margin-top: 20px;
}
.rank {
  margin-top: 20px;
  .score {
    margin-top: 18px;
    width: 95%;
    border: 1px solid #ebeef5;
    white-space: nowrap;
    min-width: 400px;
    .scoreItem {
      display: inline-block;
      width: 150px;
      white-space: wrap;
      .item {
        color: #5b5f62;
        font-size: 14px;
        display: inline-block;
        border: 1px solid #ebeef5;
        border-collapse: separate;
        height: 35px;
        line-height: 30px;
        text-align: center;
        width: 150px;
      }
    }
  }
}
</style>
