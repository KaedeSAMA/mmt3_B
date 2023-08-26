<template>
  <div class="bigLeft">
    <!-- 面试次序 -->
    <div class="dingwei">
      <div>
        <div class="btn-group" @click="pdBtn" style="border-radius: 50%">
          <button type="button" class="btn btn1 btn0" ref="btn1">一面</button>
          <button type="button" class="btn btn2" ref="btn2">二面</button>
          <button type="button" class="btn btn3" ref="btn3">三面</button>
        </div>
        <div class="text1"><b>待面试人员名单：</b></div>
      </div>
    </div>
    <!-- 数据表格 -->
    <div class="table">
      <!-- 筛选框 -->
      <div class="search">
        <el-input
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="search"
          style="border-radius: 5px; box-shadow: 1px 1px 3px 1px #e5e9f2"
        >
        </el-input>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        height="291px"
        border
        ref="table"
        style="
          border-radius: 8px;
          box-shadow: 2px 2px 4px 2px #e5e9f2;
          width: 100%;
        "
        :row-style="{ height: 50 + 'px', 'vertical-align': 'middle' }"
        :cell-style="{
          padding: 0 + 'px',
          'text-align': 'center',
          'vertical-align': 'middle'
        }"
        @selection-change="handleSeclect"
        @filter-change="filterChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="studentId" label="学号"> </el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="className" label="班级" width="140">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="面试部门"
          width="120"
          :filters="filterDepartment"
          column-key="department"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          label="通知状态"
          width="120"
          :filters="[
            { text: '未安排', value: 2 + '' },
            { text: '已通知未签到', value: 4 + '' }
          ]"
          column-key="status"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 2"
              ><el-tag type="warning" disable-transitions>未安排</el-tag></span
            >
            <span v-else-if="scope.row.status == 3"
              ><el-tag disable-transitions>已安排未通知</el-tag></span
            >
            <span v-else-if="scope.row.status == 4"
              ><el-tag type="success" disable-transitions
                >已通知未签到</el-tag
              ></span
            >
            <span v-else
              ><el-tag type="info" disable-transitions>其它</el-tag></span
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="foot">
        <div>共有{{ total }}条记录</div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="currentPage"
            @current-change="current_change"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const sameDepartment = ref(true);
const departmentId = ref(0);
const filterDepartment = ref([]);
const filterStatus = ref<number | null>(null);
const departmentName = ref('');
const round = ref(1);
const order = ref('');
const pagesize = ref(10);
const currentPage = ref(1);
const total = ref(0);
const search = ref('');
const timer = ref<NodeJS.Timeout | null>(null);
const tableData = ref<any[]>([]); // 根据你的数据结构进行调整
const filterDepartmentId = ref(0);

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

<style scoped>
.tag {
  color: white;
  padding: 3px;
}
.bigLeft {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dingwei {
  margin-top: 20px;
  display: flex;
  justify-content: left;
}
.table {
  width: 100%;
}
.text1 {
  margin: 30px 0;
  width: auto;
}
.btn {
  color: gray;
  /* font-size: 20px; */
  background: white;
  padding: 10px 15px 10px 15px;
  border: solid gray 0.5px;
  text-decoration: none;
  border-color: rgb(192, 196, 204);
}

.btn0 {
  outline: 0;
  background: gray;
  color: white;
  text-decoration: none;
}
.btn1 {
  border-radius: 47% 0 0 47%;
  border-right: 0;
}
.btn3 {
  border-radius: 0 47% 47% 0;
  border-left: 0;
}
.search {
  width: 40%;
  margin-bottom: 10px;
}
.foot {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
