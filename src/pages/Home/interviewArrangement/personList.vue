<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue';
import { GetMainDataResData } from '@/api/interviewArrange/types/res';
import { ref, watch, onMounted } from 'vue';
const sameDepartment = ref(true);
const departmentId = ref(0);
const filterDepartment = ref([]);
const filterStatus = ref<number | null>(null);
const departmentName = ref('');
const order = ref('');
const pagesize = ref(10);
const currentPage = ref(1);
const total = ref(0);
const search = ref('');
const timer = ref<NodeJS.Timeout | null>(null);
const tableData = ref<any[]>([]); // 根据你的数据结构进行调整
const filterDepartmentId = ref(0);

const round = ref<number>(1);
/* readonly */
const roundList = [
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
  }
];
const startTime = ref<Date>();
const endTime = ref<Date>();
const time = ref<number>();
const addressPoList = reactive([
  {
    id: 1,
    addressName: '115'
  },
  {
    id: 0,
    addressName: '114'
  },
  {
    id: 2,
    addressName: '113'
  }
]);
const addressIdListValue = ref<number[]>([]);
const addressIdList = reactive([]);

const mainData: GetMainDataResData = {
  allNum: 50,
  iaInfoPos: [
    {
      className: 'Class A',
      id: 1,
      interviewStatus: '通过',
      messageStatus: 1,
      name: 'Alice',
      nextPlace: 'Room 101',
      nextTime: '2023-09-01 10:00 AM',
      nowDepartment: 'Marketing',
      studentId: '123456',
      userId: 1001
    },
    {
      className: 'Class B',
      id: 2,
      interviewStatus: '未面试',
      messageStatus: 3,
      name: 'Bob',
      nextPlace: 'Room 102',
      nextTime: '2023-09-02 11:30 AM',
      nowDepartment: 'Engineering',
      studentId: '789012',
      userId: 1002
    },
    {
      className: 'Class C',
      id: 3,
      interviewStatus: '通过',
      messageStatus: 1,
      name: 'Carol',
      nextPlace: 'Room 103',
      nextTime: '2023-09-03 2:00 PM',
      nowDepartment: 'HR',
      studentId: '345678',
      userId: 1003
    },
    {
      className: 'Class D',
      id: 4,
      interviewStatus: '未通过',
      messageStatus: 2,
      name: 'David',
      nextPlace: 'Room 104',
      nextTime: '2023-09-04 3:45 PM',
      nowDepartment: 'Finance',
      studentId: '567890',
      userId: 1004
    },
    {
      className: 'Class E',
      id: 5,
      interviewStatus: '未通过',
      messageStatus: 1,
      name: 'Eve',
      nextPlace: 'Room 105',
      nextTime: '2023-09-05 9:30 AM',
      nowDepartment: 'Sales',
      studentId: '678901',
      userId: 1005
    },
    {
      className: 'Class F',
      id: 6,
      interviewStatus: '已报名',
      messageStatus: 3,
      name: 'Frank',
      nextPlace: 'Room 106',
      nextTime: '2023-09-06 2:15 PM',
      nowDepartment: 'IT',
      studentId: '890123',
      userId: 1006
    },
    {
      className: 'Class G',
      id: 7,
      interviewStatus: '已报名',
      messageStatus: 1,
      name: 'Grace',
      nextPlace: 'Room 107',
      nextTime: '2023-09-07 11:00 AM',
      nowDepartment: 'Operations',
      studentId: '901234',
      userId: 1007
    },
    {
      className: 'Class H',
      id: 8,
      interviewStatus: '未通过',
      messageStatus: 2,
      name: 'Henry',
      nextPlace: 'Room 108',
      nextTime: '2023-09-08 4:30 PM',
      nowDepartment: 'Research',
      studentId: '123789',
      userId: 1008
    },
    {
      className: 'Class I',
      id: 9,
      interviewStatus: '已报名',
      messageStatus: 1,
      name: 'Isabel',
      nextPlace: 'Room 109',
      nextTime: '2023-09-09 1:45 PM',
      nowDepartment: 'Design',
      studentId: '456890',
      userId: 1009
    },
    {
      className: 'Class J',
      id: 10,
      interviewStatus: '通过',
      messageStatus: 3,
      name: 'Jack',
      nextPlace: 'Room 110',
      nextTime: '2023-09-10 10:30 AM',
      nowDepartment: 'Engineering',
      studentId: '789012',
      userId: 1010
    },
    {
      className: 'Class K',
      id: 11,
      interviewStatus: '未通过',
      messageStatus: 3,
      name: 'Katherine',
      nextPlace: 'Room 111',
      nextTime: '2023-09-11 9:45 AM',
      nowDepartment: 'Design',
      studentId: '901234',
      userId: 1011
    }
  ],
  page: 1,
  pageNum: 10
};

/**
 * @description 展示使用说明
 */
const showUsinginfo = () => {
  // ... 处理 showUsinginfo 逻辑 ...
  console.log('showUsinginfo');
};
const setStartTime = () => {
  console.log(startTime.value?.getTime());
};

const setEndTime = () => {
  console.log(endTime.value?.getTime());
};

const handleSeclect = (val: any[]) => {
  // ... 处理 handleSeclect 逻辑 ...
};

const filterChange = (filters: any) => {
  // ... 处理 filterChange 逻辑 ...
};

const indexMethod = (index: number) => {
  // ... 处理 indexMethod 逻辑 ...
  return index + 1;
};

const current_change = (newCurrentPage: number) => {
  // ... 处理 current_change 逻辑 ...
};

