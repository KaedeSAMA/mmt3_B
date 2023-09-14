<script setup lang="ts">
import { Filter, Warning } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import {
  GetMainDataResData,
  AddressIdList,
  DepartmentList,
  MessageStatusList
} from '@/api/interviewArrange/types/res';
import {
  getMainData,
  getMainDataFilter,
  getAddressRes,
  AddAddress,
  DeleteAddress,
  filterMainData,
  ArrangeManual,
  ArrangeAutomatic
} from '@/api/interviewArrange';
import { ref, onMounted } from 'vue';

const timer = ref<NodeJS.Timeout | null>(null);
const router = useRouter();
/**
 * @description 展示使用说明
 */
const dialogVisible = ref(false);
const showUsinginfo = () => {
  dialogVisible.value = true;
};
const handleDialogClose = (done: () => void) => {
  done();
};
// 添加地址的输入框显示
const showAddAddress = ref(false);
const newAddressToAdd = ref('');
// 添加地址
const confirmAddAddress = async () => {
  showAddAddress.value = false;
  const res = await AddAddress({
    name: newAddressToAdd.value,
    round: round.value,
    // departmentId: Number(sessionStorage.getItem('organizationId'))
    departmentId: 10
  });
  // 请求成功
  if (res.code == '00000') {
    // console.log(res.data.addressPoList);
    Object.assign(addressPoList, res.data.addressPoList);
  }
};
//删除地址
const deleteAddress = async (id: number) => {
  // addressPoList.splice(id, 1);
  const res = await DeleteAddress({
    round: round.value,
    addressId: id
  });
  // 请求成功
  if (res.code == '00000') {
    addressPoList.splice(
      addressPoList.findIndex((item) => item.id == id),
      1
    );
    console.log(res.data.addressPoList);

    // ## bug 用返回响应覆盖实现删除时出现响应式丢失的问题
    // Object.assign(addressPoList, res.data.addressPoList);
  }
};

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
// 一键安排地点的可选项
const addressPoList = reactive<
  {
    id: number;
    addressName: string;
  }[]
>([]);
// 一键安排选中的地点list
const addressIdListValue = ref<number[]>([]);
// 待转换成过滤项
const addressIdList = reactive<AddressIdList[]>([]);
const messageStatusList = reactive<MessageStatusList[]>([]);
const departmentList = reactive<DepartmentList[]>([]);
// 选中的过滤项list
const filterAddressIdList = ref<number[]>([]);
const filterMessageStatusList = ref<number[]>([]);
const filterDepartmentList = ref<number[]>([]);
// 过滤项
interface Filter {
  text: string;
  value: string;
}
const addressIdListFilter = ref<Filter[]>([]);
const messageStatusListFilter = ref<Filter[]>([]);
const departmentListFilter = ref<Filter[]>([]);

// 拼接筛选项
const filterItemReady = () => {
  addressIdListFilter.value = addressIdList.map((item) => {
    return {
      text: item.name,
      value: item.id + ''
    };
  });
  messageStatusListFilter.value = messageStatusList.map((item) => {
    return {
      text: item.name,
      value: item.id + ''
    };
  });
  departmentListFilter.value = departmentList.map((item) => {
    return {
      text: item.name,
      value: item.id + ''
    };
  });
};
/**
 * @description 表格主数据
 */
const mainData = ref<GetMainDataResData>({
  allNum: 1,
  iaInfoPos: [
    // {
    //   className: '默认',
    //   id: 1,
    //   interviewStatus: '请求数据失败',
    //   messageStatus: 1,
    //   name: 'Alice',
    //   nextPlace: 'Room 101',
    //   nextTime: '2023-09-01 10:00 AM',
    //   nowDepartment: 'Marketing',
    //   studentId: '123456',
    //   userId: 1001
    // }
  ],
  page: 1,
  pageNum: 10 // 注意: 一共多少页, 而不是页容量
});
// 页容量, 默认一页10条
const newPageSize = ref<number>(10);

const setStartTime = () => {
  console.log(startTime.value?.getTime());
};

const setEndTime = () => {
  console.log(endTime.value?.getTime());
};

/**
 * @description 被选中的行
 */
const select_row_arr = ref<any[]>([]);
const handleSeclect = (val: any[]) => {
  // ... 处理 handleSeclect 逻辑 ...
  select_row_arr.value = val;
};

const filterChange = (filters: any) => {
  // ... 处理 filterChange 逻辑 ...
  switch (Object.keys(filters)[0]) {
    case 'messageStatus':
      filterMessageStatusList.value = filters.messageStatus.map((n: string) =>
        parseInt(n)
      );
      break;
    case 'nextPlace':
      filterAddressIdList.value = filters.nextPlace.map((n: string) =>
        parseInt(n)
      );
      break;
    case 'department':
      filterDepartmentList.value = filters.department.map((n: string) =>
        parseInt(n)
      );
      break;
  }
  shiftSearch();
};

