<!-- 
  // ？ 本组件是个人主页总页面
  // ？ 1. 切换组织最后的信息存放在pinia中
  // ？ 2. 
 -->
<template>
  <div class="personal-page-root">
    <el-card class="self-info-card flex a-center">
      <el-avatar :size="180" :src="avatar" />
      <div class="self-info-main flex a-center j-around">
        <div class="key flex flex-d-co a-end j-around">
          <div>真实姓名：</div>
          <div>手机号码：</div>
          <div>学号 ：</div>
        </div>
        <div class="value flex flex-d-co a-center j-around">
          <div>{{ studentName }}</div>
          <div>{{ phoneNum }}</div>
          <div>{{ studentCode }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="community-manage-card" :body-style="rightCardStyle">
      <template #header> 所在组织/社团 </template>
      <div class="upper flex">
        <div>当前组织/社团：</div>
        <div class="button-group flex">
          <el-button
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
      <!-- <div></div> -->
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
  </div>
</template>
<script lang="ts" setup>
import avatar from '@/assets/img/avatar.jpg';
import { Plus } from '@element-plus/icons-vue';
import { TJoinOrganization, TSwitchOrganization } from '@/api/types/dataType';
import {
  getUserBasicInfo,
  getUserOrganizations,
  joinOrganization,
  switchOrganization
} from '@/api/personalPage/index';

// ### 定义右侧卡片的bodyCSS样式
const rightCardStyle = {
  // backgroundColor: 'black',
  width: '90%',
  height: '80%',
  margin: '0 auto'
};

// ### 功能：获取用户信息并展示

// ### 1.定义数据展示的变量
const studentName = ref('加载中');
const phoneNum = ref('加载中');
const studentCode = ref('加载中');

// ### 2.挂载时向后端发起请求获取用户数据
onMounted(async () => {
  const data = await getUserBasicInfo();
  console.log(data);
  if (data) {
    studentName.value = data.username;
    phoneNum.value = data.phone;
    studentCode.value = data.studentId;
  }
});

// ### 功能：获取用户当前加入的所有组织并展示切换
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

// ### 功能：加入新的组织

// ### 1.定义请求函数：joinOrg
const joinOrg = async (config: TJoinOrganization) => {
  const data = await joinOrganization(config);
  // ### 成功后关闭窗体,并且重新获取组织
  console.log(data);
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
  console.log(dialogVisible.value);
};
const closeDialog = () => {
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.a-center {
  align-items: center;
}
.a-end {
  align-items: flex-end;
}
.a-start {
  align-items: flex-start;
}
.flex-d-co {
  flex-direction: column;
}
.j-center {
  justify-content: center;
}
.j-between {
  justify-content: space-between;
}
.j-around {
  justify-content: space-around;
}
.personal-page-root {
  width: 90%;
  min-width: 1000px;
  height: 96%;
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
    .self-info-main {
      width: 80%;
      height: 50%;
      .key {
        height: 80%;
      }
      .value {
        height: 80%;
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
    min-width: 700px;
    min-height: 600px;
    .upper {
      width: 100%;
      div {
        min-width: 120px;
        // background-color: black;
      }

      .button-group {
        width: 90%;
        margin-left: 50px;
        margin-bottom: 50px;
        min-width: 500px;
        flex-wrap: wrap;
        .el-button {
          min-width: 150px;
          flex-basis: 170px;
          margin-left: 20px;
          margin-bottom: 20px;
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
