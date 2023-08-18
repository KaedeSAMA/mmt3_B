<!-- 本想拆成三个组件，不过不好复用，就干脆不拆了，该页面已弃用 -->
<script setup lang="ts">
import { UpdateDeptInfo } from '@/api/callout/types/updDeptInfo';
import { Data, TGetDeptInfoRes } from '@/api/callout/types/resType';
import {
  updateDeptInfo,
  getDeptInfo,
  updateDeptLogo
} from '@/api/callout/index';
import { ref, reactive, onMounted } from 'vue';
import { genFileId } from 'element-plus';
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions
} from 'element-plus';
const selectList1 = ref([
  //Map
  {
    label: '校级组织',
    value: '校级组织'
  },
  {
    label: '院级组织',
    value: '院级组织'
  },
  {
    label: '社团',
    value: '社团'
  }
]);
const selectList2 = ref([
  //Map
  {
    label: '思想政治',
    value: '思想政治'
  },
  {
    label: '学术科技',
    value: '学术科技'
  },
  {
    label: '文化体育',
    value: '文化体育'
  },
  {
    label: '创新创业',
    value: '创新创业'
  },
  {
    label: '志愿公益',
    value: '志愿公益'
  },
  {
    label: '自律互助',
    value: '自律互助'
  }
]);
let data = reactive<Data>({
  name: '加载中',
  avatarUrl: '#',
  briefIntroduction: '加载中',
  tagList: [
    {
      tag: '加载中',
      type: 1
    },
    {
      tag: '加载中',
      type: 1
    }
  ],
  introduction: '加载中',
  feature: '加载中',
  daily: '加载中',
  slogan: '加载中',
  contactInfo: '加载中',
  more: '加载中',
  departmentList: []
}); // getDeptInfo返回的数据
onMounted(async () => {
  const res = (await getDeptInfo()) as Data;
  console.log(res);
  // 使用 Object.assign 更新响应式对象
  Object.assign(data, res);
});
const datat = reactive<UpdateDeptInfo>({
  briefIntroduction: '',
  tagList: [],
  introduction: '',
  feature: '',
  daily: '',
  slogan: '',
  contactInfo: '',
  more: '',
  departmentList: []
});
const jsonObject = {
  briefIntroduction:
    'Company XYZ specializes in software development and IT solutions.',
  tagList: [
    {
      tag: 'Technology',
      type: 2
    }
  ],
  introduction:
    'Welcome to Company XYZ! We provide innovative software solutions for businesses worldwide.',
  feature:
    'We deliver high-quality software products that meet your unique requirements.',
  daily:
    'Our focus is on delivering exceptional value to our clients and exceeding their expectations.',
  slogan: 'Transforming Ideas into Reality',
  contactInfo:
    'For inquiries or collaboration opportunities, contact us at info@companyxyz.com or call +123456789.',
  more: 'To learn more about our services, visit our website at www.companyxyz.com.',
  departmentList: [
    {
      id: 25,
      name: 'Software Development',
      briefIntroduction:
        'Our software development team creates robust and scalable solutions tailored to your business needs.',
      introduction:
        'We deliver customized software applications that streamline processes and drive growth.',
      standard:
        'We follow industry best practices and agile methodologies to ensure timely delivery and code quality.'
    }
  ]
};
/**
 * @description: 测试更新部门信息
 */
const updateTest = async () => {
  console.log(data);
  // const res = await updateDeptInfo(data);
  // console.log(res);
  // const res_1 = await getDeptInfo();
  // console.log(res_1);
};

const upload = ref<UploadInstance>();
const uploadHeaders = {
  Authorization: window.localStorage.getItem('token'),
  'Content-Type': 'application/form-data'
};
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles(); // 清空已上传的文件列表
  const file = files[0] as UploadRawFile; // 获取第一个文件
  file.uid = genFileId(); // 生成一个新的文件id
  upload.value!.handleStart(file); // 重新上传
};
const uploadAvatar = async (option: UploadRequestOptions) => {
  console.log('uploadAvatar', option);
  // upload.value!.submit()
  const res = await updateDeptLogo({ avatar: option.file });
  console.log('uploadAvatar', res);
};
// const submitUpload = () => {
//   upload.value!.submit()// 提交上传
// }