/**
 * @description 切换页码
 * @param newCurrentPage
 */
const current_change = async (newCurrentPage: number) => {
  const res = await filterMainData(
    {
      page: newCurrentPage,
      pageNum: newPageSize.value,
      round: round.value
    },
    {
      departmentIdList: filterDepartmentList.value,
      admissionAddressList: filterAddressIdList.value,
      messageStatusList: filterMessageStatusList.value,
      search: searchWord.value || null
    }
  );
  if (res) {
    mainData.value = res;
  }
};
/**
 * @description 切换每页条数
 * @param newPageSize
 */
const paginationSizeChange = (val: number) => {
  newPageSize.value = val;
  current_change(1); // 更新页面
};

/**
 * @description 确定安排
 */
const pdBtn = () => {
  // 持久化 (避免反复读写磁盘, 只在最后一次性写入)
  sessionStorage.setItem(
    'select_row_arr',
    JSON.stringify(select_row_arr.value)
  );
  sessionStorage.setItem('round', JSON.stringify(round.value));
  router.push('/home/interviewNotice');
};

/**
 * @description 搜索字段
 */
const searchWord = ref('');
const shiftSearch = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(async () => {
    const data = await filterMainData(
      {
        round: round.value,
        pageNum: newPageSize.value,
        page: 1
      },
      {
        departmentIdList: filterDepartmentList.value,
        admissionAddressList: filterAddressIdList.value,
        messageStatusList: filterMessageStatusList.value,
        search: searchWord.value || null
      }
    );
    /* update */
    mainData.value = data;
  }, 1000);
};

/**
 * @description 面试轮次变化
 */
const handleRoundChange = async () => {
  // console.log(round.value);
  initGeneral();
};
/**
 * @description 初始化: 获取全部数据and过滤项
 */
const initGeneral = async () => {
  // ... 处理组件创建前的逻辑 ...
  const mainList = getMainData({
    page: mainData.value.page || 1,
    pageNum: newPageSize.value,
    round: round.value
  });
  const mainFilter = getMainDataFilter({
    round: 1
  });
  const addressList = getAddressRes({
    round: 1
  });
  // if(mainList){
  //   mainData.value = mainList;
  // }
  // if(mainFilter){
  //   Object.assign(addressIdList,mainFilter.addressIdList);
  //   Object.assign(messageStatusList,mainFilter.messageStatusList);
  //   Object.assign(departmentList,mainFilter.departmentList);
  // }
  // if(addressList){
  //   Object.assign(addressPoList,addressList);
  // }
  await Promise.all([mainList, mainFilter, addressList]).then((values) => {
    mainData.value = values[0];
    Object.assign(addressIdList, values[1].addressIdList);
    Object.assign(messageStatusList, values[1].messageStatusList);
    Object.assign(departmentList, values[1].departmentList);
    Object.assign(addressPoList, values[2].addressPoList);
  });
  // 生成筛选项
  filterItemReady();
};
onMounted(initGeneral);

/**
 * @description 校验手动选择
 * @param type 是否需要结束时间 true:需要 false:不需要
 * @returns {boolean} 是否校验通过 true:通过 false:不通过
 */
const checkManual = (type: boolean): boolean => {
  if (!startTime.value) {
    ElMessage.error('请选择面试开始时间');
    return false;
  }
  if (type && !endTime.value) {
    ElMessage.error('请选择面试结束时间');
    return false;
  }
  if (!time.value) {
    ElMessage.error('请输入每个人面试时间');
    return false;
  }
  if (!addressIdListValue.value.length) {
    ElMessage.error('请选择面试地点');
    return false;
  }
  if (!select_row_arr.value.length) {
    ElMessage.error('请选择面试人员');
    return false;
  }
  return true;
};
/**
 * @description 手动选择
 */
const ManualGenerate = async () => {
  if (!checkManual(false)) {
    return;
  }
  const res = await ArrangeManual({
    startTime: startTime.value?.getTime() as number,
    endTime: endTime.value?.getTime() as number,
    time: time.value as number,
    addressIdList: addressIdListValue.value,
    interviewIdList: select_row_arr.value.map((item) => item.id)
  });
  if (res.code == '00000') {
    // 刷新页面，数据已在后端更新...
    initGeneral();
    ElMessage.success('手动选择成功');
  }
};
/**
 * @description 一键选择
 */
