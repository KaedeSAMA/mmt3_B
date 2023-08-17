<script setup lang="ts">
import { Data } from '@/api/callout/types/resType';
import { useOrgInfo } from '@/store/mobile';
import {
  updateDeptInfo,
  getDeptInfo,
  updateDeptLogo
} from '@/api/callout/index';
import { genFileId } from 'element-plus';
import { CirclePlus } from '@element-plus/icons-vue';
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
// store
const organizeInfo = useOrgInfo();
/**
 * getDeptInfo返回的数据
 */
const data = reactive<Data>({
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
});
onMounted(async () => {
  const res = (await getDeptInfo()) as Data;
  console.log(res);
  // 使用 Object.assign 更新响应式对象
  Object.assign(data, JSON.parse(JSON.stringify(res))); //更新本页
  organizeInfo.setOrgInfo(res); //更新store
  initTagListFix(); // 补全tagList
});
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
/**
 * 测试更新部门信息
 */
const updSyncDeptInfoAll = async () => {
  console.log(data);
  const {
    briefIntroduction,
    contactInfo,
    daily,
    departmentList,
    feature,
    introduction,
    more,
    slogan,
    tagList
  } = data;

  const updateData = {
    briefIntroduction,
    contactInfo,
    daily,
    departmentList,
    feature,
    introduction,
    more,
    slogan,
    tagList
  };

  const res = await updateDeptInfo(updateData);
  console.log(res);
  organizeInfo.setOrgInfo(data); //更新store
};
/**
 * @description: 保存临时数据同步到模拟器
 */
const saveTemp = () => {
  organizeInfo.setOrgInfo(data);
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
  // ???
  /**
   * 目前没有单独拿头像链接的方法
   * 需要整体刷新
   */
};
// const submitUpload = () => {
//   upload.value!.submit()// 提交上传
// }
// 如果出现返回系统标签缺失，手动添加
const initTagListFix = () => {
  // 未缺失
  if (data.tagList[0].type == 1) {
    return;
  }
  data.tagList.unshift({
    tag: '学术科技', // 性质
    type: 1
  });
  data.tagList.unshift({
    tag: '院级组织', // 性质
    type: 1
  });
};
// 点击添加自定义标签
const addTag = () => {
  data.tagList.push({
    tag: '',
    type: 2
  });
};
// 添加部门
const addDepartment = () => {
  data.departmentList.push({
    id: null,
    name: '',
    briefIntroduction:
      '',
    introduction:
      '',
    standard:
      ''
  });
};
</script>

