<template>
  <div class="root">
    <h2>报名表问题设置</h2>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基本问题" s name="basic">
        <h3>添加问题</h3>
        <div class="gird-button-div">
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 1,
                  content: '新增问题：单选',
                  value: ['选项1', '选项2'],
                  isRequired: true
                },
                'basic'
              )
            "
            >单选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 2,
                  content: '新增问题：多选',
                  value: ['选项1', '选项2'],
                  isRequired: true
                },
                'basic'
              )
            "
            >多选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 3,
                  content: '新增问题：下拉框',
                  value: ['选项1', '选项2'],
                  isRequired: true
                },
                'basic'
              )
            "
            >下拉框</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 4,
                  content: '新增问题：输入框',
                  value: ['请输入placeholder'],
                  isRequired: true
                },
                'basic'
              )
            "
            >输入框</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="部门问题" name="department">
        <h3>选择部门</h3>

        <div class="tag-group-div">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1 tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            @click="() => selectTag(tag)"
            size="large"
            :effect="nowTag === tag ? 'dark' : 'light'"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20 inline-ipt"
            size="default"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="default"
            @click="showInput"
          >
            + 新增部门
          </el-button>
        </div>
        <h3>添加问题</h3>
        <div class="gird-button-div">
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 1,
                  content: '新增问题：单选',
                  value: ['选项1', '选项2'],

                  isRequired: true
                },
                'department',
                nowTag
              )
            "
            >单选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 2,
                  content: '新增问题：多选',
                  value: ['选项1', '选项2'],

                  isRequired: true
                },
                'department',
                nowTag
              )
            "
            >多选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 3,
                  content: '新增问题：下拉框',
                  value: ['选项1', '选项2'],

                  isRequired: true
                },
                'department',
                nowTag
              )
            "
            >下拉框</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 4,
                  content: '新增问题：输入框',
                  value: ['请输入placeholder'],
                  isRequired: true
                },
                'department',
                nowTag
              )
            "
            >输入框</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="综合问题" name="comprehensive">
        <div>
          <h3>添加问题</h3>

          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 1,
                  content: '新增问题：单选',
                  value: ['选项1', '选项2'],

                  isRequired: true
                },
                'comprehensive'
              )
            "
            >单选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 2,
                  content: '新增问题：多选',
                  value: ['选项1', '选项2'],
                  isRequired: true
                },
                'comprehensive'
              )
            "
            >多选</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 3,
                  content: '新增问题：下拉框',
                  value: ['选项1', '选项2'],
                  isRequired: true
                },
                'comprehensive'
              )
            "
            >下拉框</el-button
          >
          <el-button
            type="primary"
            plain
            @click="
              addQuestion(
                {
                  id: new Date().getTime(),
                  type: 4,
                  content: '新增问题：输入框',
                  value: ['请输入placeholder'],
                  isRequired: true
                },
                'comprehensive'
              )
            "
            >输入框</el-button
          >
        </div></el-tab-pane
      >
    </el-tabs>

    <el-input v-model="departmentName" placeholder="Please input" />
    <el-button @click="addDepartment(departmentName)">添加社团</el-button>
  </div>
</template>
<script lang="ts" setup>
import { TUnitProblem } from '@/types/regForm/index';
import { useRegFormStore } from '@/store/regForm';
import { nextTick, ref } from 'vue';
import { ElInput } from 'element-plus';
import { getAllDepartment } from '@/api/regForm';

// 基本数据
const regFormStore = useRegFormStore();
const departmentName = ref('');
const activeName = ref('basic');

// 多选标签
const inputValue = ref('');
const departments = regFormStore.regFormData.department.map(
  (item) => item.name
);
const dynamicTags = ref(departments);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const nowTag = ref('');

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  regFormStore.deleteDepartment(tag);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
    addDepartment(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

const selectTag = (tag: string) => {
  console.log(tag);
  nowTag.value = tag;
};

// 新增问题
function addQuestion(
  data: TUnitProblem,
  dataType: 'basic' | 'department' | 'comprehensive',
  depName?: string
) {
  if (dataType !== 'department') {
    regFormStore.addNewQuestion(data, dataType);
  } else {
    let idx = 0;
    regFormStore.regFormData.department.map((i, k) => {
      if (i.name === depName) {
        idx = k;
      }
      return null;
    });
    regFormStore.addNewQuestion(data, dataType, idx);
  }
}

function addDepartment(name: string) {
  regFormStore.addDepartment(name);
}

// 获取部门，初始化列表
async function initData() {
  const res = await getAllDepartment();
  console.log(res);
  if (res) {
    regFormStore.allDepartments = res?.departments;
    regFormStore.regFormData.department = [];
    dynamicTags.value = [];
    res?.departments.map((item) => {
      const temp = {
        name: item.departmentName as string,
        questionList: []
      };
      regFormStore.regFormData.department.push(temp);
      dynamicTags.value.push(temp.name);
      nowTag.value = regFormStore.regFormData.department[0].name;
      return null;
    });
  }
}
initData();

onMounted(() => {});
</script>
<style lang="scss" scoped>
.root {
  width: 310px;
  height: 100%;
}
.el-tabs {
  height: 100%;
  .el-tabs__content {
    height: calc(100% - 60px);
    .el-tab-pane {
      height: 100%;
    }
  }
}
.inline-ipt {
  display: inline-block; /* 将el-input设置为行内块元素 */
  max-width: 200px; /* 设置最大宽度 */
}
.tag-group-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
  .tags {
    margin-right: 10px;
    cursor: pointer;
  }
}
.gird-button-div {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行3列 */
  gap: 10px; /* 设置列之间的间隙 */
  justify-content: start;
  .el-button {
    margin-left: 0;
  }
}
h3 {
  margin: 10px 0;
}
</style>