const addTag = () => {
  data.tagList.push({
    tag: '',
    type: 2
  });
};
</script>

<template>
  <div class="scroll-container">
    <div class="content">
      <section class="base-info">
        <!-- avatar -->
        <!-- <section class="avatar-detail">
          <el-avatar :size="180" :src="data.avatarUrl" />
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://mmt-test.sipc115.com/b/admin/avatar/upload"
            :limit="1"
            :on-exceed="handleExceed"
            :with-credentials="true"
            :show-file-list="false"
            :headers="uploadHeaders"
            :auto-upload="true"
            :http-request="uploadAvatar"
          >
            <template #trigger>
              <el-button type="primary" style="width: 150px;">上传头像</el-button>
            </template>
          </el-upload>
        </section> -->
        <!-- info -->
        <!-- <section class="info-detail">
          <el-form ref="form" :model="data" require-asterisk-position="right">
            <el-form-item label="名称" required>
              <el-input disabled v-model="data.name" style="width: 100px" />
            </el-form-item>
            <el-form-item label="属性" class="tag-list">
              <el-select placeholder="请输入性质" :disabled="true" v-model="data.tagList[0].tag">
                <el-option
                  v-for="item in selectList1"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select placeholder="请输入属性" v-model="data.tagList[1].tag">
                <el-option
                  v-for="item in selectList2"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <template v-for="(item, index) in data.tagList">
                <el-input
                  placeholder="请输入标签"
                  style="max-width: 214.5px"
                  v-if="item.type === 2"
                  v-model="item.tag"
                />
              </template>
              <el-button style="align-self: self-start" @click="addTag"
                >+ 自定义</el-button
              >
            </el-form-item>
          </el-form>
        </section> -->
      </section>
      <!-- briefIntroduction -->
      <!-- <section style="box-sizing: content-box; padding: 0px 5vw">
        <el-form require-asterisk-position="right" label-position="top">
          <el-form-item required>
            <template #label>
              <label style="font-size: 17px; font-weight: 400">社团简介</label>
            </template>
            <el-input type="textarea" :rows="7" v-model="data.briefIntroduction"/>
          </el-form-item>
        </el-form>
      </section> -->
      <!-- <h1 @click="updateTest">click to test request</h1>      -->

      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <p>{{ data.introduction }}</p>
      <h3>Feature:</h3>
      <p>{{ data.feature }}</p>
      <h3>Daily Focus:</h3>
      <p>{{ data.daily }}</p>
      <h3>Slogan:</h3>
      <p>{{ data.slogan }}</p>
      <h3>Contact Information:</h3>
      <p>{{ data.contactInfo }}</p>
      <h3>Learn More:</h3>
      <p>{{ data.more }}</p>
      <h2>Departments:</h2>
      <div v-for="(department, index) in data.departmentList" :key="index">
        <h3>{{ department.name }}</h3>
        <p>{{ department.briefIntroduction }}</p>
        <p>{{ department.introduction }}</p>
        <p>{{ department.standard }}</p>
      </div>
      <h2>Departments:</h2>
      <div v-for="(department, index) in data.departmentList" :key="index">
        <h3>{{ department.name }}</h3>
        <p>{{ department.briefIntroduction }}</p>
        <p>{{ department.introduction }}</p>
        <p>{{ department.standard }}</p>
      </div>
      <h2>Depart</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-container {
  width: 100%;
  height: 70vh;
}

.content {
  height: 100%;
  overflow-y: auto; /* 显示垂直滚动条 */
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0.25em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bebdbd; //#888888; /* 滑块颜色 */
    border-radius: 0.25em; /* 滑块圆角 */
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /* 背景颜色 */
    border-radius: 0.25em; /* 背景圆角 */
  }
}
.base-info {
  display: flex;
  // justify-content: space-evenly;
  align-items: center;
  .avatar-detail {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 15px;
  }
  .info-detail {
    flex: 3;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .tag-list > :deep(.el-form-item__content) {
      gap: 10px;
      flex-direction: column;
    }
  }
}
</style>
