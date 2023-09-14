/**
 * @author 齐东睿
 * @comment 如果代码有什么地方看不懂可以联系我微信：g329736345
 * @lastModifyTime 2023/9/4
 * @lastModifyPerson 齐东睿
 *
 */

// ### 报名表设置相关数据
import { defineStore } from 'pinia';
// 使用报名表的类型
import { TRegFormType, TUnitProblem } from '@/types/regForm/index';
// 提交报名表的类型
import { PostRegFormData } from '@/api/regForm/types/regFormType';
import { postRegForm } from '@/api/regForm/index';

const useRegFormStore = defineStore('regFormStore', () => {
  const regFormData = ref<TRegFormType>({
    basic: [
      {
        id: 0,
        type: 1,
        content: '(示例)你的性别是',
        value: ['男', '女'],
        isRequired: true
      },
      {
        id: 121412,
        type: 2,
        content: '(示例)你喜欢吃',
        value: ['青椒', '鱼', '钝角'],
        isRequired: true
      },
      {
        id: 24120,
        type: 3,
        content: '(示例)请选择你的出生地',
        value: ['北京', '上海', '广州', '深圳'],
        isRequired: true
      },
      {
        id: 1412321,
        type: 4,
        content: '(示例)你想对我们说的话是',
        value: ['请输入'],
        isRequired: true
      }
    ],
    department: [
      // {
      //   name: '初始化',
      //   questionList: []
      // }
    ],
    comprehensive: []
  });
  const allDepartments = ref<
    { departmentId?: number; departmentName?: string }[]
  >([]);
  const nowSelect = ref<{
    dataType: 'basic' | 'department' | 'comprehensive';
    id: number;
    idx: number;
    depIdx: number | null;
  }>({
    dataType: 'basic',
    id: 0,
    idx: 0,
    depIdx: null
  });

  // 更改当前被选的项
  function setNowSelect(
    dataType: 'basic' | 'department' | 'comprehensive',
    id: number,
    idx: number,
    depIdx?: number
  ) {
    nowSelect.value.dataType = dataType;
    nowSelect.value.id = id;
    nowSelect.value.idx = idx;
    if (dataType === 'department' && depIdx !== undefined && depIdx !== null) {
      nowSelect.value.depIdx = depIdx;
    } else {
      nowSelect.value.depIdx = null;
    }
  }
  // 添加新问题
  function addNewQuestion(
    data: TUnitProblem,
    dataType: 'basic' | 'department' | 'comprehensive',
    departmentIdx?: number
  ) {
    if (dataType === 'department') {
      if (departmentIdx !== undefined) {
        regFormData.value[dataType][departmentIdx].questionList.push(data);
      }
    } else {
      regFormData.value[dataType].push(data);
    }
  }
  // 对当前选中的问题进行移动
  function moveNowQuestion(to: 'UP' | 'DOWN', depIdx?: number) {
    let key = nowSelect.value.idx;
    // 判断是上移还是下移动，if块内部的代码是给两个元素换位置用的
    if (to === 'UP' && key > 0 && key !== -1) {
      // 判断是不是department
      if (nowSelect.value.dataType === 'department' && depIdx !== undefined) {
        let temp =
          regFormData.value[nowSelect.value.dataType][depIdx].questionList[
            key - 1
          ];
        regFormData.value[nowSelect.value.dataType][depIdx].questionList[
          key - 1
        ] =
          regFormData.value[nowSelect.value.dataType][depIdx].questionList[key];
        regFormData.value[nowSelect.value.dataType][depIdx].questionList[key] =
          temp;
        nowSelect.value.idx = nowSelect.value.idx - 1;
      } else {
        let temp = regFormData.value[nowSelect.value.dataType][key - 1];
        regFormData.value[nowSelect.value.dataType][key - 1] =
          regFormData.value[nowSelect.value.dataType][key];
        regFormData.value[nowSelect.value.dataType][key] = temp;
        nowSelect.value.idx = nowSelect.value.idx - 1;
      }
    }
    // 判断是上移还是下移动，if块内部的代码是给两个元素换位置用的
    if (
      to === 'DOWN' &&
      key < regFormData.value[nowSelect.value.dataType].length - 1 &&
      key !== -1 &&
      nowSelect.value.dataType !== 'department'
    ) {
      let temp = regFormData.value[nowSelect.value.dataType][key + 1];
      regFormData.value[nowSelect.value.dataType][key + 1] =
        regFormData.value[nowSelect.value.dataType][key];
      regFormData.value[nowSelect.value.dataType][key] = temp;
      nowSelect.value.idx = nowSelect.value.idx + 1;
    }
    if (
      to === 'DOWN' &&
      nowSelect.value.dataType === 'department' &&
      depIdx !== undefined
    ) {
      if (
        key <
          regFormData.value[nowSelect.value.dataType][depIdx].questionList
            .length -
            1 &&
        key !== -1
      ) {
        let temp =
          regFormData.value[nowSelect.value.dataType][depIdx].questionList[
            key + 1
          ];
        regFormData.value[nowSelect.value.dataType][depIdx].questionList[
          key + 1
        ] =
          regFormData.value[nowSelect.value.dataType][depIdx].questionList[key];
        regFormData.value[nowSelect.value.dataType][depIdx].questionList[key] =
          temp;
        nowSelect.value.idx = nowSelect.value.idx + 1;
      }
    }
  }
  // 更改问题的内容
  // function changeQuestionContent(
  //   dataType: 'basic' | 'department' | 'comprehensive',
  //   id: number,
  //   idx: number,
  //   val: string
  // ) {
  //   regFormData.value[dataType][idx].content = val;
  // }
  // 更改问题的value
  // function changeQuestionValue(
  //   dataType: 'basic' | 'department' | 'comprehensive',
  //   id: number,
  //   idx: number,
  //   val: string[]
  // ) {
  //   regFormData.value[dataType][idx].value = val;
  // }

  // 删除问题
  function deleteQuestion() {
    if (nowSelect.value.dataType !== 'department') {
      regFormData.value[nowSelect.value.dataType].splice(
        nowSelect.value.idx,
        1
      );
      nowSelect.value = {
        dataType: 'basic',
        id: 0,
        idx: 0,
        depIdx: null
      };
    } else {
      if (nowSelect.value.depIdx !== null)
        regFormData.value[nowSelect.value.dataType][
          nowSelect.value.depIdx
        ].questionList.splice(nowSelect.value.idx, 1);
    }
  }

  // 添加部门
  function addDepartment(name: string) {
    regFormData.value.department.push({
      name,
      questionList: []
    });
  }

  // 删除部门
  function deleteDepartment(name: string) {
    regFormData.value.department.map((i, k) => {
      if (i.name === name) {
        regFormData.value.department.splice(k, 1);
      }
    });
  }

  // 当前设置为必填
  function setMust() {
    if (nowSelect.value.dataType === 'department') {
      if (
        nowSelect.value.depIdx !== null &&
        nowSelect.value.depIdx !== undefined
      ) {
        regFormData.value.department[nowSelect.value.depIdx].questionList[
          nowSelect.value.idx
        ].isRequired =
          !regFormData.value.department[nowSelect.value.depIdx].questionList[
            nowSelect.value.idx
          ].isRequired;
      }
    } else {
      regFormData.value[nowSelect.value.dataType][
        nowSelect.value.idx
      ].isRequired =
        !regFormData.value[nowSelect.value.dataType][nowSelect.value.idx]
          .isRequired;
    }
  }

  // 提交报名表
  async function submitRegForm() {
    let idNameMap = new Map();
    allDepartments.value.map((item) => {
      idNameMap.set(item.departmentName, item.departmentId);
    });
    let idDepartment = regFormData.value.department.map((item) => {
      return {
        departmentId: idNameMap.get(item.name),
        questionList: item.questionList
      };
    });
    let temp: PostRegFormData = {
      comprehensiveQuestionList: regFormData.value.comprehensive,
      departmentNum: allDepartments.value.length,
      departmentQuesstionList: idDepartment,
      essentialQuestionList: regFormData.value.basic,
      isTransfers: true,
      maxDepartmentNum: 20
    };
    console.log('POST DATA', temp);
    postRegForm(temp);
  }
  return {
    regFormData,
    nowSelect,
    allDepartments,
    setNowSelect,
    addNewQuestion,
    moveNowQuestion,
    deleteQuestion,
    addDepartment,
    deleteDepartment,
    setMust,
    submitRegForm
  };
});

export { useRegFormStore };