const automaticGenerate = async () => {
  if (!checkManual(true)) {
    return;
  }
  const res = await ArrangeAutomatic({
    startTime: startTime.value?.getTime() as number,
    endTime: endTime.value?.getTime() as number,
    time: time.value as number,
    addressIdList: addressIdListValue.value,
    interviewIdList: select_row_arr.value.map((item) => item.id)
  });
  if (res.code == '00000') {
    // 刷新页面，数据已在后端更新
    initGeneral();
    ElMessage.success('一键选择成功');
  }
};
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
      <el-select
        v-model="round"
        class="input-style"
        @change="handleRoundChange"
      >
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
          v-model="searchWord"
          @input="shiftSearch"
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
      <section class="option-custom">
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
          >
            <template #default>
              <span>{{ item.addressName }}</span>
              <span
                @click="deleteAddress(item.id)"
                style="
                  /* float: right; */
                  margin-left: 10px;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >&#10006;</span
              >
            </template>
            <!--           
            <span style="float: left">{{ item.addressName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >&#10006;</span
            > -->
          </el-option>
          <el-option disabled label="无匹配数据" value="noMatch">
            <template #default>
              <template v-if="showAddAddress">
                <el-input
                  v-model="newAddressToAdd"
                  placeholder="请输入地址"
                  style="width: 50%"
                />
                <el-button
                  type="primary"
                  @click="confirmAddAddress"
                  style="margin-left: 10px"
                  >确认添加</el-button
                >
                <el-button @click="showAddAddress = false">取消</el-button>
              </template>
              <template v-else>
                <el-button @click="showAddAddress = true">点击添加</el-button>
              </template>
            </template>
          </el-option>
        </el-select>
      </section>
      <el-button type="primary" @click="ManualGenerate">手动选择</el-button>
      <el-button type="primary" @click="automaticGenerate">一键选择</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="mainData.iaInfoPos"
      :header-cell-style="{ 'text-align': 'center' }"
      height="60vh"
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
        :filters="departmentListFilter"
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
        :filters="addressIdListFilter"
        column-key="nextPlace"
      ></el-table-column>
      <el-table-column
        label="通知状态"
        :filters="messageStatusListFilter"
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
      layout="prev, pager, next, sizes"
      :total="mainData.allNum"
      :page-size="newPageSize"
      :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
      @size-change="paginationSizeChange"
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

  <section class="dialog">
    <el-dialog
      v-model="dialogVisible"
      width="750px"
      center
      align-center
      :before-close="handleDialogClose"
    >
      <template #header="{ titleId, titleClass }">
        <div class="dialog-header">
          <h1 :id="titleId" :class="titleClass">安排面试</h1>
        </div>
      </template>
      <div class="dialog-main">
        <h3 style="font-weight: 400; margin-bottom: 10px">两种安排面试方法:</h3>
        &nbsp;&nbsp;<strong
          >1.[手动选择] :
          安排面试开始时间，面试结束时间可以不做限制，可以根据选择的人数和每个人面试的时间进行分配，设置面试场地，</strong
        >
        例如:<br />
        设置开始时间为某日早.上9: 00点，-人面试20min,场地配置共6个,
        选择了90个人(15*6=90)，则每个场地均15人，结束时间自动为12:00,
        第一个人为9:00-9:20，以此顺延<br />
        &nbsp;&nbsp;<strong
          >2. [一键选择] :
          仅安排面试开始时间、结束时间和每个人面试时长，设置面试场地，后即可进行一键选择。</strong
        >
        例如:<br />
        设置开始时间为某日早上9: 00点，结束时间为12:00，一人面试
        20min，场地配置共6个，则一键选择90人，每个场地15人，第一个人为
        9:00-9:20，以此顺延
      </div>
    </el-dialog>
  </section>
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

  .option-custom {
    // background-color: red;

    :deep(.el-select-dropdown__item) {
      background-color: red;
      ::after {
        content: 'hhh';
        color: red;
      }
    }
    :deep(
        .el-select-dropdown.is-multiple
          .el-select-dropdown__item.selected::after
      ) {
      // display: none;
      content: 'hhh';
      color: red;
    }
  }
}
.search {
  width: 20%;
  margin-bottom: 10px;
}
.footer {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  .operate-btn {
    margin-left: auto;
    margin-right: 5px;
  }
}
.dialog {
  :deep(.el-dialog__header) {
    padding-bottom: 20px;
  }
}
.dialog {
  :deep(.el-dialog__body) {
    border-top: 1px solid #d4d7de;
    padding-top: 20px;
  }
}
.dialog-header {
  h1 {
    font-size: 22px;
  }
}
.dialog-main {
  color: black;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.2em;
}
</style>
