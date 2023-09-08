<template>
  <el-scrollbar class="bigBox">
    <div class="title">面试评价</div>
    <div class="select">
      <div class="tlt" style="display: inline-block">面试官：李华</div>
      <el-button type="primary" @click="finish" class="finish"
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
      <el-radio-group v-model="isAnonymity">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
      </el-radio-group>
    </div>
    <div class="result">
      <div class="tlt" style="display: inline-block">面试结果：</div>
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
    <div class="depatment">
      <div class="tlt signDepartment" style="display: inline-block">
        报名部门：学习部
      </div>
      <div class="expectDepartment">
        <div class="tlt" style="display: inline-block">面试官预期部门：</div>
        <el-select
          v-model="department"
          class="m-2"
          placeholder="面试结果"
          style="width: 130px"
        >
          <el-option
            v-for="item in departmentDate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="evaluate">
      <div class="tlt" style="font-weight: 700">基本评价</div>
      <div class="question">
        <div>专业能力</div>
        <div>
          <el-input-number
            v-model="num"
            :min="1"
            :max="100"
            controls-position="right"
            style="margin-top: 10px"
          />
          <span>（满分：100）</span>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">Option 1</el-radio>
            <el-radio label="2" size="large">Option 2</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 5px">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="Option A" />
            <el-checkbox label="Option B" />
            <el-checkbox label="Option C" />
            <el-checkbox label="disabled" disabled />
            <el-checkbox label="selected and disabled" disabled />
          </el-checkbox-group>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-input v-model="input" placeholder="Please input" />
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-select v-model="value" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-cascader
            v-model="value2"
            :options="options2"
            :props="props"
            @change="handleChange"
          />
        </div>
      </div>
    </div>
    <div class="evaluate">
      <div class="tlt" style="font-weight: 700">综合评价</div>
      <div class="question">
        <div>专业能力</div>
        <div>
          <el-input-number
            v-model="num"
            :min="1"
            :max="100"
            controls-position="right"
            style="margin-top: 10px"
          />
          <span>（满分：100）</span>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">Option 1</el-radio>
            <el-radio label="2" size="large">Option 2</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 5px">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="Option A" />
            <el-checkbox label="Option B" />
            <el-checkbox label="Option C" />
            <el-checkbox label="disabled" disabled />
            <el-checkbox label="selected and disabled" disabled />
          </el-checkbox-group>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-input v-model="input" placeholder="Please input" />
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-select v-model="value" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="question">
        <div>专业能力</div>
        <div style="margin-top: 10px">
          <el-cascader
            v-model="value2"
            :options="options2"
            :props="props"
            @change="handleChange"
          />
        </div>
      </div>
      <!-- <el-input
        class="textarea"
        v-model="textarea"
        :rows="6"
        type="textarea"
        placeholder="请输入"
      /> -->
    </div>
    <div class="evaluate" style="padding-bottom: 20px">
      <div class="tlt" style="font-weight: 700">面试问题</div>
      <div class="questionItem">
        <div class="a">问题：未来规划</div>
        <div class="b">
          答案：巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉
        </div>
      </div>
      <div class="questionItem">
        <div class="a">问题：未来规划</div>
        <div class="b">答案：巴拉巴拉巴拉</div>
      </div>
      <div class="questionItem">
        <div class="a">问题：未来规划</div>
        <div class="b">答案：巴拉巴拉巴拉</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { dataBoardMeaasge } from '@/store/index';

// 获取id
const id = ref(0);
const store = dataBoardMeaasge();
id.value = store.id;
// 轮次
const round = ref(1);
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
// 点击结束面试
const finish = () => {
  console.log('结束面试');
};
// 是否匿名
const isAnonymity = ref(1);
// 结果
const result = ref(1);
// const oldResult = ref(0);
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
const department = ref(1);
const departmentDate = ref([
  {
    value: 1,
    label: '技术部'
  },
  {
    value: 2,
    label: '办公室'
  },
  {
    value: 3,
    label: '学习部'
  }
]);
// 评分
const num = ref(100);
// 综合问题
// const textarea = ref('');
// 单选
const radio1 = ref('1');
// 多选
const checkList = ref(['selected and disabled', 'Option A']);
// 输入框
const input = ref('');
// 下拉框
const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];
// 级联
const props = {
  expandTrigger: 'hover' as const
};
const handleChange = (value: any) => {
  console.log(value);
};
const value2 = ref([]);
const options2 = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'docs',
        label: 'Design Documentation'
      }
    ]
  }
];
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
