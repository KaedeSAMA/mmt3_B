<template>
  <el-scrollbar class="bigBox">
    <div class="title">简历</div>
    <div class="base">
      <div class="tlt">基本问题</div>
      <div class="baseQuestion">
        <!-- 可以封装，复用性不咋大 -->
        <div class="baseQuestionItem" v-if="baseQuestion.name">
          姓名：<el-input
            v-model="baseQuestion.name"
            style="width: 190px"
            class="item"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.gender">
          性别：<el-input
            v-model="baseQuestion.gender"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.studentId">
          学号：<el-input
            v-model="baseQuestion.studentId"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.phone">
          手机：<el-input
            v-model="baseQuestion.phone"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.email">
          邮箱：<el-input
            v-model="baseQuestion.email"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.academy">
          学院：<el-input
            v-model="baseQuestion.academy"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.major">
          专业：<el-input
            v-model="baseQuestion.major"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.className">
          班级：<el-input
            v-model="baseQuestion.className"
            style="width: 190px"
            disabled
          />
        </div>
        <div class="baseQuestionItem" v-if="baseQuestion.qqnumber">
          Q Q：<el-input
            v-model="baseQuestion.qqnumber"
            style="width: 190px"
            disabled
          />
        </div>
      </div>
    </div>
    <div class="department">
      <div style="min-width: 280px">
        <div class="tlt" style="display: inline-block">
          部门问题({{ department }})
        </div>
        <el-checkbox v-model="isTransfers" disabled style="margin-left: 30px"
          >服从调剂</el-checkbox
        >
      </div>
      <div
        class="departmentQuestion"
        v-for="(item, index) in departmentQuestionList"
        :key="index"
      >
        <div class="question">问题{{ item.order }}:{{ item.questionName }}</div>
        <div class="answer">{{ item.answer }}</div>
      </div>
    </div>
    <div class="department">
      <div class="tlt" style="display: inline-block">综合问题</div>
      <div
        class="departmentQuestion"
        v-for="(item, index) in comprehensiveQuestion"
        :key="index"
      >
        <div class="question">问题{{ item.order }}:{{ item.questionName }}</div>
        <div class="answer">{{ item.answer }}</div>
      </div>
    </div>
    <div class="feedback">
      <div class="tlt">面试反馈</div>
      <div
        class="feedbackItem"
        v-for="(item, index) in interviewFeedbackList"
        :key="index"
      >
        {{ item.time }} {{ item.state }}
      </div>
    </div>
    <div class="feedback">
      <div class="tlt">签到</div>
      <div class="feedbackItem">{{ signIn?.time }} {{ signIn?.state }}</div>
    </div>
    <div class="arrangement">
      <div class="tlt">面试安排</div>
      <div class="table">
        <el-table :data="tableData" border style="width: 93%">
          <el-table-column
            prop="round"
            label="面试轮次"
            width="180"
            align="center"
          />
          <el-table-column
            prop="time"
            label="面试时间"
            width="180"
            align="center"
          />
          <el-table-column prop="place" label="面试地点" align="center" />
        </el-table>
      </div>
    </div>
    <!-- <div class="inform">
      <div class="tlt">面试通知</div>
      <div class="informText">
        恭喜大聪明，你已经通过了面试，期待以后你的表现
      </div>
    </div> -->
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getResumeData } from '@/api/dateBoard';
import { dataBoardMeaasge } from '@/store/index';
// 获取id
const id = ref(0);
const store = dataBoardMeaasge();
id.value = store.id;
// 基本信息
type baseQuestionType = {
  academy: string;
  className: string;
  email: string;
  gender: string;
  major: string;
  name: string;
  phone: string;
  qqnumber: string;
  studentId: string;
};
const baseQuestion = ref({
  academy: '无数据',
  className: '无数据',
  email: '无数据',
  gender: '无数据',
  major: '无数据',
  name: '无数据',
  phone: '无数据',
  qqnumber: '无数据',
  studentId: '无数据'
});
// 部门问题
type questionList = {
  order: number;
  questionName: string;
  answer: string;
};
const department = ref('无数据');
const departmentQuestionList = ref<Array<questionList>>([]);
// 是否调剂
const isTransfers = ref(false);
// 综合问题
const comprehensiveQuestion = ref<Array<questionList>>([]);
// 面试反馈
type back = {
  time: string;
  state: string;
};
const interviewFeedbackList = ref<Array<back>>([]);
// 签到
const signIn = ref<back>();
// 面试安排
type arrangement = {
  round: number;
  time: string;
  place: string;
};
const tableData = ref<Array<arrangement>>([]);
// 页面加载获取数据
(async () => {
  const resumeData = await getResumeData(id.value);
  baseQuestion.value = resumeData?.basicQuestion as unknown as baseQuestionType;
  department.value = resumeData?.departmentQuestion.departmentName as string;
  isTransfers.value = resumeData?.departmentQuestion.isTransfers as boolean;
  departmentQuestionList.value = resumeData?.departmentQuestion
    .questionList as unknown as Array<questionList>;
  comprehensiveQuestion.value = resumeData?.comprehensiveQuestion
    .questionList as unknown as Array<questionList>;
  interviewFeedbackList.value =
    resumeData?.interviewFeedbackList as unknown as Array<back>;
  signIn.value = resumeData?.signIn as unknown as back;
  tableData.value =
    resumeData?.interviewArrangementList as unknown as Array<arrangement>;
})();
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
      :deep(.el-input.is-disabled .el-input__inner),
      :deep(.el-input.is-disabled) {
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
  :deep(.el-checkbox__input.is-disabled + span.el-checkbox__label),
  :deep(.el-checkbox.is-disabled) {
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
  margin-bottom: 20px;
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
