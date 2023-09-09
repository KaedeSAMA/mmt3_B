<template>
  <div class="root">
    <h2>编辑问题</h2>
    <!-- <div>
      {{ regFormStore.nowSelect }}
    </div> -->
    <div>
      <h3>编辑问题</h3>

      <!-- 普通输入框 -->
      <template v-if="!(regFormStore.nowSelect.dataType === 'department')">
        <el-input
          v-model="
            regFormStore.regFormData[regFormStore.nowSelect.dataType][
              regFormStore.nowSelect.idx
            ].content
          "
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
          placeholder="Please input"
        />
        <div style="margin: 20px 0" />
        <h3>编辑问题选项</h3>
        <div class="right-button">
          <el-button type="primary" @click="addOption()">+ 添加选项</el-button>
        </div>
        <div
          v-for="(ipt, k) in regFormStore.regFormData[
            regFormStore.nowSelect.dataType
          ][regFormStore.nowSelect.idx].value"
          :key="k"
        >
          <div>选项{{ k + 1 }}</div>
          <el-input
            v-model="
              regFormStore.regFormData[regFormStore.nowSelect.dataType][
                regFormStore.nowSelect.idx
              ].value[k]
            "
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </div>
      </template>
      <!-- 社团输入框 -->
      <template
        v-if="
          regFormStore.nowSelect.dataType === 'department' &&
          regFormStore.nowSelect.depIdx !== null &&
          regFormStore.nowSelect.depIdx !== undefined
        "
      >
        <!-- <el-input
          v-model="
            regFormStore.regFormData[regFormStore.nowSelect.dataType][
              regFormStore.nowSelect.depIdx
            ].questionList[regFormStore.nowSelect.idx].content
          "
          autosize
          type="textarea"
          placeholder="Please input"
        />
        <div style="margin: 20px 0" />
        <el-input
          v-model="
            regFormStore.regFormData[regFormStore.nowSelect.dataType][
              regFormStore.nowSelect.depIdx
            ].questionList[regFormStore.nowSelect.idx].content
          "
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Please input"
        /> -->
        <el-input
          v-model="
            regFormStore.regFormData[regFormStore.nowSelect.dataType][
              regFormStore.nowSelect.depIdx
            ].questionList[regFormStore.nowSelect.idx].content
          "
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
          placeholder="Please input"
        />
        <div style="margin: 20px 0" />
        <h3>编辑问题选项</h3>
        <div class="right-button">
          <el-button type="primary" @click="addOption()">+ 添加选项</el-button>
        </div>
        <div
          v-for="(ipt, k) in regFormStore.regFormData.department[
            regFormStore.nowSelect.depIdx
          ].questionList[regFormStore.nowSelect.idx].value"
          :key="k"
        >
          <div>选项{{ k + 1 }}</div>
          <el-input
            v-model="
              regFormStore.regFormData[regFormStore.nowSelect.dataType][
                regFormStore.nowSelect.depIdx
              ].questionList[regFormStore.nowSelect.idx].value[k]
            "
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </div>
      </template>
      <h3>移动选项</h3>
      <el-button @click="moveQuestion('UP', regFormStore.nowSelect.depIdx)">
        上移
      </el-button>
      <el-button @click="moveQuestion('DOWN', regFormStore.nowSelect.depIdx)">
        下移
      </el-button>
      <div class="right-button">
        <el-button type="primary" @click="regFormStore.setMust()"
          >改变必须状态</el-button
        >
      </div>
      <div class="right-button">
        <el-button type="danger" @click="deleteQuestion()">删除问题</el-button>
      </div>
      <div class="right-button">
        <el-button type="primary" @click="regFormStore.submitRegForm()"
          >已全部完成，提交报名表</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRegFormStore } from '@/store/regForm';
const regFormStore = useRegFormStore();
// const nowSelect: ComputedRef<TUnitProblem | null> = computed(() => {
//   let select: TUnitProblem | null = null;
//   regFormStore.regFormData[regFormStore.nowSelect.dataType].map((item, key) => {
//     if (item.id === regFormStore.nowSelect.id) {
//       select = regFormStore.regFormData[regFormStore.nowSelect.dataType][key];
//     }
//     return null;
//   });
//   return select;
// });
// 富文本输入框回调

// 移动目标x
function moveQuestion(to: 'UP' | 'DOWN', depIdx?: number | null) {
  if (
    regFormStore.nowSelect.dataType === 'department' &&
    depIdx !== undefined &&
    depIdx !== null
  ) {
    regFormStore.moveNowQuestion(to, depIdx);
  } else {
    regFormStore.moveNowQuestion(to);
  }
}

function deleteQuestion() {
  regFormStore.deleteQuestion();
}

function addOption() {
  if (
    regFormStore.nowSelect.dataType === 'department' &&
    regFormStore.nowSelect.depIdx !== null &&
    regFormStore.nowSelect.depIdx !== undefined
  ) {
    regFormStore.regFormData.department[
      regFormStore.nowSelect.depIdx
    ].questionList[regFormStore.nowSelect.idx].value.push('新增选项');
  } else {
    regFormStore.regFormData.basic[regFormStore.nowSelect.idx].value.push(
      '新增选项'
    );
  }
}

// 提交报名表
</script>
<style lang="scss" scoped>
.root {
  height: 100%;
  width: 300px;
  overflow-y: scroll;
}
h3 {
  color: rgb(0, 135, 255);
}
.title-botton {
  font-size: 20px;
  line-height: 60px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  .edit-button {
    background-color: rgb(15, 128, 252);
    color: white;
    width: 48%;
    height: 60px;
    text-align: center;
  }
}
.right-button {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 10px 0;
}
</style>
