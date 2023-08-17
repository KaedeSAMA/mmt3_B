<template>
  <el-scrollbar class="bigBox">
    <div class="title">面试评价</div>
    <div class="select">
      <div class="tlt" style="display: inline-block">实时面试评价</div>
      <el-select v-model="round" class="m-2 selectRound" placeholder="面试轮次">
        <el-option
          v-for="item in roundDate"
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
      <el-button type="primary">确定修改</el-button>
      <el-table border class="table" :data="getValues" :show-header="false">
        <el-table-column
          v-for="(item, index) in getHeaders"
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
        科技协会
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
      <div class="tlt">个人排名：12</div>
      <el-table :data="rankData" border class="table">
        <el-table-column
          prop="person"
          label="面试官"
          width="150"
          align="center"
        />
        <el-table-column prop="score" label="总分" width="150" align="center" />
        <el-table-column prop="专业能力" label="专业能力" align="center" />
      </el-table>
    </div>
    <div class="rank" style="margin-bottom: 20px">
      <div class="tlt">面试综合评价</div>
      <el-table :data="synthesizeData" border class="table">
        <el-table-column
          prop="person"
          label="面试官"
          align="center"
          width="150"
        />
        <el-table-column prop="evaluate" align="center" label="面试评价" />
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
type selectDate = {
  value: string;
  label: string;
};
// 轮次
const round = ref('');
const roundDate = reactive<Array<selectDate>>([
  {
    value: '1',
    label: '一面'
  },
  {
    value: '2',
    label: '二面'
  },
  {
    value: '3',
    label: '三面'
  }
]);
// 结果
const result = ref('');
const resultDate = reactive<Array<selectDate>>([
  {
    value: 'Option1',
    label: '通过'
  },
  {
    value: 'Option2',
    label: '淘汰'
  },
  {
    value: 'Option3',
    label: '待定'
  }
]);
// 结果表格
const headers = [
  {
    prop: 'person',
    label: '面试官'
  },
  {
    prop: 'opinion',
    label: '面试官意见'
  }
];
const tableData = [
  {
    person: '王小虎',
    opinion: '通过'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  }
];
// 表格转换
const getHeaders = computed(() => {
  return tableData.reduce(
    (pre, cur, index) => pre.concat(`value${index}`),
    ['title']
  );
});
const getValues = computed(() => {
  return headers.map((item) => {
    return tableData.reduce(
      (pre: object, cur: any, index: number) =>
        Object.assign(pre, { ['value' + index]: cur[item.prop] }),
      { title: item.label }
    );
  });
});
// 是否调剂
const checked = ref(true);
const opinionDate = [
  {
    person: '王小虎',
    opinion: '挺好的'
  },
  {
    person: '王小虎',
    opinion: '不错'
  },
  {
    person: '王小虎',
    opinion: '很好'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  },
  {
    person: '王小虎',
    opinion: '不通过'
  }
];
// 表格转换
const getOpinionHeaders = computed(() => {
  return opinionDate.reduce(
    (pre, cur, index) => pre.concat(`value${index}`),
    ['title']
  );
});
const getOpinion = computed(() => {
  return headers.map((item) => {
    return opinionDate.reduce(
      (pre: object, cur: any, index: number) =>
        Object.assign(pre, { ['value' + index]: cur[item.prop] }),
      { title: item.label }
    );
  });
});
// 个人排名
const rankData = [
  {
    person: '张大壮',
    score: '20',
    专业能力: '5'
  },
  {
    person: '张大',
    score: '20',
    专业能力: '8'
  },
  {
    person: '张壮',
    score: '20',
    专业能力: '3'
  },
  {
    person: '张大壮',
    score: '20',
    专业能力: '6'
  }
];
const synthesizeData = [
  {
    person: '锂电池',
    evaluate: '谈吐大方，能力强，学习认真，特长规划'
  },
  {
    person: '个人版',
    evaluate: '谈吐大方'
  },
  {
    person: '大武当',
    evaluate: '谈吐大方，能力强，学习认真，特长规划'
  },
  {
    person: '锂电池',
    evaluate: '谈吐大方，能力强，学习认真，特长规划'
  }
];
</script>

<style scoped lang="scss">
.bigBox {
  height: 80vh;
  min-height: 540px;
  // min-width: 400px;
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
  ::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label,
  ::v-deep .el-checkbox.is-disabled {
    cursor: default !important;
  }
}
.rank {
  margin-top: 20px;
}
</style>
