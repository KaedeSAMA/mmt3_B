<!-- 
  // ？ 本组件是个人主页总页面
  // ？ 1. 切换组织最后的信息存放在pinia中
  // ？ 2. 
 -->
<template>
  <div class="personal-page-root">
    <el-card class="self-info-card flex a-center">
      <el-avatar :size="160" :src="avatar" />
      <div class="self-info-main flex flex-d-col a-center j-around">
        <div class="self-info-main-item">
          <span class="key">姓名&nbsp;&nbsp;&nbsp;:</span>

          <span class="value">{{ studentName }}</span>
        </div>
        <div class="self-info-main-item">
          <span class="key">电话号&nbsp;&nbsp;&nbsp;:</span>
          <span class="value">{{ phoneNum }}</span>
        </div>
        <div class="self-info-main-item">
          <span class="key">学号&nbsp;&nbsp;&nbsp;:</span>
          <span class="value">{{ studentCode }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="community-manage-card" :body-style="rightCardStyle">
      <template #header> 所在组织/社团 </template>
      <div class="upper flex">
        <div class="upper-font">当前组织/社团：</div>
        <div class="button-group">
          <el-button
            class="orgnization-button"
            type="primary"
            size="large"
            :plain="!item.active"
            v-for="item in organizationTabs"
            :key="item.organizationId"
            @click="openSwitchDialog(item)"
            >{{ item.organizationName }}</el-button
          >
        </div>
      </div>
      <div class="joinBox">
        <el-button type="primary" @click="openDialog">
          <el-icon><Plus /></el-icon>
          添加组织
        </el-button>
      </div>
      <div class="join-hint">选中组织/社团以切换当前社团</div>
      <el-divider />
      <div class="joinBox">
        <el-button type="primary" @click="openUpdatePasswordDialog">
          <el-icon><Edit /></el-icon>
          更改当前组织密码
        </el-button>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      @close="closeDialog"
      class="dialog"
      width="500px"
    >
      <template #header> 加入组织 </template>
      <el-form class="dialog-form">
        <el-form-item label="邀请码" label-width="120px">
          <el-input
            v-model="dialogData.key"
            placeholder="请输入邀请码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input
            v-model="dialogData.password"
            placeholder="请输入密码"
            type="password"
            :center="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeDialog()">Cancel</el-button>
          <el-button type="primary" @click="joinOrg(dialogData)">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="switchDialogVisible"
      @close="closeSwitchDialog"
      class="dialog"
      width="500px"
    >
      <template #header> 切换组织 </template>
      <el-form class="dialog-form">
        <el-form-item label="密码" label-width="120px">
          <el-input
            v-model="switchPassword"
            placeholder="请输入密码"
            type="password"
            :center="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeSwitchDialog()">Cancel</el-button>
          <el-button type="primary" @click="switchOrg()"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="updatePasswordDialogVisible"
      @close="closeSwitchDialog"
      class="dialog"
      width="500px"
    >
      <template #header> 更改密码 </template>
      <el-form class="dialog-form">
        <el-form-item label="旧密码" label-width="120px">
          <el-input
            v-model="updatePasswordData.oldPassword"
            placeholder="请输入旧密码"
            type="password"
            :center="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input
            v-model="updatePasswordData.newPassword"
            placeholder="请输入新密码"
            type="password"
            :center="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeUpdatePasswordDialog()">Cancel</el-button>
          <el-button type="primary" @click="updatePas()"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import avatar from '@/assets/img/avatar.jpg';
import '@/style/flex.scss';
import { Plus, Edit } from '@element-plus/icons-vue';
import { TJoinOrganization, TSwitchOrganization } from '@/api/types/dataType';
import {
  getUserBasicInfo,
  getUserOrganizations,
  joinOrganization,
  switchOrganization,
  updatePassword
} from '@/api/personalPage/index';

// ### 定义右侧卡片的bodyCSS样式
const rightCardStyle = {
  // backgroundColor: 'black',
  width: '90%',
  height: '80%',
  margin: '0 auto'
};

// ###############
// ### 功能：获取用户信息并展示⬇️

// ### 1.定义数据展示的变量
const studentName = ref('加载中');
const phoneNum = ref('加载中');
const studentCode = ref('加载中');

// ### 2.挂载时向后端发起请求获取用户数据
onMounted(async () => {
  const data = await getUserBasicInfo();
  if (data) {
    studentName.value = data.username;
    phoneNum.value = data.phone;
    studentCode.value = data.studentId;
  }
});
// ###获取用户信息并展示⬆️
// ###############

// ### 功能：获取用户当前加入的所有组织并展示切换⬇️

// ### 1.创建变量用来存储此人加入组织的tabs
type organizationTab = {
  organizationId: number;
  organizationName: string;
  active: boolean;
};
const organizationTabs = ref<Array<organizationTab>>([
  {
    organizationId: 1,
    organizationName: '加载中',
    active: true
  },
  {
    organizationId: 2,
    organizationName: '加载中',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '加载中',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '加载中',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '加载中',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '加载中',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '加载中',
    active: false
  }
]);
// ### 2.从后端获取信息
const getOrgList = async () => {
  const data = await getUserOrganizations();
  if (data) {
    organizationTabs.value = data.organizations;
  }
};
onMounted(() => {
  getOrgList();
});
// ### 3.点击按钮改变状态并切换组织

// ### 用于存储输入的密码
const switchPassword = ref('');
// ### 用于存储当前点击的部门ID
const clickOrganizationId = ref(0);

// ### 定义dialog
const switchDialogVisible = ref(false);
const openSwitchDialog = (item: organizationTab) => {
  if (!item.active) {
    clickOrganizationId.value = item.organizationId;
    switchDialogVisible.value = true;
  }
};
const closeSwitchDialog = () => {
  switchDialogVisible.value = false;
};

async function switchOrg() {
  // ### 定义发送请求的数据
  const switchDataConfig: TSwitchOrganization = {
    organizationId: clickOrganizationId.value,
    password: switchPassword.value
  };
  // ###发送请求
  const res = await switchOrganization(switchDataConfig);
  // ### 根据请求结果做出响应
  //    ### 获取上一次的ID用于请求失败时加载上一次的状态
  if (res) {
    if (res.code === '00000') {
      getOrgList();
      switchDialogVisible.value = false;
    }
  }
}
// ### 功能：获取用户当前加入的所有组织并展示切换⬆️

// #########################
// ### 功能：加入新的组织⬇️

// ### 1.定义请求函数：joinOrg
const joinOrg = async (config: TJoinOrganization) => {
  const data = await joinOrganization(config);
  // ### 成功后关闭窗体,并且重新获取组织
  if (data) {
    dialogVisible.value = false;
    getOrgList();
  }
};
// ### 2.定义dialog弹出层
const dialogVisible = ref(false);
const dialogData = ref({
  key: '',
  password: ''
});
const openDialog = () => {
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = false;
};

// ### 功能：加入新的组织⬆️
// #########################

// ### 功能：更改当前社团密码⬇️

// ### 1.dialog窗体
const updatePasswordDialogVisible = ref(false);
const updatePasswordData = ref({
  oldPassword: '',
  newPassword: ''
});
const openUpdatePasswordDialog = () => {
  updatePasswordDialogVisible.value = true;
};
const closeUpdatePasswordDialog = () => {
  updatePasswordDialogVisible.value = false;
};

// ### 2.提交处理函数
async function updatePas() {
  // ###发送请求
  updatePassword(updatePasswordData.value);
}
</script>
<style lang="scss" scoped>
.personal-page-root {
  @media (max-width: 820px) {
    flex-direction: column;
    min-height: 100%;
    justify-content: start;
    align-items: center;
    overflow-y: auto;
  }
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .self-info-card {
    box-sizing: border-box;
    width: 25%;
    min-width: 300px;
    height: 80%;
    min-height: 600px;
    margin-right: 15px;

    :deep(.el-card__body) {
      padding: 0;
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    @media (max-width: 820px) {
      width: 100%;
      height: 350px;
      min-height: 350px;
      min-width: 0;
      margin-right: 0;
      margin-bottom: 20px;
      :deep(.el-card__body) {
        padding: 0;
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }
    }
    .self-info-main {
      width: 80%;
      height: 50%;
      @media (max-width: 820px) {
        width: 50%;
      }
    }
    .self-info-main-item {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      .key {
        text-align: right;
        display: inline-block;
        width: 140px;
        margin-right: 10px;
      }

      .value {
        display: inline-block;
        width: 140px;
        margin-left: 10px;
      }
    }
  }
  // .self-info-card ::v-deep .el-card__body {
  //   background-color: black;
  // }
  .community-manage-card {
    box-sizing: border-box;
    margin-left: 15px;
    width: 70%;
    height: 60%;
    min-width: 400px;
    min-height: 600px;
    @media (max-width: 820px) {
      width: 100%;
      min-height: 700px;
      margin: 0;
      min-width: 0;
    }
    .upper-font {
      @media (max-width: 1200px) {
        display: none;
      }
    }
    .upper {
      width: 100%;
      div {
        min-width: 120px;
        // background-color: black;
      }

      .button-group {
        width: 100%;
        // min-height: 200px;
        // flex-wrap: wrap;
        display: grid;
        grid-template-columns: repeat(auto-fill, 150px);
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 20px;
        @media (max-width: 1200px) {
          padding-left: 20px;
          padding-right: 20px;
          grid-template-columns: repeat(auto-fill, 120px);
        }
        .el-button {
          // flex-grow: 1;
          width: 150px;
          margin: 0px;

          @media (max-width: 1200px) {
            width: 120px;
          }
        }
      }
    }
    .joinBox {
      overflow: hidden;
      .el-button {
        float: right;
        width: 200px;
        height: 50px;
      }
    }
    .join-hint {
      margin-top: 25px;
      color: rgb(164, 164, 164);
      text-align: center;
    }
  }
  .dialog {
    .dialog-form {
      width: 80%;
    }
  }
}
</style>
