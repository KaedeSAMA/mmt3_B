<template>
  <el-card class="mainbox" shadow="always">
    <div class="optionCheckbox">
      <div class="round">
        面试轮次：
        <el-checkbox-group v-model="roundList" class="conditionCheck">
          <el-checkbox :label="1">一面</el-checkbox>
          <el-checkbox :label="2">二面</el-checkbox>
          <el-checkbox :label="3">三面</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="condition">
        面试情况：
        <el-checkbox-group v-model="conditionList" class="conditionCheck">
          <el-checkbox :label="1">未开始</el-checkbox>
          <el-checkbox :label="2">进行中</el-checkbox>
          <el-checkbox :label="3">失败</el-checkbox>
          <el-checkbox :label="4">成功</el-checkbox>
        </el-checkbox-group>
      </div>
      <span class="refresh" @click="refresh">
        <!-- <i-ep-RefreshRight size="100"></i-ep-RefreshRight> -->
        <el-icon size="20" class="refreshIcon"><RefreshRight /></el-icon>
        实时刷新</span
      >
    </div>
    <div class="selectBox">
      <div class="selectDate">
        <el-input v-model="baseData" placeholder="输入基本信息" clearable />
      </div>
      <el-select
        v-model="organizationOrder"
        class="selectDate m-2"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择社团志愿次序"
      >
        <el-option
          v-for="item in organizationOrderBar"
          :key="item.info"
          :label="item.siftName"
          :value="item.info"
        >
          <span style="float: left">{{ item.siftName }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.number }}人</span
          >
        </el-option>
      </el-select>
      <el-select
        v-model="departmentOrder"
        class="m-2 selectDate"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择部门志愿次序"
      >
        <el-option
          v-for="item in departmentOrderBar"
          :key="item.info"
          :label="item.siftName"
          :value="item.info"
        >
          <span style="float: left">{{ item.siftName }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.number }}人</span
          >
        </el-option>
      </el-select>
      <el-select
        v-model="nowDepartment"
        class="selectDate m-2"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择部门"
      >
        <el-option
          v-for="item in nowDepartmentBar"
          :key="item.info"
          :label="item.siftName"
          :value="item.info"
        >
          <span style="float: left">{{ item.siftName }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.number }}人</span
          >
        </el-option>
      </el-select>
      <el-select
        v-model="nextTime"
        class="m-2 selectDate"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择面试时间"
      >
        <el-option
          v-for="item in nextTimeBar"
          :key="item.siftName"
          :label="item.siftName"
          :value="item.siftName"
        >
          <span style="float: left; margin-right: 10px">{{
            item.siftName
          }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.number }}人</span
          >
        </el-option>
      </el-select>
      <el-select
        v-model="nextPlace"
        class="m-2 selectDate"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择面试地点"
      >
        <el-option
          v-for="item in nextPlaceBar"
          :key="item.info"
          :label="item.siftName"
          :value="item.info"
        >
          <span style="float: left">{{ item.siftName }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.number }}人</span
          >
        </el-option>
      </el-select>
      <el-button type="primary" @click="request" class="searchbtn"
        >搜索</el-button
      >
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        class="table"
        stripe
        @sort-change="changeTableSort"
      >
        <el-table-column label="简历及评价" align="center" width="100">
          <template #default="scope">
            <el-icon size="25" @click="viewResume(scope.row)" class="doucument"
              ><Document
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentId"
          label="学号"
          width="150"
          align="center"
          sortable="custom"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="140"
          align="center"
          sortable="custom"
        />
        <el-table-column
          prop="className"
          label="班级"
          width="150"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="150"
          align="center"
        />
        <el-table-column
          prop="organizationOrder"
          label="社团志愿次序"
          width="120"
          align="center"
        />
        <el-table-column
          prop="departmentOrder"
          label="部门志愿次序"
          width="140"
          align="center"
        />
        <el-table-column
          prop="nowDepartment"
          label="当前志愿部门"
          width="120"
          align="center"
        />
        <el-table-column
          prop="volunteerStatus"
          label="当前志愿情况"
          width="130"
          align="center"
        >
          <template #default="scope">
            <el-tag
              class="ml-2"
              :type="colorCalculate(scope.row.volunteerStatus)"
              >{{ scope.row.volunteerStatus }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="nextTime"
          label="下次面试时间"
          width="180"
          align="center"
          sortable="custom"
        />
        <el-table-column
          prop="nextPlace"
          label="下次面试地点"
          width="150"
          align="center"
          sortable="custom"
        />
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        background
        small
        :page-count="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 25, 30]"
        v-model:current-page="currentPage"
        layout="prev, pager, next, jumper,sizes"
        @current-change="request"
        @size-change="request"
      />
      <el-button type="primary" class="exportbtn" @click="exportExcel"
        >导出报名表</el-button
      >
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RefreshRight, Document } from '@element-plus/icons-vue';
import { useDateboardStore } from '@/store/index';
import * as XLSX from 'xlsx';
import { getFilterData, getExportData } from '@/api/dateBoard';
import { ElMessage } from 'element-plus';
type selectType = {
  info: number;
  siftName: string;
  number: number;
};
type tableDataType = {
  id: number;
  studentId: string;
  name: string;
  className: string;
  phone: string;
  organizationOrder: string;
  departmentOrder: string;
  nowDepartment: string;
  volunteerStatus: string;
  nextTime: string;
  nextPlace: string;
};
// 接收控制显示与隐藏的数据
const emit = defineEmits(['change']);
// 选择查看几面数据
const roundList = ref([]);
// 选择面试情况
const conditionList = ref([]);
// 模糊搜索
const baseData = ref('');
// 选择社团志愿次序
const organizationOrder = ref([]);
const organizationOrderBar = ref<Array<selectType>>([]);
// 选择部门志愿次序
const departmentOrder = ref([]);
const departmentOrderBar = ref<Array<selectType>>([]);
// 选择部门
const nowDepartment = ref([]);
const nowDepartmentBar = ref<Array<selectType>>([]);
// 选择面试时间
const nextTime = ref([]);
const nextTimeBar = ref<Array<selectType>>([]);
// 选择面试地点
const nextPlace = ref([]);
const nextPlaceBar = ref<Array<selectType>>([]);
// 表格数据
const tableData = ref<Array<tableDataType>>([]);
function colorCalculate(state: string) {
  switch (state) {
    case '成功':
      return 'success';
    case '失败':
      return 'danger';
    default:
      return 'warning';
  }
}
// 分页
const currentPage = ref(1);
const pageSize = ref(10);
const pageNum = ref(0);
// 排序
const sort = ref({
  sortId: 0,
  sortBy: 0
});
// 改变排序规则
const changeTableSort = (column: any) => {
  switch (column.prop) {
    case 'name':
      sort.value.sortId = 1;
      break;
    case 'studentId':
      sort.value.sortId = 2;
      break;
    case 'nextTime':
      sort.value.sortId = 3;
      break;
    case 'nextPlace':
      sort.value.sortId = 4;
      break;
  }
  switch (column.order) {
    case 'ascending':
      sort.value.sortBy = 1;
      break;
    case 'descending':
      sort.value.sortBy = 2;
      break;
    default:
      sort.value.sortBy = 0;
  }
  request();
};
// 请求数据
const page = ref({
  page: currentPage,
  pageNum: pageSize
});
const filterCondition = ref({
  interviewRoundSift: roundList,
  interviewStatusSift: conditionList,
  search: baseData,
  sort,
  organizationOrderSift: organizationOrder,
  departmentOrderSift: departmentOrder,
  nowDepartmentSift: nowDepartment,
  nextTimeSift: nextTime,
  nextPlaceSift: nextPlace
});
onMounted(async () => {
  const allData = await getFilterData(page.value, filterCondition.value);
  departmentOrderBar.value = allData?.siftBar
    .departmentOrderBar as Array<selectType>;
  organizationOrderBar.value = allData?.siftBar
    .organizationOrderBar as Array<selectType>;
  nowDepartmentBar.value = allData?.siftBar
    .nowDepartmentBar as Array<selectType>;
  nextTimeBar.value = allData?.siftBar.nextTimeBar as Array<selectType>;
  nextPlaceBar.value = allData?.siftBar.nextPlaceBar as Array<selectType>;
  tableData.value = allData?.interviewerInfoList as Array<tableDataType>;
  pageNum.value = allData?.pageNum;
});
// 请求函数，多次调用
const request = async () => {
  const res = await getFilterData(page.value, filterCondition.value);
  tableData.value = res?.interviewerInfoList as Array<tableDataType>;
  pageNum.value = res?.pageNum;
};
// 实时刷新
const refresh = async () => {
  currentPage.value = 1;
  const res = await getFilterData(page.value, filterCondition.value);
  tableData.value = res?.interviewerInfoList as Array<tableDataType>;
  pageNum.value = res?.pageNum;
  ElMessage.success('页面已刷新');
};
// 简历界面
const viewResume = (PersonDate: object) => {
  console.log(PersonDate);
  emit('change', false);
  const store = useDateboardStore();
  store.setPersonDate(PersonDate);
};
// 导出报名表
const exportExcel = async () => {
  const exportData = await getExportData(filterCondition.value);
  const data = XLSX.utils.json_to_sheet(
    exportData?.interviewerInfoList as Array<tableDataType>
  );
  const ws = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(ws, data, '报名信息');
  XLSX.writeFile(ws, '报名信息.xlsx');
};
</script>

