<template>
  <div class="root">
    <div>
      <h2>报名表</h2>
      <div>
        <!-- 问题展示模块-->
        <div>
          <h3>基础问题</h3>
          <div
            v-for="(item, idx) in regFormStore.regFormData.basic"
            :key="item.id"
            :class="{
              'unit-question-div': true,
              'active-question':
                regFormStore.nowSelect.dataType === 'basic' &&
                regFormStore.nowSelect.id === item.id
            }"
            @click.capture="selectQuestion('basic', item.id, idx)"
          >
            <!-- 问题描述 -->
            <div class="unit-question-content">
              <span v-if="item.isRequired" style="color: red">* </span>
              <span>{{ idx + 1 + '.' }}{{ item.content }}&nbsp;</span>
            </div>
            <!-- 表单框类型 -->
            <div class="unit-question-formitem">
              <el-radio-group class="ml-4" v-if="item.type === 1">
                <el-radio
                  label="1"
                  size="large"
                  v-for="ratio in item.value"
                  :key="ratio"
                  >{{ ratio }}</el-radio
                >
              </el-radio-group>
              <div v-if="item.type === 2">
                <el-checkbox
                  v-for="check in item.value"
                  :key="check"
                  :label="check"
                  size="large"
                />
              </div>
              <div v-if="item.type === 3">
                <el-select class="m-2" placeholder="Select" size="large">
                </el-select>
                <div style="margin-top: 10px">
                  <el-tag
                    v-for="opt in item.value"
                    :key="opt"
                    style="margin-right: 10px"
                  >
                    {{ opt }}
                  </el-tag>
                </div>
              </div>

              <el-input
                v-if="item.type === 4"
                :placeholder="item.value[0]"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- <ul
          v-for="(dep, depIdx) in regFormStore.regFormData.department"
          :key="dep.name"
        >
          <li
            v-for="(item, idx) in dep.questionList"
            :key="item.id"
            :class="{
              'basic-li': true,
              'active-li':
                regFormStore.nowSelect.dataType === 'department' &&
                regFormStore.nowSelect.id === item.id &&
                regFormStore.nowSelect.depIdx === depIdx
            }"
            @click="selectQuestion('department', item.id, idx, depIdx)"
          >
            {{ idx + 1 + '.' }}{{ item.content }}&nbsp;
          </li>
        </ul> -->
        <div>
          <div
            v-for="(dep, depIdx) in regFormStore.regFormData.department"
            :key="dep.name"
          >
            <h3>{{ dep.name }}问题</h3>
            <div
              v-for="(item, idx) in dep.questionList"
              :key="item.id"
              :class="{
                'unit-question-div': true,
                'active-question':
                  regFormStore.nowSelect.dataType === 'department' &&
                  regFormStore.nowSelect.id === item.id &&
                  regFormStore.nowSelect.depIdx === depIdx
              }"
              @click.capture="
                selectQuestion('department', item.id, idx, depIdx)
              "
            >
              <!-- 问题描述 -->
              <div class="unit-question-content">
                <span v-if="item.isRequired" style="color: red">* </span>
                <span>{{ idx + 1 + '.' }}{{ item.content }}&nbsp;</span>
              </div>
              <!-- 表单框样式 -->
              <div class="unit-question-formitem">
                <el-radio-group class="ml-4" v-if="item.type === 1">
                  <el-radio
                    label="1"
                    size="large"
                    v-for="ratio in item.value"
                    :key="ratio"
                    >{{ ratio }}</el-radio
                  >
                </el-radio-group>
                <div v-if="item.type === 2">
                  <el-checkbox
                    v-for="check in item.value"
                    :key="check"
                    :label="check"
                    size="large"
                  />
                </div>
                <div v-if="item.type === 3">
                  <el-select class="m-2" placeholder="Select" size="large">
                  </el-select>
                  <div style="margin-top: 10px">
                    <el-tag
                      v-for="opt in item.value"
                      :key="opt"
                      style="margin-right: 10px"
                    >
                      {{ opt }}
                    </el-tag>
                  </div>
                </div>

                <el-input
                  v-if="item.type === 4"
                  :placeholder="item.value[0]"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <h3>综合问题</h3>
        <div
          v-for="(item, idx) in regFormStore.regFormData.comprehensive"
          :key="item.id"
          :class="{
            'unit-question-div': true,
            'active-question':
              regFormStore.nowSelect.dataType === 'comprehensive' &&
              regFormStore.nowSelect.id === item.id
          }"
          @click.capture="selectQuestion('comprehensive', item.id, idx)"
        >
          <!-- 问题描述 -->
          <div class="unit-question-content">
            <span v-if="item.isRequired" style="color: red">* </span>
            <span>{{ idx + 1 + '.' }}{{ item.content }}&nbsp;</span>
          </div>
          <!-- 表单框样式 -->
          <div class="unit-question-formitem">
            <el-radio-group class="ml-4" v-if="item.type === 1">
              <el-radio
                label="1"
                size="large"
                v-for="ratio in item.value"
                :key="ratio"
                >{{ ratio }}</el-radio
              >
            </el-radio-group>
            <div v-if="item.type === 2">
              <el-checkbox
                v-for="check in item.value"
                :key="check"
                :label="check"
                size="large"
              />
            </div>
            <div v-if="item.type === 3">
              <el-select class="m-2" placeholder="Select" size="large">
              </el-select>
              <div style="margin-top: 10px">
                <el-tag
                  v-for="opt in item.value"
                  :key="opt"
                  style="margin-right: 10px"
                >
                  {{ opt }}
                </el-tag>
              </div>
            </div>

            <el-input
              v-if="item.type === 4"
              :placeholder="item.value[0]"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRegFormStore } from '@/store/regForm';
const regFormStore = useRegFormStore();
console.log(regFormStore.regFormData);

// 选中问题
const selectQuestion = (
  dataType: 'basic' | 'department' | 'comprehensive',
  id: number,
  idx: number,
  depIdx?: number
) => {
  //   console.log(id);
  console.log(depIdx);
  if (depIdx !== undefined && depIdx !== null) {
    regFormStore.setNowSelect(dataType, id, idx, depIdx);
  } else {
    regFormStore.setNowSelect(dataType, id, idx);
  }
};
</script>
<style lang="scss" scoped>
.root {
  height: 100%;
  width: 460px;
  overflow-y: scroll;
}
h1 {
  font-size: 32px;
}
.basic-li {
  color: black;
  cursor: pointer;
  list-style-type: none;
}
.active-li {
  color: red;
}
h3 {
  color: rgb(0, 135, 255);
}
.unit-question-div {
  width: 90%;
  margin: 5px 0;
  padding: 10px;
  .unit-question-formitem {
    margin: 10px 0;
  }
}
.active-question {
  border: 2px rgb(0, 135, 255) dashed;
  border-radius: 10px;
  position: relative;
}
.active-question::before {
  content: '';
  position: absolute;
  background-color: rgba(152, 207, 255, 0.293);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
