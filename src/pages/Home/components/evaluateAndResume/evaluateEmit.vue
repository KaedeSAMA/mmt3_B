<template>
  <el-scrollbar class="bigBox">
    <div class="title">面试评价</div>
    <div class="select">
      <div class="tlt" style="display: inline-block">
        面试官：{{ allData.interviewer }}
      </div>
      <el-button
        type="primary"
        @click="finish"
        class="finish"
        :disabled="disable"
        >面试结束</el-button
      >
      <el-select v-model="round" class="m-2 selectRound" placeholder="面试轮次">
        <el-option
          v-for="item in roundData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="anonymity">
      <span class="text">是否匿名：</span>
      <el-radio-group v-model="currentData.realName" :disabled="disable">
        <el-radio :label="false">是</el-radio>
        <el-radio :label="true">否</el-radio>
      </el-radio-group>
    </div>
    <div class="result">
      <div class="tlt" style="display: inline-block">面试结果：</div>
      <el-select
        v-model="currentData.isPass"
        class="m-2 selectResult"
        placeholder="面试结果"
        :disabled="disable"
      >
        <el-option
          v-for="item in resultDate"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="depatment">
      <div class="tlt signDepartment" style="display: inline-block">
        报名部门：{{ allData.department }}
      </div>
      <div class="expectDepartment">
        <div class="tlt" style="display: inline-block">面试官预期部门：</div>
        <el-select
          v-model="currentData.expectDepartment"
          class="m-2"
          placeholder="面试结果"
          style="width: 130px"
          :disabled="disable"
        >
          <el-option
            v-for="item in departmentDate"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          />
        </el-select>
      </div>
    </div>
    <div class="evaluate">
      <div class="tlt" style="font-weight: 700">基本评价</div>
      <div v-for="(item, index) in currentData.questions" :key="index">
        <div class="question" v-if="item.qType === 1 && item.type === 6">
          <div>{{ item.question }}</div>
          <div>
            <el-input-number
              v-model="item.aInt"
              :min="1"
              :max="item.qMaxScore ? item.qMaxScore : 0"
              controls-position="right"
              style="margin-top: 10px"
              :disabled="disable"
            />
            <span>（满分：{{ item.qMaxScore }}）</span>
          </div>
        </div>
        <div class="question" v-if="item.qType === 1 && item.type === 1">
          <div>{{ item.question }}</div>
          <div>
            <el-radio-group
              v-model="item.aSelect.answerList[0]"
              :disabled="disable"
            >
              <el-radio
                v-for="(i, index) in item.qOpts.valueList"
                :key="index"
                :label="i.value"
                size="large"
                >{{ i.value }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <div class="question" v-if="item.qType === 1 && item.type === 2">
          <div>{{ item.question }}</div>
          <div style="margin-top: 5px">
            <el-checkbox-group
              v-model="item.aSelect.answerList"
              :disabled="disable"
            >
              <el-checkbox
                v-for="(i, index) in item.qOpts.valueList"
                :key="index"
                :label="i.value"
              />
            </el-checkbox-group>
          </div>
        </div>
        <div class="question" v-if="item.qType === 1 && item.type === 4">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-input
              :disabled="disable"
              v-model="item.aStr"
              placeholder="请输入"
            />
          </div>
        </div>
        <div class="question" v-if="item.qType === 1 && item.type === 3">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-select
              :disabled="disable"
              v-model="item.aSelect.answerList[0]"
              class="m-2"
              :placeholder="item.aSelect.answerList[0]"
            >
              <el-option
                v-for="i in item.qOpts.valueList"
                :key="i.value"
                :label="i.value"
                :value="i.value"
              />
            </el-select>
          </div>
        </div>
        <div class="question" v-if="item.qType === 1 && item.type === 5">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-cascader
              :disabled="disable"
              v-model="item.aSelect.answerList"
              :options="item.qOpts.valueList"
              :props="props"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate">
      <div class="tlt" style="font-weight: 700">综合评价</div>
      <div v-for="(item, index) in currentData.questions" :key="index">
        <div class="question" v-if="item.qType === 2 && item.type === 6">
          <div>{{ item.question }}</div>
          <div>
            <el-input-number
              v-model="item.aInt"
              :min="1"
              :max="item.qMaxScore ? item.qMaxScore : 0"
              controls-position="right"
              style="margin-top: 10px"
              :disabled="disable"
            />
            <span>（满分：{{ item.qMaxScore }}）</span>
          </div>
        </div>
        <div class="question" v-if="item.qType === 2 && item.type === 1">
          <div>{{ item.question }}</div>
          <div>
            <el-radio-group
              v-model="item.aSelect.answerList[0]"
              :disabled="disable"
            >
              <el-radio
                v-for="(i, index) in item.qOpts.valueList"
                :key="index"
                :label="i.value"
                size="large"
                >{{ i.value }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <div class="question" v-if="item.qType === 2 && item.type === 2">
          <div>{{ item.question }}</div>
          <div style="margin-top: 5px">
            <el-checkbox-group
              v-model="item.aSelect.answerList"
              :disabled="disable"
            >
              <el-checkbox
                v-for="(i, index) in item.qOpts.valueList"
                :key="index"
                :label="i.value"
              />
            </el-checkbox-group>
          </div>
        </div>
        <div class="question" v-if="item.qType === 2 && item.type === 4">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-input
              :disabled="disable"
              v-model="item.aStr"
              placeholder="请输入"
            />
          </div>
        </div>
        <div class="question" v-if="item.qType === 2 && item.type === 3">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-select
              :disabled="disable"
              v-model="item.aSelect.answerList[0]"
              class="m-2"
              :placeholder="item.aSelect.answerList[0]"
            >
              <el-option
                v-for="i in item.qOpts.valueList"
                :key="i.value"
                :label="i.value"
                :value="i.value"
              />
            </el-select>
          </div>
        </div>
        <div class="question" v-if="item.qType === 2 && item.type === 5">
          <div>{{ item.question }}</div>
          <div style="margin-top: 10px">
            <el-cascader
              :disabled="disable"
              v-model="item.aSelect.answerList"
              :options="item.qOpts.valueList"
              :props="props"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate" style="padding-bottom: 20px">
      <div class="tlt" style="font-weight: 700">面试问题</div>
      <div v-for="(item, index) in currentData.questions" :key="index">
        <div v-if="item.qType === 3" class="questionItem">
          <div class="a">{{ item.question }}</div>
          <div class="b">答案：{{ item.qHint }}</div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { dataBoardMeaasge } from '@/store/index';
import { getEvaluate, getDepartment, sendResume } from '@/api/interviewReply';
// 获取id
const id = ref(0);
const store = dataBoardMeaasge();
id.value = store.id2;
//
const disable = ref(false);
// 轮次
const round = ref(1);
const roundData = ref<
  Array<{
    value: number;
    label: string;
  }>
>([]);
// 现在显示的数据
// const current = ref();
// 结果
// const result = ref();
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
// 部门
// const department = ref();
const departmentDate = ref<
  Array<{
    departmentId: number;
    departmentName: string;
  }>
>([]);
// // 评分
// const num = ref(80);
// // 单选
// const radio1 = ref('1');
// // 多选
// const checkList = ref(['selected and disabled', 'Option A']);
// // 输入框
// const input = ref('');
// // 下拉框
// const value = ref('');
// const options = [
//   {
//     value: 'Option1',
//     label: 'Option1'
//   },
//   {
//     value: 'Option2',
//     label: 'Option2'
//   },
//   {
//     value: 'Option3',
//     label: 'Option3'
//   },
//   {
//     value: 'Option4',
//     label: 'Option4'
//   },
//   {
//     value: 'Option5',
//     label: 'Option5'
//   }
// ];
// 级联
const props = {
  expandTrigger: 'hover' as const,
  value: 'value',
  label: 'value',
  children: 'childValueList',
  checkStrictly: true
};
const handleChange = (value: any) => {
  console.log(currentData.value.questions[0].aSelect.answerList, '6666');
};
const allData = ref({
  interviewer: '无数据',
  department: '无数据',
  interviewTables: Array<any>
});
const currentData = ref({
  round: 1,
  editable: false,
  realName: false,
  isPass: 1,
  expectDepartment: 0,
  count: 0,
  questions: [
    {
      id: 0,
      order: 0,
      qType: 0,
      type: 0,
      question: '无数据',
      qMaxScore: 0,
      qOpts: {
        valueList: [
          {
            value: '无数据',
            childValueList: {}
          }
        ]
      },
      qHint: '无数据',
      aStr: '无数据',
      aInt: 0,
      aSelect: {
        answerList: []
      }
    }
  ]
});
const sendMsg = ref<{
  interview: number;
  realName: boolean;
  isPass: number;
  expectDepartment: number;
  evaluations: Array<{
    id: number;
    sStr: null | string;
    aInt: null | number;
    aSelect: null | {
      answerList: Array<string>;
    };
  }>;
}>({
  interview: id.value,
  realName: true,
  isPass: 0,
  expectDepartment: 0,
  evaluations: []
});
// 获取数据
const getMessage = async () => {
  const res = await getEvaluate(id.value);
  // @ts-ignore
  for (let i = 1; i <= res?.count; i++) {
    roundData.value.push({
      value: i,
      label: i + '面'
    });
    if (round.value === res?.interviewTables[i - 1].round) {
      // @ts-ignore
      currentData.value = res.interviewTables[i - 1];
    }
  }
  allData.value = res as any;
  disable.value = !currentData.value.editable;
};
// 获取部门
const getDepartmentList = async () => {
  const res = await getDepartment();
  departmentDate.value = res?.departments as unknown as Array<{
    departmentId: number;
    departmentName: string;
  }>;
};
getMessage();
onMounted(() => {
  getDepartmentList();
});
watch(round, () => {
  // @ts-ignore
  currentData.value = allData.value.interviewTables[round.value - 1];
  disable.value = !currentData.value.editable;
});
// 点击结束面试
const finish = async () => {
  // 发送数据
  sendMsg.value.realName = currentData.value.realName;
  sendMsg.value.isPass = currentData.value.isPass;
  sendMsg.value.expectDepartment = currentData.value.expectDepartment;
  currentData.value.questions.forEach((item: any) => {
    if (
      item.type === 1 ||
      item.type === 2 ||
      item.type === 3 ||
      item.type === 5
    ) {
      sendMsg.value.evaluations.push({
        id: item.id,
        sStr: null,
        aInt: null,
        aSelect: item.aSelect
      });
    }
    if (item.type === 4) {
      sendMsg.value.evaluations.push({
        id: item.id,
        sStr: item.aStr,
        aInt: null,
        aSelect: null
      });
    }
    if (item.type === 6) {
      sendMsg.value.evaluations.push({
        id: item.id,
        sStr: null,
        aInt: item.aInt,
        aSelect: null
      });
    }
  });
  // @ts-ignore
  await sendResume(sendMsg.value);
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
  // font-weight: 700;
}
.select {
  height: 35px;
  margin-top: 20px;
  min-width: 380px;
  .selectRound {
    width: 130px;
    float: right;
    margin-right: 20px;
  }
  .finish {
    float: right;
    margin-right: 20px;
  }
}
.anonymity {
  height: 30px;
  .text {
    display: inline-block;
    height: 25px;
    vertical-align: bottom;
  }
  :deep(.el-radio-group) {
    height: 30px;
    margin-left: 20px;
  }
}
.result {
  margin-top: 15px;
  min-width: 400px;
  .selectResult {
    width: 140px;
    margin-left: 10px;
  }
  :deep(.el-checkbox__input.is-disabled + span.el-checkbox__label),
  :deep(.el-checkbox.is-disabled) {
    cursor: default !important;
  }
}
.depatment {
  margin-top: 15px;
  min-width: 485px;
  .signDepartment {
    display: inline-block;
  }
  .expectDepartment {
    float: right;
    margin-right: 12px;
  }
}
.evaluate {
  margin-top: 20px;
  .question {
    margin-top: 15px;
  }
  .textarea {
    margin-top: 15px;
    width: 96%;
  }
  .questionItem {
    margin-top: 10px;
    .a {
      font-weight: 400;
      display: inline-block;
      border-bottom: 1px solid gray;
    }
    .b {
      margin-top: 8px;
    }
  }
}
</style>