<template>
  <div class="scroll-container">
    <div class="content">
      <article>
        <h1 @click="updateTest">test</h1>
        <header class="title-style">基本信息</header>
        <section class="base-info">
          <!-- avatar -->
          <section class="avatar-detail">
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
                <el-button type="primary" style="width: 150px"
                  >上传头像</el-button
                >
              </template>
            </el-upload>
          </section>
          <!-- info -->
          <section class="info-detail">
            <el-form ref="form" :model="data" require-asterisk-position="right">
              <el-form-item label="名称" required>
                <el-input disabled v-model="data.name" style="width: 100px" />
              </el-form-item>
              <el-form-item label="属性" class="tag-list">
                <el-select
                  placeholder="请输入性质"
                  :disabled="false"
                  v-model="data.tagList[0].tag"
                >
                  <el-option
                    v-for="item in selectList1"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  placeholder="请输入属性"
                  v-model="data.tagList[1].tag"
                >
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
          </section>
        </section>
        <!-- briefIntroduction -->
        <section style="box-sizing: border-box; padding: 0px 5vw">
          <el-form require-asterisk-position="right" label-position="top">
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >社团简介</label
                >
              </template>
              <el-input
                type="textarea"
                :rows="7"
                v-model="data.briefIntroduction"
              />
            </el-form-item>
          </el-form>
        </section>
      </article>      
      <article>
        <header class="title-style">社团宣传</header>
        <!-- clubPromotion -->
        <section style="box-sizing: border-box; padding: 0px 5vw">
          <el-form require-asterisk-position="right" label-position="top">
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >社团介绍</label
                >
              </template>
              <el-input type="textarea" :rows="7" v-model="data.introduction" />
            </el-form-item>
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >社团特色</label
                >
              </template>
              <el-input type="textarea" :rows="7" v-model="data.feature" />
            </el-form-item>
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >社团日常</label
                >
              </template>
              <el-input type="textarea" :rows="7" v-model="data.daily" />
            </el-form-item>
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >纳新宣言</label
                >
              </template>
              <el-input type="textarea" :rows="7" v-model="data.slogan" />
            </el-form-item>
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400"
                  >联系方式</label
                >
              </template>
              <el-input type="textarea" :rows="7" v-model="data.contactInfo" />
            </el-form-item>
            <el-form-item required>
              <template #label>
                <label style="font-size: 17px; font-weight: 400">更多</label>
              </template>
              <el-input type="textarea" :rows="7" v-model="data.more" />
            </el-form-item>
          </el-form>
        </section>
      </article>
      <article>
        <header class="title-style">纳新部门</header>
        <!-- departmentList -->
        <section style="box-sizing: border-box; padding: 0px 5vw">
          <template v-for="(department, index) in data.departmentList">
            <el-form require-asterisk-position="right" label-position="top">
              <!-- 部门标题 -->
              <div style="display: flex; margin-bottom: 20px">
                <el-icon
                  :size="25"
                  color="#409eff"
                  v-if="index == data.departmentList.length - 1"
                  @click="addDepartment"
                  style="cursor: pointer; margin: 0 20px 0 -45px"
                  ><CirclePlus
                /></el-icon>
                <div style="color: var(--el-text-color-regular);">{{ department.name || '未命名' }}</div>
              </div>
              <el-form-item style="display: flex; align-items: center" required>
                <template #label>
                  <label style="font-size: 17px; font-weight: 400"
                    >部门名称</label
                  >
                </template>
                <el-input
                  placeholder="请输入部门名称"
                  style="max-width: 214.5px"
                  v-model="department.name"
                />
              </el-form-item>
              <el-form-item style="display: flex; align-items: center" required>
                <template #label>
                  <label style="font-size: 17px; font-weight: 400"
                    >部门简介</label
                  >
                </template>
                <el-input
                  placeholder="请输入部门简介"
                  style="max-width: 214.5px"
                  v-model="department.briefIntroduction"
                />
              </el-form-item>

              <el-form-item required>
                <template #label>
                  <label style="font-size: 17px; font-weight: 400"
                    >部门介绍</label
                  >
                </template>
                <el-input
                  type="textarea"
                  :rows="7"
                  v-model="department.introduction"
                />
              </el-form-item>
              <el-form-item>
                <template #label>
                  <label style="font-size: 17px; font-weight: 400"
                    >部门纳新标准</label
                  >
                </template>
                <el-input
                  type="textarea"
                  :rows="7"
                  v-model="department.standard"
                />
              </el-form-item>
            </el-form>
          </template>
        </section>
      </article>
      <section
        style="display: flex; justify-content: flex-end; margin-right: 10%"
      >
        <el-button type="primary" @click="saveTemp"> 暂时保存并预览 </el-button>
        <el-button type="primary" @click="updSyncDeptInfoAll">
          确定同步
        </el-button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
/*外层的el-card有overflow:hidden
导致scroll高度太大就有一部分显示不了，
先用70vh凑活，如果出bug了再调吧*/
.scroll-container {
  height: 70vh;
  // height: 70%;
  max-width: 100%;
  // height: 655px;
  overflow-y: auto; /* 显示垂直滚动条 */
  // overflow-x: auto; /* 隐藏水平滚动条 */
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
.content {
  /*width这里也莫名奇妙100%会出现横向滚动条,
  是position:relative的锅，
  transform: translateX(10%);移位也会有类似的问题，
  改用margin-left调位置就好了*/
  max-width: 100%;
  height: 100%;
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
.title-style {
  color: var(--el-color-primary);
  margin-left: 4.5%;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid var(--el-color-primary);;
}
</style>