<style scoped lang="scss">
.mainbox {
  width: 96%;
  margin-left: 2%;
  height: 93%;
  margin-top: 2%;
  min-width: 520px;
  min-height: 580px;
  @media (max-width: 1150px) {
    height: 96%;
  }
  .optionCheckbox {
    height: 5vh;
    // height: 35px;
    position: relative;
    min-height: 35px;
    line-height: 5vh;
    // background-color: antiquewhite;
    @media (max-width: 1150px) {
      height: 10vh;
      min-height: 70px;
    }
    .round {
      display: inline-block;
      .conditionCheck {
        display: inline-block;
        margin-right: 60px;
      }
    }
    .condition {
      display: inline-block;
      .conditionCheck {
        display: inline-block;
      }
      @media (max-width: 1150px) {
        display: block;
      }
    }

    .refresh {
      position: absolute;
      top: 0;
      right: 0;
      .refreshIcon {
        position: relative;
        top: 4px;
      }
    }
    .refresh:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .selectBox {
    // background-color: rgb(187, 154, 110);
    height: 5vh;
    min-height: 35px;
    margin-top: 5px;
    .selectDate {
      display: inline-block;
      width: 13%;
      margin-right: 20px;
      @media (max-width: 1150px) {
        width: 29%;
        margin-top: 2px;
      }
    }
    .searchbtn {
      @media (max-width: 1150px) {
        width: 80%;
        margin-left: 10%;
        margin-top: 5px;
      }
    }
    @media (max-width: 1150px) {
      height: 15vh;
      min-height: 105px;
    }
  }
  .tableBox {
    height: 65vh;
    width: 100%;
    min-height: 435px;
    margin-top: 10px;
    @media (max-width: 1150px) {
      height: 51vh;
      min-height: 340px;
    }
    .table {
      height: 64vh;
      width: 100%;
      min-height: 430px;
      @media (max-width: 1150px) {
        height: 50vh;
        min-height: 330px;
        min-width: 500px;
      }
    }
    .doucument:hover {
      color: #409eff;
      cursor: pointer;
    }
    :deep(.el-table__inner-wrapper) {
      min-height: 330px !important;
    }
  }
  .paginationBox {
    width: 100%;
    height: 4.3vh;
    // background-color: #409eff;
    min-height: 30px;
    box-sizing: border-box;
    padding-top: 5px;
    position: relative;
    min-width: 750px;
    .exportbtn {
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }
}
</style>