const pdBtn = () => {
  // ... 处理 pdBtn 逻辑 ...
};

onMounted(() => {
  // ... 处理组件创建前的逻辑 ...
});

watch(
  [sameDepartment, search, filterStatus, filterDepartmentId, currentPage],
  ([
    newSameDepartment,
    newSearch,
    newFilterStatus,
    newFilterDepartmentId,
    newCurrentPage
  ]) => {
    if (timer.value !== null) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      let url = 'api/interview-arrangement/info/like';
      let params = {};
      if (newFilterStatus === null) {
        params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: round.value,
          keyword: newSearch,
          departmentId: newFilterDepartmentId
        };
      } else {
        params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: round.value,
          keyword: newSearch,
          departmentId: newFilterDepartmentId,
          status: newFilterStatus
        };
      }
      // ... 发送请求并处理响应 ...
    }, 600);
  }
);
</script>

<template>
  <!-- 面试次序 -->
  <header class="header">
    <div class="title"><b>待面试人员名单：</b></div>
    <el-form-item>
      <template #label>
        <div class="info-provider" @click="showUsinginfo">
          <el-icon><Warning /></el-icon>
          <span>如何进行面试安排？</span>
        </div>
      </template>
      <el-select v-model="round" class="input-style">
        <el-option
          v-for="item in roundList"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
  </header>
  <!-- 数据主体 -->
  <main class="table">
    <!-- 查询条件 -->
    <div class="query-list">
      <section class="search">
        <!-- 筛选框 -->
        <el-input
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="search"
          class="input-style"
        />
      </section>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="面试开始时间"
        @change="setStartTime"
      />
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="预计结束时间"
        @change="setEndTime"
      />
      <!-- el-input-number在flex容器里样式不对 -->
      <section>
        <el-input-number
          v-model="time"
          placeholder="每个人面试时间(分钟/人)"
          controls-position="right"
          style="width: 210px"
        />
      </section>
      <section>
        <!-- 有点难实现 -->
        <el-select
          v-model="addressIdListValue"
          multiple
          filterable
          allow-create
          default-first-option
          collapse-tags
          collapse-tags-tooltip
          :reserve-keyword="false"
          placeholder="面试地点"
        >
          <el-option
            v-for="item in addressPoList"
            :key="item.id"
            :label="item.addressName"
            :value="item.id"
          />
        </el-select>
      </section>
      <el-button type="primary">一键选择</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="mainData.iaInfoPos"
      :header-cell-style="{ 'text-align': 'center' }"
      height="451px"
      :border="true"
      ref="table"
      style="
        border-radius: 8px;
        box-shadow: 2px 2px 4px 2px #e5e9f2;
        width: 100%;
      "
      :row-style="{ height: 45 + 'px', 'vertical-align': 'middle' }"
      :cell-style="{
        padding: 0 + 'px',
        'text-align': 'center',
        'vertical-align': 'middle'
      }"
      table-layout="auto"
      @selection-change="handleSeclect"
      @filter-change="filterChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="studentId"
        label="学号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column
        prop="className"
        label="班级"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="nowDepartment"
        label="面试部门"
        :filters="filterDepartment"
        column-key="department"
        filter-placement="bottom-end"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="interviewStatus" label="上一轮面试情况">
        <template #default="scope">
          <el-text v-if="scope.row.interviewStatus == '通过'" type="success"
            >通过</el-text
          >
          <el-text
            v-else-if="scope.row.interviewStatus == '未通过'"
            type="danger"
            >未通过</el-text
          >
          <el-text
            v-else-if="scope.row.interviewStatus == '已报名'"
            type="primary"
            >已报名</el-text
          >
          <el-text type="warning" v-else>其他</el-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="nextTime"
        label="预计面试时间"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="nextPlace"
        label="预计面试地点"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="通知状态"
        :filters="[
          { text: '未安排', value: 3 + '' },
          { text: '已安排未通知', value: 2 + '' },
          { text: '已通知', value: 1 + '' }
        ]"
        column-key="messageStatus"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span v-if="scope.row.messageStatus == 3"
            ><el-text type="warning">未安排</el-text></span
          >
          <span v-else-if="scope.row.messageStatus == 2"
            ><el-text type="primary">已安排未通知</el-text></span
          >
          <span v-else-if="scope.row.messageStatus == 1"
            ><el-text type="success">已通知</el-text></span
          >
          <span v-else><el-text type="info">其它</el-text></span>
        </template>
      </el-table-column>
    </el-table>
  </main>
  <footer class="footer">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="mainData.allNum"
      :page-size="mainData.pageNum"
      :current-page="mainData.page"
      @current-change="current_change"
    >
    </el-pagination>
    <div>共有{{ mainData.allNum }}条记录</div>
    <el-button
      type="primary"
      size="large"
      class="operate-btn"
      @click="pdBtn"
      :disabled="false"
    >
      确定安排
    </el-button>
  </footer>
</template>

<style scoped lang="scss">
.input-style {
  box-shadow: 1px 1px 3px 1px #e5e9f2;
  border-radius: 5px;
}
.header {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  margin-bottom: 10px;
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
  .title {
    font-size: 15px;
  }
  .info-provider {
    display: flex;
    align-items: center;
    color: #409eff;
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
}
.table {
  width: 100%;
}
.query-list {
  display: flex;
  gap: 10px;
}
.search {
  width: 20%;
  margin-bottom: 10px;
}
.footer {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  .operate-btn {
    margin-left: auto;
    margin-right: 5px;
  }
}
</style>
