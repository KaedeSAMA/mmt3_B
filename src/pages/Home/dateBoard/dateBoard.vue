<template>
  <el-card class="mainbox" shadow="always">
    <div class="optionCheckbox">
      <div class="round">
        面试轮次：
        <el-checkbox-group v-model="roundList" class="conditionCheck">
          <el-checkbox label="一面" />
          <el-checkbox label="二面" />
          <el-checkbox label="三面" />
        </el-checkbox-group>
      </div>
      <div class="condition">
        面试情况：
        <el-checkbox-group v-model="conditionList" class="conditionCheck">
          <el-checkbox label="未开始" />
          <el-checkbox label="进行中" />
          <el-checkbox label="失败" />
          <el-checkbox label="成功" />
        </el-checkbox-group>
      </div>
      <span class="refresh">
        <!-- <i-ep-RefreshRight size="100"></i-ep-RefreshRight> -->
        <el-icon size="20" class="refreshIcon"><RefreshRight /></el-icon>
        实时刷新</span
      >
    </div>
    <div class="selectBox">
      <div class="selectDate">
        <el-input v-model="baseDate" placeholder="输入基本信息" clearable />
      </div>
      <el-select
        v-model="organizationOrder"
        class="selectDate m-2"
        placeholder="选择社团志愿次序"
      >
        <el-option
          v-for="item in organizationOrderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="departmentOrder"
        class="m-2 selectDate"
        placeholder="选择部门志愿次序"
      >
        <el-option
          v-for="item in departmentOrderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="department"
        class="selectDate m-2"
        placeholder="选择部门"
      >
        <el-option
          v-for="item in departmentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="time"
        class="m-2 selectDate"
        placeholder="选择面试时间"
      >
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="position"
        class="m-2 selectDate"
        placeholder="选择面试地点"
      >
        <el-option
          v-for="item in positionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" class="searchbtn">搜索</el-button>
    </div>
    <div class="tableBox">
      <el-table :data="tableData" class="table" stripe>
        <el-table-column label="简历及评价" align="center" fixed width="100">
          <template #default="scope">
            <el-icon size="25" @click="console.log(scope)" class="doucument"
              ><Document
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="stunum"
          label="学号"
          width="150"
          align="center"
          sortable
        />
        <el-table-column
          prop="name"
          fixed
          label="姓名"
          width="150"
          align="center"
          sortable
        />
        <el-table-column prop="class" label="班级" width="180" align="center" />
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
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
          prop="department"
          label="当前志愿部门"
          width="120"
          align="center"
        />
        <el-table-column
          prop="state"
          label="当前志愿情况"
          width="130"
          align="center"
        >
          <template #default="scope">
            <el-tag class="ml-2" :type="colorCalculate(scope.row.state)">{{
              scope.row.state
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="下次面试时间"
          width="140"
          align="center"
          sortable
        />
        <el-table-column
          prop="location"
          label="下次面试地点"
          width="130"
          align="center"
        />
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        background
        small
        :total="1000"
        v-model:current-page="currentPage4"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
      <el-button type="primary" class="exportbtn">导出报名表</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { RefreshRight, Document } from '@element-plus/icons-vue';
// 选择查看几面数据
const roundList = ref(['一面', '二面']);
// 选择面试情况
const conditionList = ref(['成功', '未开始']);
// 模糊搜索
const baseDate = ref('');
// 选择社团志愿次序
type selectType = {
  value: string;
  label: string;
};
const organizationOrder = ref('');
const organizationOrderOptions = reactive<Array<selectType>>([
  {
    value: '1',
    label: '一志愿'
  },
  {
    value: '2',
    label: '二志愿'
  }
]);
// 选择部门志愿次序
const departmentOrder = ref('');
const departmentOrderOptions = reactive<Array<selectType>>([
  {
    value: '1',
    label: '一志愿'
  },
  {
    value: '2',
    label: '二志愿'
  }
]);
// 选择部门
const department = ref('');
const departmentOptions = reactive<Array<selectType>>([
  {
    value: '1',
    label: '科技部'
  },
  {
    value: '2',
    label: '技术部'
  }
]);
// 选择面试时间
const time = ref('');
const timeOptions = reactive<Array<selectType>>([
  {
    value: '1',
    label: '周一'
  },
  {
    value: '2',
    label: '周二'
  }
]);
// 选择面试地点
const position = ref('');
const positionOptions = reactive<Array<selectType>>([
  {
    value: '1',
    label: '115'
  },
  {
    value: '2',
    label: '116'
  }
]);
// 表格数据
type tableDataType = {
  stunum: string;
  name: string;
  class: string;
  phone: string;
  organizationOrder: string;
  departmentOrder: string;
  department: string;
  state: string;
  time: string;
  location: string;
};
const tableData = reactive<Array<tableDataType>>([
  {
    stunum: '20201111',
    name: '大聪明1',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '失败',
    time: '8/25 15:00',
    location: '7-115'
  },
  {
    stunum: '20201111',
    name: '大聪明1',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '失败',
    time: '8/25 15:00',
    location: '7-115'
  },
  {
    stunum: '20201111',
    name: '大聪明1',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '失败',
    time: '8/25 15:00',
    location: '7-115'
  },
  {
    stunum: '20201122',
    name: '大聪明2',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '成功',
    time: '8/20 15:00',
    location: '7-115'
  },
  {
    stunum: '20211111',
    name: '大聪明3',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '一面进行中',
    time: '8/03 10:00',
    location: '7-115'
  },
  {
    stunum: '20201125',
    name: '大聪明3',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '成功',
    time: '9/25 15:00',
    location: '7-115'
  },
  {
    stunum: '20200211',
    name: '大聪明4',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '二面进行中',
    time: '8/26 15:00',
    location: '7-115'
  },
  {
    stunum: '20223524',
    name: '大聪明5',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '失败',
    time: '8/24 15:00',
    location: '7-115'
  },
  {
    stunum: '20201111',
    name: '大聪明7',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '成功',
    time: '8/25 10:00',
    location: '7-115'
  },
  {
    stunum: '20205511',
    name: '熊出没6',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '一面进行中',
    time: '8/25 13:00',
    location: '7-115'
  },
  {
    stunum: '20253411',
    name: '小米9',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '成功',
    time: '8/10 15:00',
    location: '7-115'
  },
  {
    stunum: '20205311',
    name: '地方3',
    class: '计算机1班',
    phone: '12535625854',
    organizationOrder: '第一志愿',
    departmentOrder: '第一志愿',
    department: '前端部',
    state: '成功',
    time: '8/30 15:00',
    location: '7-115'
  }
]);
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
const currentPage4 = ref(4);
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
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
        margin-top: 3px;
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

    min-width: 660px;
    .exportbtn {
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }
}
</style>
