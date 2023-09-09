interface IBaseResponce<D> {
  readonly code: string;
  data?: D;
  message: string;
}
//面试复盘界面
// 获取组织部门
type TGetDepartment = {
  num: number;
  departments: Array<{
    departmentId: number;
    departmentName: string;
  }>;
};
type TGetDepartmentRes = IBaseResponce<TGetDepartment>;
//获取地点
type TGetPlaces = {
  addressPoList: Array<{
    id: number;
    name: string;
    departmentId: number;
    round: number;
  }>;
  round: number;
};
type TGetPlacesRes = IBaseResponce<TGetPlaces>;
//获取饼图
type pie = {
  id: number;
  content: string;
  num: number;
};
type TGetPie = {
  pieChatAll: {
    resultOverview: {
      notOperated: pie;
      undetermined: pie;
      pass: pie;
      fail: pie;
      num: number;
    };
    departmentDivide: {
      divide: Array<pie>;
      num: number;
    };
    addressDivide: {
      divide: Array<pie>;
      num: number;
    };
  };
};
type TGetPieRes = IBaseResponce<TGetPie>;
//获取消息通知模板
type TGetInformMessage = {
  messageSuccessTemplate: string;
  messageFailTemplate: string;
};
type TGetInformMessageRes = IBaseResponce<TGetInformMessage>;
type TGetInformProgress = {
  notifiedNum: number;
  allNum: number;
  NotNotifiedNum: number;
};
type TGetInformProgressRes = IBaseResponce<TGetInformProgress>;
//获取表格数据
type TGetTable = {
  title: Array<{
    label: number;
    question: string;
  }>;
  tableData: Array<{
    id: number;
    userId: number;
    studentId: string;
    name: string;
    className: string;
    score: Array<{
      label: number;
      score: number;
    }>;
    stateId: number;
    state: string;
    messageStateId: number;
    messageState: string;
  }>;
  page: number;
  pageAll: number;
  allNum: number;
};
type TGetTableRes = IBaseResponce<TGetTable>;

//获取评价
type TGetEmitResumeMessage = {
  count: number;
  interviewer: string;
  department: string;
  interviewTables: Array<{
    round: number;
    editable: boolean;
    realName: boolean;
    isPass: number;
    expectDepartment: number;
    count: number;
    questions: Array<{
      id: number;
      order: number;
      qType: number;
      type: number;
      question: string;
      qMaxScore: number | null;
      qOpts: {
        valueList: Array<any>;
      } | null;
      qHint: string;
      aStr: string | null;
      aInt: number | null;
      aSelect: {
        answerList: Array<string>;
      } | null;
    }>;
  }>;
};
type TGetEmitResumeMessageRes = IBaseResponce<TGetEmitResumeMessage>;
export type {
  IBaseResponce,
  TGetDepartmentRes,
  TGetPlacesRes,
  TGetPieRes,
  TGetInformMessageRes,
  TGetTableRes,
  TGetEmitResumeMessageRes,
  TGetInformProgressRes
};
