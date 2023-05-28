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
            plain
            v-for="item in organizationTabs"
            :key="item.organizationId"
            >{{ item.organizationName }}</el-button
          >
        </div>
      </div>
      <el-divider />
      <div></div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import avatar from '@/assets/img/avatar.jpg';
// ### 定义数据展示的变量
const studentName = ref('王菲');
const phoneNum = ref('136 **** 8899');
const studentCode = ref('20210001');

// ### 定义右侧卡片的bodyCSS样式
const rightCardStyle = {
  // backgroundColor: 'black',
  width: '90%',
  height: '80%',
  margin: '0 auto'
};

// ### 创建变量用来存储此人加入组织的tabs
type organizationTab = {
  organizationId: number;
  organizationName: string;
  active: boolean;
};
const organizationTabs: Array<organizationTab> = [
  {
    organizationId: 1,
    organizationName: '科技协会',
    active: false
  },
  {
    organizationId: 2,
    organizationName: '团委',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '心协',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '心协',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '心协',
    active: false
  },
  {
    organizationId: 3,
    organizationName: '心协',
    active: false
  }
];
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
        margin-left: 50px;
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
  }
}
</style>
