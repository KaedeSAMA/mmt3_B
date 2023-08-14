<template>
  <div>
    <h1 @click="updateTest">{{ data.briefIntroduction }}</h1>
    <h3>Tags:</h3>
    <ul>
      <li v-for="(tag, index) in data.tagList" :key="index">{{ tag.tag }}</li>
    </ul>
    <p>{{ data.introduction }}</p>

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
        <el-button type="primary">上传头像</el-button>
      </template>
      <!-- <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button> -->
      <!-- <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template> -->
    </el-upload>

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
  </div>
</template>

<script setup lang="ts">
import { UpdateDeptInfo } from '@/api/callout/types/updDeptInfo';
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

const data = reactive<UpdateDeptInfo>({
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
      id: null,
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
const updateTest = async () => {
  console.log(data);
  const res = await updateDeptInfo(data);
  console.log(res);
  const res_1 = await getDeptInfo();
  console.log(res_1);
};
onMounted(() => {
  data.briefIntroduction = jsonObject.briefIntroduction;
  data.tagList = jsonObject.tagList;
  data.introduction = jsonObject.introduction;
  data.feature = jsonObject.feature;
  data.daily = jsonObject.daily;
  data.slogan = jsonObject.slogan;
  data.contactInfo = jsonObject.contactInfo;
  data.more = jsonObject.more;
  data.departmentList = jsonObject.departmentList;
});

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
</script>
<style scoped lang="scss"></style>
