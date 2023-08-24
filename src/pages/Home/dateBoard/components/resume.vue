<template>
  <el-scrollbar class="bigBox">
    <div class="title">简历</div>
    <div class="base">
      <div class="tlt">基本问题</div>
      <div class="baseQuestion">
        <div class="baseQuestionItem">
          姓名：<el-input
            v-model="baseQuestion.name"
            style="width: 190px"
            class="item"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          学号：<el-input
            v-model="baseQuestion.studentNum"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          手机：<el-input
            v-model="baseQuestion.phone"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          邮箱：<el-input
            v-model="baseQuestion.email"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          班级：<el-input
            v-model="baseQuestion.class"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          学院：<el-input
            v-model="baseQuestion.xueyuan"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem">
          Q Q：<el-input
            v-model="baseQuestion.qq"
            style="width: 190px"
            disabled
          />
        </div>
      </div>
    </div>
    <div class="department">
      <div style="min-width: 280px">
        <div class="tlt" style="display: inline-block">部门问题(产品组)</div>
        <el-checkbox v-model="checked" disabled style="margin-left: 30px"
          >服从调剂</el-checkbox
        >
      </div>

      <div class="departmentQuestion">
        <div class="question">问题一:你有什么特长？</div>
        <div class="answer">我特别能吃饭能睡觉</div>
      </div>
      <div class="departmentQuestion">
        <div class="question">问题二:你有什么爱好？</div>
        <div class="answer">
          打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧
        </div>
      </div>
      <div class="departmentQuestion">
        <div class="question">问题三:你为什么想加入我们？</div>
        <div class="answer">我觉得特别好，对我成长有帮助</div>
      </div>
    </div>
    <div class="department">
      <div class="tlt" style="display: inline-block">综合问题</div>
      <div class="departmentQuestion">
        <div class="question">问题一:你有什么特长？</div>
        <div class="answer">我特别能吃饭能睡觉</div>
      </div>
      <div class="departmentQuestion">
        <div class="question">问题二:你有什么爱好？</div>
        <div class="answer">
          打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧打球跑步读书看电视剧
        </div>
      </div>
      <div class="departmentQuestion">
        <div class="question">问题三:你为什么想加入我们？</div>
        <div class="answer">我觉得特别好，对我成长有帮助</div>
      </div>
    </div>
    <div class="feedback">
      <div class="tlt">面试反馈</div>
      <div class="feedbackItem">2021-8-25 19:00 时间冲突</div>
      <div class="feedbackItem">2021-8-25 19:00 已接受</div>
    </div>
    <div class="feedback">
      <div class="tlt">签到</div>
      <div class="feedbackItem">2021-8-25 19:00 完成签到</div>
    </div>
    <div class="arrangement">
      <div class="tlt">面试安排</div>
      <div class="table">
        <el-table :data="tableData" border style="width: 93%">
          <el-table-column prop="round" label="面试轮次" width="180" />
          <el-table-column prop="time" label="面试时间" width="180" />
          <el-table-column prop="address" label="面试地点" />
        </el-table>
      </div>
    </div>
    <div class="inform">
      <div class="tlt">面试通知</div>
      <div class="informText">
        恭喜大聪明，你已经通过了面试，期待以后你的表现
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// 基本信息
const baseQuestion = reactive({
  name: '大聪明',
  studentNum: '20212493',
  phone: '15076347058',
  email: '2310768059@qq.com',
  class: '信息安全1班',
  xueyuan: '计算机科学与工程学院',
  qq: '2310768059'
});
// 是否调剂
const checked = ref(true);
// 面试安排
const tableData = [
  {
    round: '一面',
    time: '2021-8-23 19:00',
    address: '7-115'
  },
  {
    round: '二面',
    time: '2022-6-02 13:00',
    address: '2-110'
  },
  {
    round: '三面',
    time: '2023-6-4 16:00',
    address: '5-101'
  }
];
</script>

<style scoped lang="scss">
.bigBox {
  height: 80vh;
  min-height: 540px;
}
.title {
  font-size: 25px;
  font-weight: 700;
}
.tlt {
  font-size: 20px;
}
.base {
  margin-top: 20px;
  .baseQuestion {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    min-width: 300px;
    .baseQuestionItem {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 285px;
      ::v-deep .el-input.is-disabled .el-input__inner,
      ::v-deep .el-input.is-disabled {
        cursor: default;
      }
    }
  }
}
.department {
  margin-top: 20px;
  .departmentQuestion {
    // background-color: rgb(136, 136, 215);
    margin-top: 13px;
    .question {
      height: 30px;
      // background-color: beige;
    }
    .answer {
      // background-color: #f5f7fa;
      border: 1px solid #e4e7ed;
      color: #9e9fa1;
      border-radius: 8px;
      padding: 10px;
      width: 90%;
    }
  }
  ::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label,
  ::v-deep .el-checkbox.is-disabled {
    cursor: default !important;
  }
}
.feedback {
  margin-top: 20px;
  .feedbackItem {
    margin-top: 11px;
  }
}
.arrangement {
  margin-top: 20px;
  .table {
    margin-top: 13px;
  }
}
.inform {
  margin-top: 20px;
  margin-bottom: 20px;
  .informText {
    margin-top: 12px;
    border: 1px solid #e4e7ed;
    color: #9e9fa1;
    border-radius: 8px;
    padding: 10px;
    width: 90%;
  }
}
</style>
