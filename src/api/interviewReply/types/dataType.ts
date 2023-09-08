//面试复盘界面
// 表格接口数据
type Ttable = {
  page: number;
  departmentId: number | null;
  addressId: number | null;
  isSort: boolean | null;
  stateList: Array<number>;
  messageStateList: Array<number>;
  search: string;
};
//发送结果通知
type Tsend = {
  messageSendPoList: Array<{
    interviewId: number;
    userId: number;
  }>;
  message: string;
};

type Tresume = {
  interview: number;
  realName: boolean;
  isPass: number;
  expectDepartment: number;
  evaluations: Array<{
    id: number;
    aStr: string | null;
    aInt: number | null;
    aSelect: {
      answerList: Array<string>;
    } | null;
  }>;
};
export type { Ttable, Tsend, Tresume };
